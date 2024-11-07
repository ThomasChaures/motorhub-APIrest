import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { crearToken } from "./token.service.js";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

const usuarios = db.collection("usuarios");

export async function createUser(usuario) {
  await cliente.connect();

  const existe = await usuarios.findOne({ email: usuario.email });

  if (existe) {
    return { error: "Usuario no disponible." };
  }

  const nuevoUsuario = { ...usuario, passwordConfirm: undefined };
  nuevoUsuario.password = await bcrypt.hash(usuario.password, 10);

  const res = await usuarios.insertOne(nuevoUsuario);

  const objId = new ObjectId(res.insertedId.toString());

  const user = {
    _id: objId,
    email: usuario.email,
  };

  let token;
  if (res) {
    token = await crearToken(user);
  }

  console.log(user);
  return { ...nuevoUsuario, token: token, password: undefined };
}

export async function login(usuario) {
  await cliente.connect();

  const existe = await usuarios.findOne({ email: usuario.email });

  if (!existe) {
    return { error: "No se pudo loguear" };
  }

  const esValido = await bcrypt.compare(usuario.password, existe.password);

  if (!esValido) {
    return { error: "No se pudo loguear" };
  }

  console.log(existe);
  const token = await crearToken(existe);

  return {
    ...existe,
    token: token,
    password: undefined,
    passwordConfirm: undefined,
  };
}


export async function getUser(id){
  await cliente.connect();

  console.log(id)
  const existe = await usuarios.findOne({ _id: new ObjectId(id) });

  if(!existe) throw new Error("No existe este usuario")
    console.log(`EXISTE: ${existe._id}`)
    return {...existe, password: undefined, passwordConfirm: undefined}
}