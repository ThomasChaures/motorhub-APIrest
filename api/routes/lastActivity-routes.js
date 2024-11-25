import { Router } from "express";
import { validateToken } from "../../middleware/token.validate.middleware.js";
import { validateRol } from "../../middleware/usuario.validate.middleware.js";
import {getUa} from '../controller/lastActivity-api.controller.js'

const route = Router();

route.get("/last-activity", [validateToken, validateRol], getUa);

export default route;
