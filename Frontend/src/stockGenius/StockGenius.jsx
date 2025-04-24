import {Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import './StockGenius.css'
import Loader from './Loader/Loader'
import { LoaderProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/RoutesPrivados/ProtectedRoute'
function StockGenius() {

  return (

    <AuthProvider>
      <LoaderProvider>
        <Loader />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/main/*' element={
            <ProtectedRoute>

              <Main />
            </ProtectedRoute>
            } />
            
        </Routes>

      </LoaderProvider>
    </AuthProvider>

  )
}

export default StockGenius