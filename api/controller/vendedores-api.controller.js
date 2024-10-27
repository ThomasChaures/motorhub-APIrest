import * as service from "../../service/vendedores.service.js";

export const getVendedores = (req, res) => {
  service
    .getClienteApi()
    .then((vendedores) => {
      res.status(200).json(vendedores);
    })
    .catch((err) => {
      res.status(400).json({message: err})
    });
};

export const postVendedores = async (req, res) => {
  const vendedor = req.body;
  await service.getVendedorByNombre(vendedor.nombre)
        .then(chequeo => {
            if(!chequeo){
                service
            .agregarClienteApi(vendedor)
            .then((auto) => res.status(201).json(auto))
            .catch((err) => {
              res.status(400).json({message: err})
            });
            }else{
                throw err;
            }
        })
        .catch((err) => {
          res.status(400).json({message: 'El vendedor ya existe'})
        });
};
