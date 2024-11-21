import * as service from "../../service/usuarios.service.js"

export function createUser(req, res){
    service.createUser(req.body)
        .then((usuario) => res.status(201).json({usuario}))
        .catch((err) => res.status(400).json({message: err}))
}

export function createAdmin(req, res){
    service.createAdmin(req.body)
    .then((usuario) => res.status(201).json({usuario}))
    .catch((err) => res.status(400).json({message: err}))
}


export function login(req, res){
    service.login(req.body)
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo loguear."}))
}


export function getUser(req, res){
    service.getUser(req.usuario._id)
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo obtener el usuario."}))
}

export function getUsers(req, res){
    service.getUsers()
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo obtener el usuario."}))
}

export function getUserData(req, res){
    console.log(req.body)
    service.getUserRole(req.params.id)
    .then( (usuario) => res.status(200).json(usuario))
    .catch( () => res.status(400).json({message: "No se pudo obtener el usuario."}))
}