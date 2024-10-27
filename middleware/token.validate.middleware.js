import * as service from "../service/token.service.js";

export async function validateToken(req, res, next) {
  try {
    const token = req.headers["auth-token"];
    if (!token) return res.status(401).json({ message: "Token no encontrado" });

    const usuario = await service.validarToken(token);
    if (!usuario) return res.status(401).json({ message: "Token Invalido" });

    req.usuario = usuario; // duarnte toda mi aplicacio puedo saber q usuario esta mandando las solicitudes
    console.log(header);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token Invalido" });
  }
}
