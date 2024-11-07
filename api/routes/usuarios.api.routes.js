import { Router } from "express";
import * as controller from "../controller/usuarios-api.controller.js";
import {
  login,
  validateUser,
} from "../../middleware/usuario.validate.middleware.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";
const route = Router();

route.post("/usuarios", [validateUser], controller.createUser);
route.post("/usuarios/login", [login], controller.login);
route.get("/usuario", [validateToken], controller.getUser);

export default route;
