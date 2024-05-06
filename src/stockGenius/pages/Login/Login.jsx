import React from 'react'
import './Login.css'
import LoginForm from './components/LoginForm/LoginForm'

function Login() {


  return (
    <>

      <div className='stock-genius-login'>
        <div className="stock-genius-login-content">
          <span className='stock-genius-login-title'>Login</span>
          <span className='stock-genius-login-layout'>Bienvenido de vuelta! ingresa para acceder a tu base de datos</span>
          <LoginForm />
        </div>




      </div>

      <svg className="stock-genius-login-vector-izq" width="854" height="364" viewBox="0 0 854 364" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M429.5 176.484C241 180.984 87.5 -15.5158 -21.5 0.984153L-94 451.984C253.667 428.151 928.6 376.484 847 360.484C745 340.484 618 171.984 429.5 176.484Z" fill="#191F2F" />
      </svg>
      <svg className="stock-genius-login-vector-der" width="1214" height="335" viewBox="0 0 1214 335" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M465.5 115.5C260 -0.999985 79 58.5 0.5 -2.99998C404 -27.1666 1212.4 -75.3 1218 -74.5C1225 -73.5 1364 341 1236 334C1108 327 671 232 465.5 115.5Z" fill="#191F2F" />
      </svg>
    </>
  )
}

export default Login