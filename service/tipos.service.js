import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

const Tipos = db.collection("Tipos");

export const agregarAutoRelacionTipo = async (auto) => {
  try {
    let nuevoTipo;
    const existe = await Tipos.findOne({ tipo: auto.type });

    if (!existe) {
      nuevoTipo = {
        tipo: auto.type,
        autos: [auto],
      };

      await Tipos.insertOne(nuevoTipo);
      return nuevoTipo;
    } else {
      const autosArray = existe.autos;
      autosArray.push({ ...auto });

      await Tipos.updateOne({ tipo: auto.type }, { $push: { autos: auto } });
      return {
        ...existe,
        autos: [...existe.autos, auto],
      };
    }
  } catch (error) {
    console.error("Error al agregar el auto a tipos:", error);
  }
};

export const eliminarAutoDeTipoLogico = async (auto_id, tipo) => {
  try {
    const type = await Tipos.findOne({ tipo: tipo });

    if (!type) {
      throw new Error("Tipo no encontrado");
    }

    const autoIndex = type.autos.findIndex((auto) => auto.auto_id === auto_id);

    const nuevosAutos = type.autos.map((auto) =>
      auto.auto_id === auto_id ? { ...auto, eliminado: true } : auto
    );

    console.log(nuevosAutos);

    await Tipos.updateOne({ tipo: tipo }, { $set: { autos: nuevosAutos } });

    return { auto_id, tipo, eliminado: true };
  } catch (error) {
    console.error("Error al eliminar auto de tipos:", error);
  }
};

export const actualizarAutoTipo = async (auto_id, tipo, auto) => {
  const types = await Tipos.findOne({ tipo: tipo });

  if (!brand) {
    throw new Error("Marca no encontrada");
  }

  const autoIndex = types.autos.findIndex((auto2) => {
    auto2.auto_id === auto_id;
  });

  const nuevosAutos = types.autos.map((auto2) =>
    auto2.auto_id === auto_id ? { auto } : auto2
  );

  await Tipos.updateOne({ tipo: tipo }, { $set: { autos: nuevosAutos } });
};

export const getTipos = async () => {
  await cliente.connect();
  const datos = await Tipos.find().toArray();
  return datos;
};

export const getTipo = async (tipo) => {
  await cliente.connect();
  const datos = await Tipos.findOne({ tipo: tipo });
  return datos;
};

export const addTipo = async (tipo) => {
  try {
    await cliente.connect();

    const existe = await Tipos.findOne({ tipo: tipo.tipo });

    if (existe) {
      throw new Error("Este tipo ya esta registrado.");
    }

    const datos = await Tipos.insertOne(tipo);
    return tipo;
  } catch (error) {
    console.error("Error al agregar tipo:", error);
  }
};
