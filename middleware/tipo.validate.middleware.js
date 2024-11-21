import { tipoSchema } from "../schemas/tipo.validate.js";


export async function validateTipo(req, res, next) {
    try {
      const datosValidados = await tipoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = datosValidados;
      next();
    } catch (error) {
      res.status(400).json({ message: error.errors });
    }
  }