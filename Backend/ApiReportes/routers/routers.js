const express = require("express");
const views = require("../views/views");
const router = express.Router();



router.post("/", views.Reportes);
module.exports = router;