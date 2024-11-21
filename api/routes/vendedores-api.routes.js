import { Router } from "express";
import * as controllerVendedores from "../controller/vendedores-api.controller.js";
import * as controllersPeugot from "../controller/autos-api.controller.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";
import { validateVendedor } from "../../middleware/vendedores.validate.middleware.js";

const route = Router();
route.get("/vendedores", [validateToken], controllerVendedores.getVendedores); // recurso

route.get("/autos/vendedores/:vendedor", [validateToken], controllersPeugot.getAutosByVendedor); // recurso

route.post("/vendedores", [validateToken, validateVendedor], controllerVendedores.postVendedores); // crear


export default route;