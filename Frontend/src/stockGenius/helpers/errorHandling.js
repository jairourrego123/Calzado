import { SweetAlertMessage } from "../components/SweetAlert/SweetAlert";

const errorMessages = {
    400: "Información incorrecta. Por favor, revisa los datos ingresados.",
    401: "Ah ocurrido un error. Por favor, inicia sesión.",
    403: "Prohibido. No tienes permiso para realizar esta acción.",
    404: "Recurso no encontrado.",
    500: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde o comunicate con soporte.",
    default: "Ha ocurrido un error. Por favor, inténtalo de nuevo o comunicate con soporte.",
  };

export function errorHandling(error) {
    const status = error.response ? error.response?.status : null;
    const message = errorMessages[status] || errorMessages.default;
    SweetAlertMessage("Error", message, "error");
}