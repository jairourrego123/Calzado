const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Habilita CORS
const authenticateJWT = require('./middleware/authenticateJWT');
const config = require('./config.json');
const cookieParser = require('cookie-parser');
const services = config.services;

const app = express();
const apiRouter = require('./routers/apiRouter');
const errores = require('./errors');


app.use(express.json()); // Habilita el análisis del cuerpo de la solicitud JSON
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000', // Solo permite peticiones desde tu frontend
  credentials: true
}));
// Ruta para refrescar el token
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${services.autenticacion}/token/`, req.body,{ withCredentials: true });
    const { access } = response.data;
    res.json({ access });
  } catch (error) {
    errores(error)
    res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'error desconocido' });
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    console.log('Refresh token is missing' );
    return res.sendStatus(400);
    
  }
  
  console.log("refresh token",refreshToken);
  try {
    const response = await axios.post(`${services.autenticacion}/token/refresh/`, { refresh: refreshToken }, { withCredentials: true });
    const { access } = response.data;
    res.json({ access });
  } catch (error) {
    errores(error)

      res.sendStatus(403);
  }
});


app.post('/api/auth/logout', async (req, res) => {

  try {
    const response = await axios.post(`${services.autenticacion}/logout/`, req.body,{ withCredentials: true });
    res.clearCookie('refresh_token');
    res.json({ message: 'Logout successful' });
} catch (error) {
    res.status(error.response.status).json({ error: error.response.data });
}
});

app.use('/api', authenticateJWT,apiRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en el puerto ${PORT}`);
});
