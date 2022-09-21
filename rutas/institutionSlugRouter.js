import express from "express";
import { DataTypes } from "sequelize";
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
      type: DataTypes.JSON,
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

// GET de un solo institution
router.get("/:slug", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Institution.findOne({ where: { slug: req.params.slug } })
        //.then((Institution) => Institution.get({ plain: true }))
        .then((Institution) =>
          res.json({
            ok: true,
            data: Institution,
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
