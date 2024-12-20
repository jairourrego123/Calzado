import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Main/Home/Home";
import Inventario from "../../pages/Main/Inventario/Inventario";
import Movimientos from "../../pages/Main/Movimientos/Movimientos";
import Gastos from "../../pages/Main/Gastos/Gastos";
import Ganancias from "../../pages/Main/Ganancias/Ganancias";
import Balances from "../../pages/Main/Balances/Balances";
import Clientes from "../../pages/Main/Usuarios/Usuarios";
import Informes from "../../pages/Main/Informes/Informes";

function RoutesPrivados() {
  return (
    <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/movimientos" element={<Movimientos/>}/>
        <Route path="/gastos" element={<Gastos/>}/>
        <Route path="/ganancias" element={<Ganancias/>}/>
        <Route path="/balances" element={<Balances/>}/>
        <Route path="/usuarios" element={<Clientes/>}/>
        <Route path="/informes" element={<Informes/>}/>
    </Routes>
  )
}

export default RoutesPrivados