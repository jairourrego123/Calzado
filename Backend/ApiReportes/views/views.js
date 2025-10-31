const views = {};
const fs = require('fs');
const path = require('path');
const config = require("../config.json");
const general = require("../reportes/General")
const pool = require('../database');
const { log } = require('console');

require('dotenv').config();



views.GenerarReporte = async (req, res) => {

  try {
 
  const { tipo_reporte, fecha_inicio, fecha_fin, tenant } = req.body;
  console.log("tipo reporte:",tipo_reporte );
  
  const {nombre} = await ObtenerReportesById(tipo_reporte,tenant);
  console.log("nombre reporte:",nombre );
  
  if (!nombre || !fecha_inicio || !fecha_fin || !tenant) {
        return res.status(400).json({ error: "Todos los parámetros son obligatorios." });
    }

    const results = await getReport(nombre.replace(/ /g, ""), [tenant,fecha_inicio, fecha_fin ]);
      
    general.LibroRadicador(req, res, results);

  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).send('Error al ejecutar la consulta');
  }
    

}

views.ObtenerReportes = async (req, res) => {
  try {
    
    const { tenant} = req.body;
    
    if (!tenant) {
      console.error('El parámetro tenant es obligatorio.');
      return res.status(400).json({ error: 'El parametros invalidos.' });
    }
    const client = await pool.connect();

    const result = await client.query(
      `
      SELECT id,nombre, descripcion
      FROM "ApiBackendApp_reporte"
      WHERE state = true
        AND (tenant_id = $1 or tenant_id IS NULL)
      ORDER BY nombre ASC
      `,
      [tenant]
    );

    client.release();
    res.json(result.rows);

  } catch (error) {
    console.error('Error al listar reportes :', error);
    res.status(500).json({ error: 'Error al listar reportes' });
  }
};

async function ObtenerReportesById(id,tenant) {
  try {
    
    const client = await pool.connect();
    const query =   `
      SELECT nombre
      FROM "ApiBackendApp_reporte"
      WHERE state = true
        AND id = $1
        AND (tenant_id = $2 or tenant_id IS NULL)
      `;

    const result = await client.query(
    query,
      [id,tenant]
    );

    client.release();
    return result.rows[0];

  } catch (error) {
    console.error('Error al listar reportes :', error);
  }
};
function getQueryFromFile(nombre) {
  try {
    const sqlFilePath = path.join(__dirname, '../scripts/sql', `${nombre}.sql`);
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
    return sqlQuery;
  } catch (error) {
    console.error(`Error al leer el archivo SQL: ${error.message}`);
    throw new Error('No se pudo cargar la consulta SQL');
  }
}

async function getReport(nombre, parametros = []) {
  let client;
  try {
    console.info("Generando reporte:", nombre);
    
    const sqlQuery = getQueryFromFile(nombre);
    
    client = await pool.connect();
    const result = await client.query(sqlQuery, parametros);

    return result.rows;
  } catch (error) {
    console.error(`Error al ejecutar el reporte "${nombre}":`, error.message);
    throw new Error(`No se pudo ejecutar el reporte "${nombre}"`);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = views;