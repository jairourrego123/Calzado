const ExcelJS = require('exceljs');

const funcion={}


funcion.LibroRadicador=async (req,res,datos)=> {


  const workbook = new ExcelJS.Workbook();
  workbook.views = [ // controlan cuántas ventanas separadas Excel abrirá al ver el libro de trabajo.
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]
    const nombre = req.body.nombre
    const color =  "00460F"
    const sheet = workbook.addWorksheet(nombre, { properties: { tabColor: { argb: color } } }); //  agregar hoja de trabajo 

    const worksheet = workbook.getWorksheet(nombre)
    worksheet.views = [
      { state: 'frozen', xSplit: 0, ySplit: 1 }
    ];

    const fontEncabezado = { name: 'FrankRuehl', family: 4, size: 14, color: { argb: 'FFFFFF' }, width: 50 }; // 
    const fillEncabezado = { type: 'pattern', pattern: 'solid', fgColor: { argb: color }, bgColor: { argb: color } }
    const border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    const fontFilasDatos = {name: 'Calibri', family: 4, size: 8,color:{argb:'000000'} }; // 
    
    //Creacion de columnas
    worksheet.columns = []
    
    if(datos.length<1){return res.sendStatus(204)} 
    for (const key in datos[0]) {
      if (key=='Descripcion') {
        worksheet.columns=worksheet.columns.concat({ header: key,key:key, width: 95, style: { border: border } })
      
      }
      else{
      worksheet.columns=worksheet.columns.concat({ header: key,key:key, width: 32.64, style: { border: border } })
      }
      
    }
    //Ajustar ancho automatico de las columnas 
    

    // Insertar Informacion
    for (const iterator of datos) {
      let fila=worksheet.addRow(iterator, 'n')
      fila.font=fontFilasDatos
      fila.alignment = { vertical: 'middle', horizontal: 'center' }
  }


    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).font = fontEncabezado

    for (let i = 1; i <= worksheet.lastColumn.number; i++) {
      worksheet.getCell(1, i).fill = fillEncabezado

    }
    
    // Formato condicional 
    worksheet.addConditionalFormatting({
      ref: "A1:"+worksheet.lastColumn.letter+ worksheet.lastRow.number ,
      rules: [
        {
          type: 'containsText',
          operator: 'containsBlanks',
          text:"",
          style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'B7DEE8'}}},
        }
      ]
    })
    worksheet.addConditionalFormatting({
      ref: "A1:"+worksheet.lastColumn.letter+ worksheet.lastRow.number ,
      rules: [
        {
          type: 'expression',
          formulae: ['MOD(ROW(),2)=0'],
          style: {fill: {type: 'pattern', pattern:'solid', bgColor: {argb: 'CAD9D1'}}},
        }
      ]
    })
    worksheet.autoFilter = "A1:"+worksheet.lastColumn.letter+ worksheet.lastRow.number 
  


            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
          
            // Escribir el libro de Excel en la respuesta HTTP
            workbook.xlsx.write(res)
              .then(() => {
                res.end();
              })
              .catch((error) => {
                console.error('Error al generar el archivo Excel:', error);
                res.status(500).send('Error al generar el archivo Excel');
              });
    // await workbook.xlsx.writeFile("Formato Consolidado.xlsx")
      
      
   
}


module.exports = funcion;