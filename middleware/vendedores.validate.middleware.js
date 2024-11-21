import { vendedorSchema } from "../schemas/vendedores.validate.js";

export async function validateVendedor(req, res, next) {
  try {
    const datosValidados = await vendedorSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}
