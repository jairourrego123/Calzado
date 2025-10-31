import apiClient from '../../api/axios'; // Ajusta la ruta según tu estructura de carpetas
const API_KEY = process.env.REACT_APP_API_KEY;
const generarReporteExcel = async (data) => {
    try {
    const response = await apiClient.post('/reportes/', data, {
      headers: {
        'X-API-Key': 'Api-Key prueba',
      },
      responseType: 'blob', 
    });
    console.log("response reporte excel",response);
    
    if (response.status === 204) return []; 
    generateFile(response, data);
    return response?.data;
  } catch (error) {
    console.error('Error descargando el archivo:', error);
  }
};

const listarReportesDisponible = async () => {
     const response = await apiClient.get('/reportes/obtener-reportes',{
      headers: {
        'X-API-Key': 'Api-Key prueba',
      },});
    return response.data; 
};


function generateFile(response, data) {
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const fechaActual = new Date();

    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    a.download = `${data.nombre||"reporte"}-${fechaFormateada}.xlsx`; // Nombre fijo para el archivo
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  }


export { generarReporteExcel,listarReportesDisponible};

