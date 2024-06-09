import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import './StockGenius.css'
function StockGenius() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/main/*' element={<Main/>}/>
    </Routes>
  )
}

export default StockGenius