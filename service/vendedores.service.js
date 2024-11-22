import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/");
const db = cliente.db("AH20232CP1");

export const getClienteApi = async () => {
    await cliente.connect()
   const vendedores = await db.collection('Vendedores').find().toArray()
    return vendedores
}

export const agregarClienteApi = async (vendedor) => {
  await cliente.connect()

  const nuevoVendedor = {...vendedor, eliminado: false,}

  await db.collection("Vendedores").insertOne(nuevoVendedor);
  return vendedor;
};

export const agregarCliente = async (vendedor) => {
  await db.collection("Vendedores").insertOne(vendedor);
  return vendedor;
};

export const getClienteNombre = async (email) => {
  const vendedor = await db
    .collection("Vendedores")
    .findOne({ email: email });
  return vendedor;
};

export const getVendedorByNombre = async (email) => {
  const vendedor = await db
    .collection("Vendedores")
    .findOne({ email: email })
  return vendedor;
};

export const getAutosDelVendedor = async (email) => {
  const vendedor = await db.collection("Vendedores").findOne({ email: email });
  console.log(email)
  const autos = vendedor?.autos_vendiendo || [];
  console.log("Vendedor", vendedor);
  console.log(autos);
  return autos;
};

export const agregarAutosAlVendedor = async (auto, email) => {

  console.log('auto', auto)

  console.log('user', email)
  const vendedor = await db
    .collection("Vendedores")
    .findOne({ email: email });

  const autos = vendedor?.autos_vendiendo || [];
  autos.push(auto);

  const vendedorActualizado = await db
    .collection("Vendedores")
    .updateOne(
      { email: vendedor.email },
      { $set: { autos_vendiendo: autos } }
    );

  return vendedorActualizado;
};
