import apiClient from '../../api/axios'; // Ajusta la ruta según tu estructura de carpetas

const generarReporteExcel = async (data) => {
  const response = await apiClient.post('/generador_reportes/v1/', data,{headers:{
    "Authorization": "Api-Key prueba"
  }});
  return response.data;
};



export { generarReporteExcel};
