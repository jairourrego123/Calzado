// src/services/expenseService.js
import apiClient from '../../api/axios';

const getExpenses = async (params={}) => {
  const response = await apiClient.get('/gastos/gastos',params);
  return response.data;
};

const getExpensesDateRange = async (params={}) => {
  const response = await apiClient.get('/gastos/gastos/rango_fecha', {params:params});
  return response.data;
};
const addExpense = async (expense) => {
  const response = await apiClient.post('/gastos/gastos/rango_fecha', expense);
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

export { getExpenses,getExpensesDateRange, addExpense, updateExpense, deleteExpense };
