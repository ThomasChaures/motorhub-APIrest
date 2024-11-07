import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
const SECRET_KEY = "dwt4av";
const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");
const tokens = db.collection("tokens");

export async function crearToken(usuario) {
  const token = jwt.sign({...usuario, password: undefined}, SECRET_KEY, {expiresIn: "24h"} )

  await cliente.connect();

  await tokens.insertOne({ token: token, usuario_id: usuario._id });

  return token;
}

export async function validarToken(token) {
    try{
        const payload = jwt.verify(token, SECRET_KEY);
        const sesionActiva = await tokens.findOne({token, usuario_id: new ObjectId(payload._id)})
        if(!sesionActiva) throw new Error("Token invalido")
        if(payload.exp > (new Date().getTime())) throw new Error('Token expirado')
        return payload
    }catch(error){
        throw new Error("Token invalido")
    }
}
