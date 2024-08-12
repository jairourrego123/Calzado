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
  const response = await apiClient.post('/finanzas/metodos_de_pago/', finance);
  return response.data;
};
const addTransferencia = async (transferencia) => {
  const response = await apiClient.post('/finanzas/transferencias/', transferencia);
  return response.data;
};
const addCierre = async () => {
  const response = await apiClient.post(`/finanzas/cierres/`,{});
  return response.data;
};
const updateCierre = async (id, finance) => {
  const response = await apiClient.patch(`/finanzas/cierres/${id}/`, finance);
  return response.data;
};


const deleteFinance = async (id) => {
  const response = await apiClient.delete(`/finanzas/${id}/`);
  return response.data;
};

export { getPayMethods,getMovimientos,getCierres,getTransferencias, addFinance, addTransferencia,addCierre,updateCierre, deleteFinance };
