// src/services/saleService.js
import apiClient from '../../api/axios';

const getSales = async (params={}) => {
  const response = await apiClient.get('/ventas/ventas',params);
  return response.data;
};

const addPaySale = async (sale) => {
  const response = await apiClient.post('/ventas/crear/pagos/', sale);
  return response.data;
};

const addSale = async (sale) => {
  const response = await apiClient.post('/ventas/ventas/', sale);
  return response.data;
};


const getClients = async (params={}) => {
  const response = await apiClient.get('/ventas/clientes/',params);
  return response.data;
};
const addClient= async (data) => {
  const response = await apiClient.post('/ventas/clientes/',data);
  return response.data;
};
const updateSale = async (id, sale) => {
  const response = await apiClient.patch(`/ventas/${id}/`, sale);
  return response.data;
};

export { getSales, getClients, addSale,addPaySale, updateSale ,addClient };
