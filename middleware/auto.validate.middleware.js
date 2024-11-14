import { autoSchema } from "../schemas/autos.validate.js";
import { getAuto } from "../../front/src/service/autos.service.js";

export async function validateAuto(req, res, next) {
  try {
    const datosValidados = await autoSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}

export async function validateAction(req, res, next) {
  try {
    const user = req.usuario;
    const autoId = req.params.id;

    if (!auto) {
      return res.status(404).json({ message: "Auto no encontrado" });
    }

    const auto = getAuto(autoId);

    if (user.role === "Admin") {
      next();
    } else if (auto.vendedor._id === user._id) {
      next();
    }

    return res
      .status(404)
      .json({ message: "No tenes permisos para realizar esta accion." });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
