import * as service from "../../service/auto.service.js";

export const getAutos = (req, res) => {
  const filtros = req.query;

  service
    .getAutos(filtros)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({message: err})
    });
};
export const getAutosByVendedor = (req, res) => {
  let name = req.params.vendedor;
  service
    .getAutosByVendedor(name)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const getAutoId = (req, res) => {
  const id = req.params.id;
  service
    .getAutoId(id)
    .then((auto) => {
      res.status(200).json(auto);
    })
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const getAutoByType = (req, res) => {
  service
    .getAutoByType(req.params.type)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const agregarAuto = (req, res) => {
  service
    .agregarAuto(req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const remplazarAuto = (req, res) => {
  service
    .remplazarAuto(req.params.id, req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const actualizarAuto = (req, res) => {
  service
    .actualizarAuto(req.params.id, req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const eliminadoLogico = (req, res) => {
  service
    .eliminadoLogico(req.params.id)
    .then((id) => res.status(202).json({ id: id }))
    .catch((err) => {
      res.status(400).json({message: err})
    });
};
