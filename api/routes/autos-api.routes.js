import { Router } from "express";
import * as controllersPeugot from "../controller/autos-api.controller.js";
import { validateAuto } from "../../middleware/auto.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js";
import { validateComentario } from "../../middleware/comentario.validate.middleware.js";
import { validateAction } from "../../middleware/auto.validate.middleware.js";
import { validateRespuesta } from "../../middleware/comentario.validate.middleware.js";

const route = Router();

route.get("/autos/tipos/:type", [validateToken], controllersPeugot.getAutoByType); // recurso
route.get("/autos/:id", [validateToken], controllersPeugot.getAutoId); // recurso
route.get("/autos", [validateToken], controllersPeugot.getAutos); 
route.get("/au/all", [validateToken], controllersPeugot.getAutosAll); 

route.patch("/autos/compra/:id/:user_id", [validateToken], controllersPeugot.comprarAuto)

route.post("/autos", [validateAuto, validateToken], controllersPeugot.agregarAuto); // crear
route.put("/autos/:id", [ validateToken, validateAction], controllersPeugot.remplazarAuto); // remplazar
route.patch("/autos/:id", [validateToken, validateAction], controllersPeugot.actualizarAuto); // actualizar
route.delete("/autos/:id", [validateToken, validateAction], controllersPeugot.eliminadoLogico); // eliminar

route.post("/auto/:id/comentar",  [validateComentario],controllersPeugot.comentarAuto);
route.post("/auto/:id/comentario/:index/responder", [validateRespuesta] ,controllersPeugot.responderComentario);

export default route;
