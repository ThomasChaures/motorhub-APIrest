import { comentarioSchema } from "../schemas/comentarios.validate.js";
import { respuestaSchema } from "../schemas/respuestas.validate.js";

export async function validateComentario(req, res, next) {
  try {
    const datosValidados = await comentarioSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}

export async function validateRespuesta(req, res, next) {
  try {
    const datosValidados = await respuestaSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}
