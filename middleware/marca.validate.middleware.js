import { marcaSchema } from "../schemas/marca.validate.js";

export async function validateMarca(req, res, next) {
    try {
      const datosValidados = await marcaSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = datosValidados;
      next();
    } catch (error) {
      res.status(400).json({ message: error.errors });
    }
  }