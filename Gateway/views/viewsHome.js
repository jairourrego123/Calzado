const axios = require('axios')
const config = require('../config.json')
const views = {}

views.viewGetHome = async (req, res) => {
    try {
        const ventasUrl = config;
        const gastosUrl = 'http://gastos-service/api/gastos';
        const movimientosUrl = 'http://movimientos-service/api/movimientos';

        // Realiza peticiones a los microservicios
        const [ventasResponse, gastosResponse, movimientosResponse] = await Promise.all([
            axios.get(ventasUrl),
            axios.get(gastosUrl),
            axios.get(movimientosUrl)
        ]);

        // Extrae los datos de las respuestas
        const ventas = ventasResponse.data;
        const gastos = gastosResponse.data;
        const movimientos = movimientosResponse.data;

        // Agrega la información
        const aggregatedData = {
            ventas,
            gastos,
            movimientos
        };

        // Devuelve el JSON con la información agregada
        res.json(aggregatedData);
    } catch (error) {
        console.error('Error al obtener los datos agregados:', error);
        res.status(500).send('Error al obtener los datos agregados');
    }
}

module.exports= views;

