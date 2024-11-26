import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

export const getClienteApi = async () => {
  await cliente.connect();
  const vendedores = await db.collection("Vendedores").find().toArray();
  return vendedores;
};

export const agregarClienteApi = async (vendedor) => {
  await cliente.connect();

  const nuevoVendedor = { ...vendedor, eliminado: false };

  await db.collection("Vendedores").insertOne(nuevoVendedor);
  return vendedor;
};

export const agregarCliente = async (vendedor) => {
  await db.collection("Vendedores").insertOne(vendedor);
  return vendedor;
};

export const getClienteNombre = async (email) => {
  const vendedor = await db.collection("Vendedores").findOne({ email: email });
  return vendedor;
};

export const getVendedorByNombre = async (email) => {
  const vendedor = await db.collection("Vendedores").findOne({ email: email });
  return vendedor;
};

export const getAutosDelVendedor = async (email) => {
  const vendedor = await db.collection("Vendedores").findOne({ email: email });
  console.log(email);
  const autos = vendedor?.autos_vendiendo || [];
  console.log("Vendedor", vendedor);
  console.log(autos);
  return autos;
};

export const agregarAutosAlVendedor = async (auto, email) => {
  console.log("auto", auto);

  console.log("user", email);
  const vendedor = await db.collection("Vendedores").findOne({ email: email });

  const autos = vendedor?.autos_vendiendo || [];
  autos.push(auto);

  const vendedorActualizado = await db
    .collection("Vendedores")
    .updateOne({ email: vendedor.email }, { $set: { autos_vendiendo: autos } });

  return vendedorActualizado;
};

export const getVendedor = async (email) => {
  await cliente.connect();

  const user = await db.collection("Vendedores").findOne({ email: email });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const autos = user.autos_vendiendo || [];

  // Filtrar autos que no estén marcados como eliminados
  const autosNoEliminados = autos.filter((auto) => auto.eliminado !== true);

  const userFinal = { ...user, autos_vendiendo: autosNoEliminados };

  return userFinal;
};

export const eliminarAutoDeVendedorLogico = async (auto_id, email) => {
  try {
    const vendedor = await db
      .collection("Vendedores")
      .findOne({ email: email });

    if (!vendedor) {
      return console.log("No se encontro el vendedor");
    }

    const autoIndex = vendedor.autos_vendiendo.findIndex((auto) => {
      auto.auto_id === auto_id;
    });

    if (autoIndex === null) {
      return console.log("No se encontro el auto.");
    }

    const nuevosAutos = vendedor.autos_vendiendo.map((auto) => {
      auto.auto_id === auto_id ? { ...auto, eliminado: true } : auto;
    });

    await db
      .collection("Vendedores")
      .updateOne({ email: email }, { $set: { autos_vendiendo: nuevosAutos } });

    return { auto_id, vendedor, eliminado: true };
  } catch (error) {
    console.error("Error al eliminar auto de marca:", error);
  }
};

export const actualizarAutoVendedor = async (auto_id, email, auto) => {
  const vendedor = await db.collection("Vendedores").findOne({ email: email });

  if (!vendedor) {
    console.log("No se encontró el vendedor");
    return;
  }

 

  const nuevosAutos = vendedor.autos_vendiendo.map((auto2) =>
    auto2.auto_id === auto_id ? auto : auto2
  );


  return await db
    .collection("Vendedores")
    .updateOne({ email: email }, { $set: { autos_vendiendo: nuevosAutos } });
};
