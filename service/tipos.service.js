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
