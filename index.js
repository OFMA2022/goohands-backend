//importamos express y controladores
import express from "express";
import institutionsRouter from "./rutas/institutionsRouter.js";
import institutionSlugRouter from "./rutas/institutionSlugRouter.js";
import cors from "cors";

//instanciamos nueva aplicación express
const app = express();
//Access-Control-Allow-Origin
app.use(cors());
//necesario para poder recibir datos en json
app.use(express.json());
//las rutas que empiecen por /api/ se dirigirán a institutionRouter
app.use("/api/getAll/institutions/", institutionsRouter);
app.use("/api/getOne/", institutionSlugRouter);
app.get("/", (req, res) => {
  res.send("VAMOS EQUIPOS!! --> 3001");
});
//arranque del servidor
const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));
