import { Route, Routes } from 'react-router-dom';
import './App.css';
import StockGenius from './stockGenius/StockGenius';

function App() {
  return (
   <Routes>
    <Route path='/stock-genius/*' element={<StockGenius/>}/>
   </Routes>
  );
}

export default App;
