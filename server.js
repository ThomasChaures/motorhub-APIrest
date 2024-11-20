import express from "express";
import apiAutosRutas from "./api/routes/autos-api.routes.js";
import apiVendedoresRutas from "./api/routes/vendedores-api.routes.js";
import apiUsuariosRutas from "./api/routes/usuarios.api.routes.js";
import apiMarcasRutas from "./api/routes/marcas-api.routes.js";
import cors from "cors";

const app = express();
app.use(express.static("img"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions));

app.use("/api", apiAutosRutas);
app.use("/api", apiVendedoresRutas);
app.use("/api", apiUsuariosRutas);
app.use("/api", apiMarcasRutas);

app.listen(3333, () => console.log("Server Funcando"));
