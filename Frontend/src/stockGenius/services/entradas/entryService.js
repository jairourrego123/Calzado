// src/services/entryService.js
import apiClient from '../../api/axios';

const getEntries = async () => {
  const response = await apiClient.get('/entradas/');
  return response.data;
};

const addEntry = async (entry) => {
  const response = await apiClient.post('/entradas/', entry);
  return response.data;
};

const getSuppliers = async (params={}) => {
  const response = await apiClient.get('/entradas/proveedores/',params);
  return response.data;
};
const addSuppliers = async (data) => {
  const response = await apiClient.post('/entradas/proveedores/',data);
  return response.data;
};


export { getEntries,getSuppliers,addSuppliers, addEntry };
