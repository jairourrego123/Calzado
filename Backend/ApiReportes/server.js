const express = require('express');
const app = express();
const cors = require('cors');
const port = 8001;
const ExcelJS = require('exceljs');
const router = require('./routers/routers');

app.use(express.json());



const apiKey = process.env.API_KEY


async function verifier(req, res, next){

  if (req.headers.authorization == `Api-Key ${apiKey}`)
   next()
   else
  return res.sendStatus(401)
}

app.use(verifier)
app.use('/api/generador_reportes/v1', router)

app.listen(port, () => {
  console.log(`Servidor Express funcionando en el puerto ${port}`);
});