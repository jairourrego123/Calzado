import axios from 'axios';
import { SweetAlertMessage } from '../components/SweetAlert/SweetAlert';
import config from '../const/config.json';
import { logout, refreshAccessToken } from '../services/autenticacion/autenticacion';

const apiClient = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorMessages = {
  400: "Información incorrecta. Por favor, revisa los datos enviados.",
  401: "Ah ocurrido un error. Por favor, inicia sesión.",
  403: "Prohibido. No tienes permiso para realizar esta acción.",
  404: "Recurso no encontrado.",
  500: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde o comunicate con soporte.",
  default: "Ha ocurrido un error. Por favor, inténtalo de nuevo o comunicate con soporte.",
};

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
        // logout(); // Llamar a la función de logout si falla el refresh

      }
    } else {
      const message = errorMessages[status] || errorMessages.default;
      SweetAlertMessage("Error", message, "error");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
