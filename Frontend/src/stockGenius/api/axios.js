import axios from 'axios';
import config from '../const/config.json';
import { logout, refreshAccessToken } from '../services/autenticacion/autenticacion';
import { errorHandling } from '../helpers/errorHandling';

const apiClient = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
});


apiClient.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      try {
        await refreshAccessToken(); // Intentar refrescar el token
        const config = error.config;
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return apiClient(config); // Reintentar la solicitud original
      } catch (refreshError) {
        logout()
      }
    } else {
      errorHandling(error)
    }

    return Promise.reject(error);
  }
);

export default apiClient;
