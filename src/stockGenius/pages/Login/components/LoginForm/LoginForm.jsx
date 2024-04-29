import React, { useState } from 'react'
import './LoginForm.css'
import { useForm } from 'react-hook-form'
import Icon from "../../../../components/Icon/Icon";

function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = (e)=>{
      console.table(e)
    }
  return (
   


    <form onSubmit={handleSubmit(onSubmit)}>
         <div className='stock-genius-login-form'>
            <div className='stock-genius-login-form-username'>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Usuario'
                    {...register("username",{ required: 'Ingrese su nombre de usuario' })}
                />
                {/* {errors.username && <span>{errors.username.message}</span>} */}
            </div>

            <div className='stock-genius-login-form-password'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder='Contraseña'
                     {...register("password",{ required: 'Ingrese su contraseña' })}
                     
                />
                {/* {errors.password && <span>{errors.password.message}</span>} */}
                <div className='stock-genius-icon-eye' onClick={()=>setShowPassword(!showPassword)}>
                <Icon icon={showPassword?"visibility":"visibility_off"}/>
                </div>
            </div>

            <button  className="stock-genius-login-form-submit"type="submit">Iniciar sesión</button>
        </div>
        </form>
  )
}

export default LoginForm