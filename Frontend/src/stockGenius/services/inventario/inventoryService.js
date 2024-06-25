import apiClient from '../../api/axios'; // Ajusta la ruta según tu estructura de carpetas

const getInventory = async (params = {}) => {
  const response = await apiClient.get('/inventario/productos',  params );
  return response.data;
};

const getSumInventory = async (params = {}) => {
  const response = await apiClient.get('/inventario/productos/suma_total/');
  return response.data;
};

const addItem = async (item) => {
  const response = await apiClient.post('/inventario/productos/', item);
  return response.data;
};

const updateItem = async (id, item) => {
  const response = await apiClient.patch(`/inventario/productos/${id}/`, item);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await apiClient.delete(`/inventario/productos/${id}/`);
  return response.data;
};

const deleteItems = async (ids) => {
  const response = await apiClient.delete(`/inventario/productos/bulk-delete/`, { data: { ids } });
  return response.data;
};

export { getInventory, getSumInventory, addItem, updateItem, deleteItem, deleteItems };
