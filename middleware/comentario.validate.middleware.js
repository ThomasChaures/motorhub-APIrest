import { comentarioSchema } from "../schemas/comentarios.validate.js";

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
