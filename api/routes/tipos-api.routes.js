import { Router } from "express";
import { validateToken } from "../../middleware/token.validate.middleware.js";
import * as controller from "../controller/tipos-api.controller.js";
const route = Router();

route.get("/tipos", [validateToken], controller.getTipos);
route.get("/tipos/:tipo", [validateToken], controller.getTipo);

export default route;
