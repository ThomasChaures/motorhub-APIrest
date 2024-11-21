import { MongoClient, ObjectId } from "mongodb";
import * as serviceVendedores from "./vendedores.service.js";
import * as serviceMarcas from "./marcas.service.js";
import * as serviceTipos from "./tipos.service.js";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

export const getAutos = async (filtros = {}) => {
  const filterMongo = { eliminado: { $ne: true } };
  if (filtros.year !== undefined) {
    filterMongo.year = { $eq: parseInt(filtros.year) };
  }

  if (filtros.horsepower !== undefined) {
    filterMongo.horsepower = { $eq: parseInt(filtros.horsepower) };
  }

  if (filtros.brand !== undefined) {
    filterMongo.brand = { $eq: filtros.brand };
  }

  if (filtros.usage !== undefined) {
    filterMongo.usage = { $eq: filtros.usage };
  }

  if (filtros.oficial !== undefined) {
    filterMongo.vendedor = { $exists: true, $ne: null };
  }

  if (filtros.precioMinimo !== undefined || filtros.preciMaximo !== undefined) {
    filterMongo.$and = [];

    if (filtros.precioMinimo !== undefined) {
      filterMongo.$and.push({
        price: { $gt: parseInt(filtros.precioMinimo) },
      });
    }

    if (filtros.precioMaximo !== undefined) {
      filterMongo.$and.push({
        price: { $lt: parseInt(filtros.precioMaximo) },
      });
    }
  }

  if (filtros.description !== undefined) {
    filterMongo.$text = { $search: filtros.description };
  }

  await cliente.connect();
  return db.collection("Autos").find(filterMongo).toArray();
};

export const getAutoId = async (id) => {
  await cliente.connect();
  const datos = await db
    .collection("Autos")
    .findOne({ _id: ObjectId.createFromHexString(id) });
  return datos;
};

export const getAutosByVendedor = async (vendedor) => {
  await cliente.connect();

  const carros = await serviceVendedores.getAutosDelVendedor(vendedor);

  console.log(carros);

  const autos = await db
    .collection("Autos")
    .find({
      _id: { $in: carros.map((id) => ObjectId.createFromHexString(id)) },
    })
    .toArray();

  return autos;
};

export const getAutoByType = async (type) => {
  await cliente.connect();
  const datos = await db.collection("Autos").find({ type }).toArray();
  return datos;
};

export const agregarAuto = async (auto) => {
  await cliente.connect();
  console.log(auto);
  console.log(auto.vendedor);
  if (auto.vendedor) {
    let vendedor = await serviceVendedores.getClienteNombre(auto.vendedor);

    if (!vendedor) {
      const vendCliente = {
        user_id: auto.vendedor._id,
        name: auto.vendedor.name,
        surname: auto.vendedor.surname,
        email: auto.vendedor.email,
        autos_vendiendo: [],
      };
      await serviceVendedores.agregarCliente(vendCliente);
    }
  }

  const nuevoAuto = {...auto, eliminado: false}
  const res = await db.collection("Autos").insertOne(nuevoAuto);

  const autoId = res.insertedId.toString();
  console.log("ID del auto insertado:", autoId);

  if (auto.vendedor) {
    serviceVendedores.agregarAutosAlVendedor(autoId, auto.vendedor);
    serviceVendedores.getAutosDelVendedor(auto.vendedor);
  }

  const autoMarca = {
    ...nuevoAuto,
    auto_id: autoId,
  };
  console.log(autoMarca);

  await serviceMarcas.agregarAutoRelacionMarca(autoMarca);
  await serviceTipos.agregarAutoRelacionTipo(autoMarca);

  return auto;
};

export const eliminadoLogico = async (id) => {
  await cliente.connect();
  const datos = await db
    .collection("Autos")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  await db
    .collection("Autos")
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { eliminado: true } }
    );

  await serviceMarcas.eliminarAutoDeMarcaLogico(id, datos.brand);
  await serviceTipos.eliminarAutoDeTipoLogico(id, datos.type)
  return id;
};

export const remplazarAuto = async (id, autoRemplazado) => {
  await cliente.connect();
  await db
    .collection("Autos")
    .replaceOne({ _id: ObjectId.createFromHexString(id) }, autoRemplazado);
  return autoRemplazado;
};

export const comentarAuto = async (id, comentario) => {
  try {
    await cliente.connect();
    const auto = await db
      .collection("Autos")
      .findOne({ _id: new ObjectId(id) });

    if (!auto) {
      throw new Error("Auto no encontrado");
    }

    const nuevoComentario = {...comentario, answers: []}

    const arrayDeComentarios = auto.comments;

    arrayDeComentarios.push(nuevoComentario);

    console.log(arrayDeComentarios)
    await db
      .collection("Autos")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { comments: arrayDeComentarios } }
      );
    console.log("Comentario agregado exitosamente");
  } catch (err) {
    console.error("Error al agregar el comentario:", err);
  }
};

export const responderComentario = async (id, comentarioIndex, respuesta) => {
  try {
    await cliente.connect();
    const auto = await db
      .collection("Autos")
      .findOne({ _id: new ObjectId(id) });
    if (!auto) {
      throw new Error("Auto no encontrado");
    }
    if (!auto.comments || !auto.comments[comentarioIndex]) {
      throw new Error("Comentario no encontrado");
    }

    const arrayDeComentarios = auto.comments;
    arrayDeComentarios[comentarioIndex].answers.push(respuesta);
    await db
      .collection("Autos")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { comments: arrayDeComentarios } }
      );
  } catch (error) {}
};

export const actualizarAuto = async (id, autoActualizado) => {
  await cliente.connect();
  const autoUpdate = await db
    .collection("Autos")
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: autoActualizado }
    );
  return autoUpdate;
};
