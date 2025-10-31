const express = require("express");
const views = require("../views/views");
const router = express.Router();



router.post("/", views.GenerarReporte);
router.get("/obtener-reportes", views.ObtenerReportes);
module.exports = router;