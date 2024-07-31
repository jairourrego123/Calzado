// src/services/returnService.js
import apiClient from '../../api/axios';

const getReturns = async (params={}) => {
  const response = await apiClient.get('/devoluciones/devoluciones/',params);
  return response.data;
};
const getTypeReturns = async (params={}) => {
  const response = await apiClient.get('/devoluciones/motivos/',params);
  return response.data;
};


const addReturn = async (returnItem) => {
  const response = await apiClient.post('/devoluciones/crear/devolucion/', returnItem);
  return response.data;
};


const deleteReturn = async (id) => {
  const response = await apiClient.delete(`/devoluciones/${id}/`);
  return response.data;
};

export { getReturns, addReturn, getTypeReturns, deleteReturn };
