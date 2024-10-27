import { MongoClient, ObjectId } from "mongodb";
import bcrypt, { genSalt } from "bcrypt";
import { crearToken } from "./token.service.js";
import jwt from "jsonwebtoken";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

const usuarios = db.collection("usuarios");

export async function createUser(usuario) {
  await cliente.connect();

  const existe = await usuarios.findOne({ email: usuario.email });

  if (existe) {
    return "Usuario no disponible.";
  }

  const nuevoUsuario = { ...usuario, passwordConfirm: undefined };
  nuevoUsuario.password = await bcrypt.hash(usuario.password, 10);

  usuarios.insertOne(nuevoUsuario);

  return { ...nuevoUsuario, password: undefined };
}

export async function login(usuario) {
  await cliente.connect();

  const existe = await usuarios.findOne({ email: usuario.email });

  if (!existe) {
    return "No se pudo loguear";
  }

  const esValido = await bcrypt.compare(usuario.password, existe.password);

  if (!esValido) {
    return "No se pudo loguear";
  }

  console.log(existe)
  const token = await crearToken(existe);

  return {
    ...existe,
    token: token,
    password: undefined,
    passwordConfirm: undefined,
  };
}
