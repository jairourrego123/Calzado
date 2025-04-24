import React, { useContext, useState } from 'react';
import './LoginForm.css';
import { useForm } from 'react-hook-form';
import Icon from "../../../../components/Icon/Icon";

import { login } from '../../../../services/autenticacion/autenticacion';
import { useLoader } from '../../../../context/LoadingContext';
import { AuthContext } from '../../../../context/AuthContext';
import { addCierre } from '../../../../services/finanzas/financeService';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login: loginContext } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const handleLogin = async (formData) => {
    try {
      showLoader();
      const response = await login(formData);
      await addCierre();
      if (response.status === 200) {
        //console.log("respuesta del login",response.data);
        const { access, usuario, rol,permisos } = response.data;
        loginContext(access, { username: usuario, rol,permisos });
      }
    } catch (error) {
      console.error(error); // log the error
    } finally {
      hideLoader();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="stock-genius-login-form">
        <div className="stock-genius-login-form-username">
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Usuario"
            {...register("username", { required: "Ingrese su usuario" })}
          />
          {errors.username && (
            <span className="stock-genius-component-general-form-error-message">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="stock-genius-login-form-password">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            placeholder="Contraseña"
            {...register("password", { required: "Ingrese su contraseña" })}
          />
          <div className="stock-genius-icon-eye" onClick={() => setShowPassword(!showPassword)}>
            <Icon icon={showPassword ? "visibility" : "visibility_off"} />
          </div>
          {errors.password && (
            <span className="stock-genius-component-general-form-error-message">
              {errors.password.message}
            </span>
          )}
        </div>

        <button className="stock-genius-login-form-submit" type="submit">
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}

export default LoginForm;