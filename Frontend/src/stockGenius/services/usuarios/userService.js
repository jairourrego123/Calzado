// src/services/userService.js
import apiClient from '../api/axios';

const getUsers = async () => {
  const response = await apiClient.get('/gestion-de-usuarios/');
  return response.data;
};

const addUser = async (user) => {
  const response = await apiClient.post('/gestion-de-usuarios/', user);
  return response.data;
};

const updateUser = async (id, user) => {
  const response = await apiClient.patch(`/gestion-de-usuarios/${id}/`, user);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await apiClient.delete(`/gestion-de-usuarios/${id}/`);
  return response.data;
};

export { getUsers, addUser, updateUser, deleteUser };
