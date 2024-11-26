import * as service from "../../service/auto.service.js";

export const getAutos = (req, res) => {
  const filtros = req.query;

  service
    .getAutos(filtros)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const getAutosAll = (req, res) => {
  const filtros = req.query;

  service
    .getAutosAll(filtros)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
export const getAutosByVendedor = (req, res) => {
  let email = req.params.email;
  service
    .getAutosByVendedor(email)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
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
      res.status(400).json({ message: err });
    });
};

export const getAutoByType = (req, res) => {
  service
    .getAutoByType(req.params.type)
    .then((autos) => {
      res.status(200).json(autos);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const agregarAuto = (req, res) => {
  service
    .agregarAuto(req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const comentarAuto = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  service
    .comentarAuto(id, req.body)
    .then((comentario) => res.status(201).json(comentario))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const responderComentario = async (req, res) => {
  const { id, index } = req.params;
  console.log(req.params)
  console.log(req.body)
  service
    .responderComentario(id, req.body, index)
    .then((comentario) => res.status(201).json(comentario))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const remplazarAuto = (req, res) => {
  service
    .remplazarAuto(req.params.id, req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const actualizarAuto = (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  service
    .actualizarAuto(req.params.id, req.body)
    .then((auto) => res.status(201).json(auto))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

export const eliminadoLogico = (req, res) => {
  service
    .eliminadoLogico(req.params.id)
    .then((id) => res.status(202).json({ id: id }))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
