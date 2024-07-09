// src/services/returnService.js
import apiClient from '../../api/axios';

const getDataHome = async (params = {}) => {
  const response = await apiClient.get('/data/home/',params);
  return response.data;
};

const getDetailSpend = async (id) => {
  const response = await apiClient.get(`/data/detail_venta/${id}`);
  return response.data;
};
const getGanancias = async (params={}) => {
  const response = await apiClient.get('/data/ganancias',params);
  return response.data;
};

export { getDataHome, getDetailSpend,getGanancias};
