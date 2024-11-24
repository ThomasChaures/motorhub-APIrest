import { Router } from "express";
import { validateToken } from "../../middleware/token.validate.middleware.js";
import * as controller from "../controller/tipos-api.controller.js";
import { validateTipo } from "../../middleware/tipo.validate.middleware.js";
const route = Router();

route.get("/tipos", [validateToken], controller.getTipos);
route.get("/tipos/:tipo", [validateToken], controller.getTipo);
route.post("/tipos/nuevo", [validateToken, validateTipo], controller.addTipo);
export default route;
