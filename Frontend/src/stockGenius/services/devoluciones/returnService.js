// src/services/returnService.js
import apiClient from '../../api/axios';

const getReturns = async (params={}) => {
  const response = await apiClient.get('/devoluciones/devoluciones/',params);
  return response.data;
};

// const addReturn = async (returnItem) => {
//   const response = await apiClient.post('/devoluciones/', returnItem);
//   return response.data;
// };

const addReturn = async (returnItem) => {
  const response = await apiClient.post('/devoluciones/crear/devolucion/', returnItem);
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

export { getReturns, addReturn, updateReturn, deleteReturn };
