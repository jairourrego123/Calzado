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
    console.log(`${serviceUrl}${req.url}`);
    console.log(req.body);
    console.log(req.method);
    
    const url = `${serviceUrl}${req.url}`;
    const token = req.headers.authorization; // Suponiendo que el token JWT se pasa en el encabezado de autorización
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        // ...req.headers,
        Authorization: token, // Añadir el token JWT al encabezado de autorización
      },
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    res.sendStatus(errores(error));
  }
};


router.get('/home',viewHome.viewGetHome)
router.use('/data', routeHandler(services.backend));
router.use('/devoluciones', routeHandler(services.devoluciones));
router.use('/entradas', routeHandler(services.entradas));
router.use('/finanzas', routeHandler(services.finanzas));
router.use('/gastos', routeHandler(services.gastos));
router.use('/gestionDeUsuarios', routeHandler(services.gestionDeUsuarios));
router.use('/inventario', routeHandler(services.inventario));
router.use('/ventas', routeHandler(services.ventas));
router.use('/generador_reportes', routeHandler(services.generador_reportes));

module.exports = router;
