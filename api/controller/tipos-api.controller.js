import * as service from "../../service/tipos.service.js";

export const getTipos = (req, res) => {
  service
    .getTipos()
    .then((tipos) => res.status(200).json(tipos))
    .catch((error) => {
      res.status(400).json({ mssage: error });
    });
};

export const getTipo = (req, res) => {
  service
    .getTipo(req.params.tipo)
    .then((tipo) => res.status(200).json(tipo))
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
