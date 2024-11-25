import { MongoClient, ObjectId } from "mongodb";
import * as serviceVendedores from "./vendedores.service.js";
import * as serviceMarcas from "./marcas.service.js";
import * as serviceTipos from "./tipos.service.js";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

export const getAutos = async (filtros = {}) => {
  const filterMongo = { eliminado: { $ne: true }, status: {$eq: 'for sale'} };
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

export const getAutosByVendedor = async (email) => {
  await cliente.connect();
``
  const autos = await serviceVendedores.getAutosDelVendedor(email);

  console.log(usuario);

  return autos;
};

export const getAutoByType = async (type) => {
  await cliente.connect();
  const datos = await db.collection("Autos").find({ type }).toArray();
  return datos;
};

export const agregarAuto = async (auto) => {
  try {
    await cliente.connect();
    

    if (auto.vendedor) {
      let vendedor = await serviceVendedores.getClienteNombre(auto.vendedor);
      if (!vendedor) {
        const vendCliente = {
          user_id: auto.vendedor.user_id,
          name: auto.vendedor.name,
          surname: auto.vendedor.surname,
          email: auto.vendedor.email,
          autos_vendiendo: [],
        };
        await serviceVendedores.agregarCliente(vendCliente);
      }
    }


    const nuevoAuto = {
      ...auto,
      comments: [],
      eliminado: false,
      status: 'pending'
    };


    const res = await db.collection("Autos").insertOne(nuevoAuto);
    const autoId = res.insertedId.toString();

    const autoMarca = {
      ...nuevoAuto,
      auto_id: autoId,
    };

   
    const operaciones = [
      serviceMarcas.agregarAutoRelacionMarca(autoMarca),
      serviceTipos.agregarAutoRelacionTipo(autoMarca)
    ];

 
    if (auto.vendedor) {
      operaciones.push(
        serviceVendedores.agregarAutosAlVendedor(nuevoAuto, auto.vendedor.email)
      );
    }

    
    await Promise.all(operaciones);

    return auto;
  } catch (error) {
    console.error('Error al agregar auto:', error);
    throw error;
  }
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
    return await db
      .collection("Autos")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { comments: arrayDeComentarios } }
      );
   
  } catch (err) {
    console.error("Error al agregar el comentario:", err);
  }
};

export const responderComentario = async (id, respuesta, index) => {
  try {
    await cliente.connect();
    const auto = await db
      .collection("Autos")
      .findOne({ _id: new ObjectId(id) });
    if (!auto) {
      throw new Error("Auto no encontrado");
    }
    if (!auto.comments || !auto.comments[index]) {
      throw new Error("Comentario no encontrado");
    }else{
      console.log(auto.comments[index])
    }

    console.log(id, respuesta)

    console.log(respuesta)

    const arrayDeComentarios = auto.comments;
    arrayDeComentarios[index].answers.push(respuesta);
    return await db
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

   await serviceMarcas.actualizarAutoMarca(id, autoActualizado.brand, autoActualizado) 
   await serviceTipos.actualizarAutoTipo(id, autoActualizado.brand, autoActualizado) 
  return autoUpdate;
};
