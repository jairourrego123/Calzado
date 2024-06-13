// src/services/saleService.js
import apiClient from '../api/axios';

const getSales = async () => {
  const response = await apiClient.get('/ventas/');
  return response.data;
};

const addSale = async (sale) => {
  const response = await apiClient.post('/ventas/', sale);
  return response.data;
};

const updateSale = async (id, sale) => {
  const response = await apiClient.patch(`/ventas/${id}/`, sale);
  return response.data;
};

const deleteSale = async (id) => {
  const response = await apiClient.delete(`/ventas/${id}/`);
  return response.data;
};

export { getSales, addSale, updateSale, deleteSale };
