import express from "express";
import apiAutosRutas from "./api/routes/autos-api.routes.js";
import apiVendedoresRutas from "./api/routes/vendedores-api.routes.js";
import apiUsuariosRutas from "./api/routes/usuarios.api.routes.js";
import apiMarcasRutas from "./api/routes/marcas-api.routes.js";
import apiTiposRutas from "./api/routes/tipos-api.routes.js";
import multer from "multer";
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
app.use("/api", apiTiposRutas);

const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb( null, "./uploads" )
  },
  filename: function(req, file, cb){
      cb( null, file.originalname.trim().replace(/\s/g, "_") )
  }
})

 const upload = multer({"storage": storage})

app.post("/upload", upload.single('file'), (req, res) => {
  console.log(req.file)
  const fileUrl = `http://localhost:5173/uploads/${req.file.filename}`;
  console.log(fileUrl)
  res.status(200).json({file: fileUrl})
} )
app.use('/uploads', express.static('uploads'));

app.listen(3333, () => console.log("Server Funcando"));
