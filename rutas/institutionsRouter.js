import express, { raw } from "express";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../loadSequelize.js";

//DEFINICION DEL MODELO
const Institution = sequelize.define(
  "Institution",
  {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    web: DataTypes.STRING,
    days: DataTypes.STRING,
    timetable: DataTypes.STRING,
    categories: DataTypes.STRING,
    information: DataTypes.STRING,
    direction: DataTypes.STRING,

    categories: {
      type: Sequelize.JSON,
      allowNull: false,
      get() {
        return this.getDataValue("categories").split(";");
      },
    },

    direction: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("direction"));
      },
      set: function (value) {
        return this.setDataValue("direction", JSON.stringify(value));
      },
    },
  },

  { tableName: "institution", timestamps: false }
);

const router = express.Router();

// GET lista de todos los institution
// vinculamos la ruta /api/institution a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_alumne...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}

router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Institution.findAll()
        .then((institution) =>
          res.json({
            ok: true,
            data: institution,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            error: error,
          })
        );
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error,
      });
    });
});
export default router;
