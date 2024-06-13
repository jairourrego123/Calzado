// src/services/financeService.js
import apiClient from '../api/axios';

const getFinances = async () => {
  const response = await apiClient.get('/finanzas/');
  return response.data;
};

const addFinance = async (finance) => {
  const response = await apiClient.post('/finanzas/', finance);
  return response.data;
};

const updateFinance = async (id, finance) => {
  const response = await apiClient.patch(`/finanzas/${id}/`, finance);
  return response.data;
};

const deleteFinance = async (id) => {
  const response = await apiClient.delete(`/finanzas/${id}/`);
  return response.data;
};

export { getFinances, addFinance, updateFinance, deleteFinance };
