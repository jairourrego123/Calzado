var XlsxTemplate = require('xlsx-template');
const fs = require("fs");
const path = require("path");



async function GenerarReporte(archivo,datos, res) {
  try {
   
    // Leer el archivo de plantilla
    const data = await fs.readFileSync("formatos/"+archivo+".xlsx")

    // Crear un objeto XlsxTemplate a partir del archivo de plantilla
    const template = new XlsxTemplate(data);
    
    // Especificar el número de hoja a la que se aplicarán las sustituciones
    const sheetNumber = 1;

    // Especificar los valores a reemplazar en la plantilla
    const values = datos;
   

    // Aplicar las sustituciones en la plantilla
    template.substitute(sheetNumber, values);

    // Generar el archivo XLSX a partir de la plantilla modificada
    const buffer = template.generate({ type: 'nodebuffer', compression: "DEFLATE" });
    
    // Enviar la respuesta al cliente
    res.send(buffer);
  } catch (error) {
    console.log(error);
  }
}

module.exports = GenerarReporte;