const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./database'); 
const router = require('./routers/routers');

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

const apiKey = process.env.API_KEY;
function verifier(req, res, next) {  
  if (req.headers['x-api-key'] === `Api-Key ${apiKey}`) {
    next();
  } else {
    return res.status(401).send({ error: 'No autorizado' });
  }
}
app.use(verifier);

app.use('/api/reportes', router);

const server = app.listen(port, () => {
  console.log(`Servidor Express funcionando en el puerto ${port}`);
});

process.on('SIGINT', async () => {
  console.log('Cerrando conexión a la base de datos...');
  await pool.end();
  console.log('Conexión cerrada. Apagando servidor.');
  server.close(() => process.exit(0));
});

module.exports = app; 
