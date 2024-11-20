import { autoSchema } from "../schemas/autos.validate.js";
import { getAutoId } from "../service/auto.service.js";
import * as service from "../service/token.service.js";

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
    const token = req.headers["auth-token"];
    const user = await service.validarToken(token);  

    const autoId = req.params.id;

 
    const auto = await getAutoId(autoId); 


    if (!auto) {
      return res.status(404).json({ message: "Auto no encontrado" });
    }


    if (user.role === "Admin" || auto.vendedor.email === user.email) {
      return next(); 
    }

  
    return res.status(403).json({ message: "No tenes permisos para realizar esta accion." });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
}

