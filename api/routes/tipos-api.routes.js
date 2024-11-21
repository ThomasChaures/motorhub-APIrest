import { Router } from "express";
import { validateToken } from "../../middleware/token.validate.middleware.js";
const route = Router();

route.get('/tipos', [validateToken],)

export default route