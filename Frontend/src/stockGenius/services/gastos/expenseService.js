// src/services/expenseService.js
import apiClient from '../api/axios';

const getExpenses = async () => {
  const response = await apiClient.get('/gastos/');
  return response.data;
};

const addExpense = async (expense) => {
  const response = await apiClient.post('/gastos/', expense);
  return response.data;
};

const updateExpense = async (id, expense) => {
  const response = await apiClient.patch(`/gastos/${id}/`, expense);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/gastos/${id}/`);
  return response.data;
};

export { getExpenses, addExpense, updateExpense, deleteExpense };