// src/services/financeService.js
import apiClient from '../../api/axios';

const getPayMethods = async () => {
  const response = await apiClient.get('/finanzas/metodos_de_pago/');
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

export { getPayMethods, addFinance, updateFinance, deleteFinance };
