import { Router } from "express";
import * as controller from "../controller/usuarios-api.controller.js";
import {
  login,
  validateRol,
  validateUser,
} from "../../middleware/usuario.validate.middleware.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";
const route = Router();

route.post("/usuarios/register", [validateUser], controller.createUser);
route.post("/usuarios/login", [login], controller.login);
route.get("/usuario", [validateToken], controller.getUser);

route.get("/usuario/:id", [validateToken], controller.getUser)

route.get('/usuarios', [validateToken], controller.getUsers)

route.post('/usuarios/admin/crear', [validateToken, validateUser, validateRol])

export default route;
