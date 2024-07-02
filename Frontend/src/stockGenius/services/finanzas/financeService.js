// src/services/financeService.js
import apiClient from '../../api/axios';

const getPayMethods = async (params={}) => {
  const response = await apiClient.get('/finanzas/metodos_de_pago/',params);
  return response.data;
};
const getMovimientos = async (params={}) => {
  const response = await apiClient.get('/finanzas/movimientos/',params);
  return response.data;
};
const getCierres = async (params={}) => {
  const response = await apiClient.get('/finanzas/cierres/',params);
  return response.data;
};
const getTransferencias = async (params={}) => {
  const response = await apiClient.get('/finanzas/transferencias/',params);
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

export { getPayMethods,getMovimientos,getCierres,getTransferencias, addFinance, updateFinance, deleteFinance };
