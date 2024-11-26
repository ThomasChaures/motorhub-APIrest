import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

export const agregarAutoRelacionMarca = async (auto) => {
  try {
    let nuevaMarca;
    const existe = await db.collection("Marcas").findOne({ marca: auto.brand });

    if (!existe) {
      nuevaMarca = {
        marca: auto.brand,
        autos: [auto],
      };

      const res = await db.collection("Marcas").insertOne(nuevaMarca);
      return nuevaMarca;
    } else {
      const autosArray = existe.autos;
      autosArray.push({ ...auto });

      await db
        .collection("Marcas")
        .updateOne({ marca: auto.brand }, { $push: { autos: auto } });
      return {
        ...existe,
        autos: [...existe.autos, auto],
      };
    }
  } catch (error) {
    console.error("Error al agregar el auto a la marca:", error);
  }
};

export const eliminarAutoDeMarcaLogico = async (auto_id, marca) => {
  try {
    const brand = await db.collection("Marcas").findOne({ marca: marca });

    if (!brand) {
      throw new Error("Marca no encontrada");
    }

    const autoIndex = brand.autos.findIndex((auto) => {
      auto.auto_id === auto_id;
    });

    const nuevosAutos = brand.autos.map((auto) =>
      auto.auto_id === auto_id ? { ...auto, eliminado: true } : auto
    );

    await db
      .collection("Marcas")
      .updateOne({ marca: marca }, { $set: { autos: nuevosAutos } });

    return { auto_id, marca, eliminado: true };
  } catch (error) {
    console.error("Error al eliminar auto de marca:", error);
  }
};

export const actualizarAutoMarca = async (auto_id, marca, auto) => {
  // Buscar la marca
  const brand = await db.collection("Marcas").findOne({ marca });

  // Validar que la marca exista
  if (!brand) {
    throw new Error("Marca no encontrada");
  }

  const nuevoAuto = {...auto, auto_id: auto_id}

  // Actualizar la lista de autos
  const nuevosAutos = brand.autos.map((auto2) =>
    auto2.auto_id === auto_id ? nuevoAuto : auto2
  );

  // Actualizar el documento de la marca en la base de datos
  await db
    .collection("Marcas")
    .updateOne({ marca }, { $set: { autos: nuevosAutos } });

  console.log("Auto actualizado correctamente en la marca");
};

export const remplazarAutoMarca = async (auto_id, marca) => {};

export const getMarcas = async () => {
  await cliente.connect();
  return db.collection("Marcas").find().toArray();
};

export const getMarca = async (marca) => {
  await cliente.connect();

  const datos = await db.collection("Marcas").findOne({ marca: marca });

  return datos;
};

export const addMarca = async (marca) => {
  try {
    await cliente.connect();

    const existe = await db
      .collection("Marcas")
      .findOne({ marca: marca.marca });

    if (existe) {
      throw new Error("Esta marca ya esta registrada.");
    }

    const nuevaMarca = { ...marca, autos: [], eliminado: false };
    const res = await db.collection("Marcas").insertOne(nuevaMarca);
    return marca;
  } catch (error) {
    console.error("Error al agregar marca:", error);
  }
};
