const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Habilita CORS

const app = express();
const apiRouter = require('./routers/apiRouter');
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Habilita el análisis del cuerpo de la solicitud JSON

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en el puerto ${PORT}`);
});
