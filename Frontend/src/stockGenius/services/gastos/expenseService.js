// src/services/expenseService.js
import apiClient from '../../api/axios';

const getExpenses = async (params={}) => {
  const response = await apiClient.get('/gastos/gastos/',params);
  return response.data;
};
const getTypeExpenses = async (params={}) => {
  const response = await apiClient.get('/gastos/tipos_de_gasto/',params);
  return response.data;
};


const addExpense = async (expense) => {
  const response = await apiClient.post('/gastos/gastos/', expense);
  return response.data;
};



export { getExpenses,getTypeExpenses, addExpense };
