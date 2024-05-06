import React, { useState } from 'react'
import './LoginForm.css'
import { useForm } from 'react-hook-form'
import Icon from "../../../../components/Icon/Icon";
import { useNavigate } from 'react-router-dom';
import config from '../../../../const/config.json'
function LoginForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const onSubmit = (e)=>{
      console.table(e)
      navigate(config.routerPrincipal+"/home",{replace:true})
    }
  return (
   


    <form onSubmit={handleSubmit(onSubmit)}>
         <div className='stock-genius-login-form'>
            <div className='stock-genius-login-form-username'>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder='Usuario'
                    {...register("username",{ required: 'Ingrese su nombre de usuario' })}
                />
                {/* {errors.username && <span>{errors.username.message}</span>} */}
            </div>
            {errors['username'] && (
            <span className="stock-genius-component-general-form-error-message">{errors.username.message}</span>
          )}

            <div className='stock-genius-login-form-password'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    placeholder='Contraseña'
                     {...register("password",{ required: 'Ingrese su contraseña' })}
                     
                />
                {/* {errors.password && <span>{errors.password.message}</span>} */}
                <div className='stock-genius-icon-eye' onClick={()=>setShowPassword(!showPassword)}>
                <Icon icon={showPassword?"visibility":"visibility_off"}/>
                </div>
            </div>
            {errors['password'] && (
            <span className="stock-genius-component-general-form-error-message">{errors.password.message}</span>
          )}

            <button  className="stock-genius-login-form-submit"type="submit">Iniciar sesión</button>
        </div>
        </form>
  )
}

export default LoginForm