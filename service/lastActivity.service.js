import { MongoClient, ObjectId } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@dwt4av-hibridas-cluster.boucf.mongodb.net/"
);
const db = cliente.db("AH20232CP1");

const ua = db.collection("UltimaActividad");

export const addUa = async (name, surname, activity, time) => {
  let notify = {
    name: name,
    surname: surname,
    activity: activity,
    time: time,
  };
  await ua.insertOne(notify);
  return notify;
};

export const getUa = async () => {
  await cliente.connect();
  return ua.find().toArray();
};
