import * as service from "../service/token.service.js";

export async function validateToken(req, res, next) {
  try {
    const token = req.headers["auth-token"];
    if (!token) return res.status(401).json({ message: "Token no encontrado" });

    const usuario = await service.validarToken(token);
    if (!usuario) return res.status(401).json({ message: "Token Invalido" });

    req.usuario = usuario; // This allows us to know which user is making the request throughout the application
    console.log("Token:", token);
    console.log("Usuario:", req.usuario);
    next();
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(401).json({ message: "Token Invalido" });
  }
}

