// src/services/saleService.js
import apiClient from '../../api/axios';

const getSales = async (params={}) => {
  const response = await apiClient.get('/ventas/ventas/',params);
  return response.data;
};
const getDetailSpend = async (id) => {
  const response = await apiClient.get(`/ventas/ventas/${id}/detail_spend/`);
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
const getPaginationClients = async (params={}) => {
  const response = await apiClient.get('/ventas/clientes_paginados/',params);
  return response.data;
};

const addClient= async (data) => {
  const response = await apiClient.post('/ventas/clientes/',data);
  return response.data;
};


const updateClient = async (id, user) => {
  const response = await apiClient.patch(`/ventas/clientes/${id}/`, user);
  return response.data;
};


export { getSales, getClients,getDetailSpend, addSale,addPaySale ,addClient,updateClient,getPaginationClients };
