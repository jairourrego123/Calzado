// src/services/returnService.js
import apiClient from '../../api/axios';

const getDataHome = async (params = {}) => {
  const response = await apiClient.get('/data/home/',params);
  return response.data;
};

const getGanancias = async (params={}) => {
  const response = await apiClient.get('/data/ganancias',params);
  return response.data;
};
const getAnalisisDia = async (params={}) => {
  const response = await apiClient.get('/data/analisis-dia',params);
  return response.data;
};

export { getDataHome,getGanancias,getAnalisisDia};
