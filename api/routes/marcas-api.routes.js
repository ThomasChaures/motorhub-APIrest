import { Router } from "express";
import * as controller from "../controller/marcas-api.controller.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";
import { validateMarca } from "../../middleware/marca.validate.middleware.js";

const route = Router();

route.get("/marcas", [validateToken], controller.getMarcas);
route.get("/marcas/:marca", [validateToken], controller.getMarca);
route.post("/marcas/nueva", [validateToken, validateMarca], controller.addMarca);


export default route;

