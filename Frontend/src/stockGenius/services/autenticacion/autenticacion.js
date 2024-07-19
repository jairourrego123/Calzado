// src/services/returnService.js

import axios from 'axios';
import { SweetAlertMessage } from '../../components/SweetAlert/SweetAlert';
import config from '../../const/config.json'
import apiClient from '../../api/axios';

// Configura Axios para enviar cookies con cada solicitud
axios.defaults.withCredentials = true;

const login = async ({ username, password }) => {
    
    try {

        const response = await axios.post(`${config.baseURL}/auth/login/`, { email: username, password },{ withCredentials: true });
        const { access } = response.data;
        localStorage.setItem('access_token', access);

        return response

    } catch (error) {
        if (error.response) {
            SweetAlertMessage("Error", "Credenciales Invalidas.", "error");
            // Maneja el error de login
        } else {
            SweetAlertMessage("Error", "Error interno. Por favor, inténtalo de nuevo más tarde o comunicate con soporte.", "error");

        }
        return Promise.reject(error);
    }
};

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${config.baseURL}/auth/refresh/`,{},{ withCredentials: true });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
const logout = async () => {
    try {
         await apiClient.post('/auth/logout',{},{ withCredentials: true });
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        localStorage.removeItem('access_token');
        window.location.href = `${config.routerPrincipal}/login/`; // Redirigir a la página de login
    }
    
};


export { login, logout };
