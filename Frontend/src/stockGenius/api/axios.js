import axios from 'axios';
import { SweetAlertMessage } from '../components/SweetAlert/SweetAlert';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Cambia la URL base según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorMessages = {
  400: "Información incorrecta. Por favor, revisa los datos enviados.",
  401: "No autorizado. Por favor, inicia sesión.",
  403: "Prohibido. No tienes permiso para realizar esta acción.",
  404: "Recurso no encontrado.",
  500: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde o comunicate con soporte.",
  default: "Ha ocurrido un error. Por favor, inténtalo de nuevo o comunicate con soporte.",
};


// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response ? error.response.status : null;
    const message = errorMessages[status] || errorMessages.default;
    SweetAlertMessage("Error", message, "error");
    return Promise.reject(error);
  }
);

export default apiClient;
