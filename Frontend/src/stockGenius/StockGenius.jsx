import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import './StockGenius.css'
import { LoaderProvider, useLoader } from './context/LoadingContext';
function StockGenius() {
  const Loader = () => {
    const { loading } = useLoader();
    return loading ? <div className="loader">Cargando...</div> : null;
  };
  return (
    <LoaderProvider>
    <Loader />
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/main/*' element={<Main/>}/>
    </Routes>
    </LoaderProvider>

  )
}

export default StockGenius