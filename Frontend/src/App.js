import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import StockGenius from './stockGenius/StockGenius';

function App() {
  return (
   <Routes>
    <Route path='/' element={<Navigate to={"/stock-genius/login"}/> }/>
    <Route path='/stock-genius/*' element={<StockGenius/>}/>
   </Routes>
  );
}

export default App;
