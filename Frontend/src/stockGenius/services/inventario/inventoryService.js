// src/services/inventoryService.js
import apiClient from '../api/axios';

const getInventory = async () => {
  const response = await apiClient.get('/inventario/');
  return response.data;
};

const addItem = async (item) => {
  const response = await apiClient.post('/inventario/', item);
  return response.data;
};

const updateItem = async (id, item) => {
  const response = await apiClient.patch(`/inventario/${id}/`, item);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await apiClient.delete(`/inventario/${id}/`);
  return response.data;
};

export { getInventory, addItem, updateItem, deleteItem };
