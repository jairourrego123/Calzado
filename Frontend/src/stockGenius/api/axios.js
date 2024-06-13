import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Cambia la URL base según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;