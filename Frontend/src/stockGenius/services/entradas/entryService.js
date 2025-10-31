// src/services/entryService.js
import apiClient from '../../api/axios';

const getEntries = async (params={}) => {
  const response = await apiClient.get('/entradas/entradas/',params);
  return response.data;
};
const getDetailEntry = async (id) => {
  const response = await apiClient.get(`/entradas/entradas/${id}/detail_entry/`);
  return response.data;
};


const addPayEntry = async (entry) => {
  const response = await apiClient.post('/entradas/crear/pagos/', entry);
  return response.data;
};
const addEntry = async (entry) => {
  const response = await apiClient.post('/entradas/entradas/', entry);
  return response.data;
};

const getSuppliers = async (params={}) => {
  const response = await apiClient.get('/entradas/proveedores/',params);
  return response.data;
};
const getPaginationSuppliers = async (params={}) => {
  const response = await apiClient.get('/entradas/proveedores_paginados/',params);
  return response.data;
};
const addSuppliers = async (data) => {
  const response = await apiClient.post('/entradas/proveedores/',data);
  return response.data;
};
const updateSupplier = async (id, supplier) => {
  const response = await apiClient.patch(`/entradas/proveedores/${id}/`, supplier);
  return response.data;
};


export { getEntries,getDetailEntry,addPayEntry,getSuppliers,addSuppliers, addEntry,updateSupplier,getPaginationSuppliers };
