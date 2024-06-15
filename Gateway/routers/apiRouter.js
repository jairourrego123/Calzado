// routers/apiRouter.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config.json');
const viewHome = require('../views/viewsHome')

const services = config.services;

const routeHandler = (serviceUrl) => async (req, res) => {
  try {
    const url = `${serviceUrl}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

router.get('/home',viewHome.viewGetHome)
router.use('/devoluciones', routeHandler(services.devoluciones));
router.use('/entradas', routeHandler(services.entradas));
router.use('/finanzas', routeHandler(services.finanzas));
router.use('/gastos', routeHandler(services.gastos));
router.use('/gestionDeUsuarios', routeHandler(services.gestionDeUsuarios));
router.use('/inventario', routeHandler(services.inventario));
router.use('/ventas', routeHandler(services.ventas));

module.exports = router;
