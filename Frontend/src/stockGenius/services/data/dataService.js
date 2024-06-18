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

const updateReturn = async (id, returnItem) => {
  const response = await apiClient.patch(`/devoluciones/${id}/`, returnItem);
  return response.data;
};

const deleteReturn = async (id) => {
  const response = await apiClient.delete(`/devoluciones/${id}/`);
  return response.data;
};

export { getDataHome, getDetailSpend, updateReturn, deleteReturn };
