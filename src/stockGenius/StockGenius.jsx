import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

function StockGenius() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Home/>}/>
    </Routes>
  )
}

export default StockGenius