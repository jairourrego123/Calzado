// src/services/entryService.js
import apiClient from '../api/axios';

const getEntries = async () => {
  const response = await apiClient.get('/entradas/');
  return response.data;
};

const addEntry = async (entry) => {
  const response = await apiClient.post('/entradas/', entry);
  return response.data;
};

const updateEntry = async (id, entry) => {
  const response = await apiClient.patch(`/entradas/${id}/`, entry);
  return response.data;
};

const deleteEntry = async (id) => {
  const response = await apiClient.delete(`/entradas/${id}/`);
  return response.data;
};

export { getEntries, addEntry, updateEntry, deleteEntry };
