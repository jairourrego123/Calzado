import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import config from '../../const/config.json'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user,token } = useContext(AuthContext);
  console.log("user:",user);
  if (!user && !token) {
    // Usuario no autenticado
    return <Navigate to={`${config.routerPrincipal}/login`} replace />;
  }

//   if (requiredRole && user.rol !== requiredRole) {
//     // Usuario no tiene el rol requerido
//     return <Navigate to="/unauthorized" replace />;
//   }

  return children;
};

export default ProtectedRoute;
