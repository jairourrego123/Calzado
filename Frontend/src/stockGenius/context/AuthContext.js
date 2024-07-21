import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../const/config.json'

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el token y el usuario del localStorage al cargar la aplicación
    const storedToken = localStorage.getItem('access_token');
    const storedUser = JSON.parse(localStorage.getItem('usuario'));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('access_token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    navigate(`${config.routerPrincipal}/main/home`, { replace: true });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario');
    navigate(`${config.routerPrincipal}/login`, { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
