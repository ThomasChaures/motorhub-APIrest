import * as service from "../../service/marcas.service.js";

export const getMarcas = (req, res) => {
  service
    .getMarcas()
    .then((marcas) => res.status(200).json(marcas))
    .catch((error) => {
      res.status(400).json({ mssage: error });
    });
};

export const getMarca = (req, res) => {
  service
    .getMarca(req.params.marca)
    .then((marca) => res.status(200).json(marca))
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

export const addMarca = (req, res) => {
  service
    .addMarca(req.body)
    .then((marca) => {
      res.status(201).json(marca);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
