// routers/apiRouter.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config.json');
const viewHome = require('../views/viewsHome');
const errores = require('../errors');

const services = config.services;



const routeHandler = (serviceUrl) => async (req, res) => {
  try {
    const url = `${serviceUrl}${req.url}`;
    const token = req.headers.authorization; // Suponiendo que el token JWT se pasa en el encabezado de autorización
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        ...req.headers,
        Authorization: token, // Añadir el token JWT al encabezado de autorización
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.sendStatus(errores(error));
  }
};

router.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${services.autenticacion}/login/`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'Unknown error' });
  }
});
router.get('/home',viewHome.viewGetHome)
router.use('/data', routeHandler(services.backend));
router.use('/devoluciones', routeHandler(services.devoluciones));
router.use('/entradas', routeHandler(services.entradas));
router.use('/finanzas', routeHandler(services.finanzas));
router.use('/gastos', routeHandler(services.gastos));
router.use('/gestionDeUsuarios', routeHandler(services.gestionDeUsuarios));
router.use('/inventario', routeHandler(services.inventario));
router.use('/ventas', routeHandler(services.ventas));

module.exports = router;
