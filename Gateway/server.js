const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Habilita CORS

const app = express();
const apiRouter = require('./routers/apiRouter');
app.use(cors({
  origin: 'http://localhost:3000', // unicamente al dominio de tu frontend
  credentials: true
}));
app.use(express.json()); // Habilita el análisis del cuerpo de la solicitud JSON


// Middleware para verificar el referer/origin
app.use((req, res, next) => {
  console.log(req.headers.referer);
  const allowedOrigins = ['http://localhost']; //  dominio de del frontend
  const origin = req.headers.origin || req.headers.referer;
  
  if (allowedOrigins.includes(origin)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});
app.use('/api', apiRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en el puerto ${PORT}`);
});
