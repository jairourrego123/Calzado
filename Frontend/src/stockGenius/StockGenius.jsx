import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import './StockGenius.css'
import Loader from './Loader/Loader'
import { LoaderProvider } from './context/LoadingContext';
function StockGenius() {

  return (
    <LoaderProvider>
    <Loader/>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/main/*' element={<Main/>}/>
    </Routes>
    </LoaderProvider>

  )
}

export default StockGenius