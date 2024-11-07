import * as service from "../../service/usuarios.service.js"

export function createUser(req, res){
    service.createUser(req.body)
        .then((usuario) => res.status(201).json({usuario}))
        .catch((err) => res.status(400).json({message: err}))
}


export function login(req, res){
    console.log(req.body)
    service.login(req.body)
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo loguear."}))
}


export function getUser(req, res){
    console.log(req.body)
    service.getUser(req.usuario._id)
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo obtener el usuario."}))
}