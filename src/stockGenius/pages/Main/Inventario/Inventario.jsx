import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import Layout from "../../../components/Layout/Layout"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Delete from "../../../components/Delete/Delete"
import Icon from "../../../components/Icon/Icon"

import './Inventario.css'

function Inventario() {
  return (
    <>
      <Header title={"Inventario"} />

      <Search />

      <div className="stock-genius-inventario-layoth">

        <div className="stock-genius-inventario-layoth-left">
            <Mostrar />

          <select className="stock-genius-options" id="opciones" name="opciones">
            <option value="1">Disponible</option>
            <option value="0">Fuera de Stock</option>
          </select>


          <Delete />
        </div>
          <Icon icon={"add"} />
      </div>
      <TableWithCheckbox />
    </>
  )
}

export default Inventario