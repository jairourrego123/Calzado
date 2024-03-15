import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Delete from "../../../components/Delete/Delete";
import Icon from "../../../components/Icon/Icon";
import config from '../../../const/config.json'
import "./Inventario.css";

function Inventario() {
  const data = [
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      disponible: "1",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      disponible: "1",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      disponible: "1",
      precio: "120.000",
      fecha: "10/03/2024",
    },

    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
    {
      comprador: "jairo Miller  Urrego",
      cantidad: "20",
      precio: "120.000",
      fecha: "10/03/2024",
    },
  ];

  return (
    <>
      <div className="stock-genius-inventario-container">
        <div className="stock-genius-inventario-header" style={{backgroundColor:config.backgroundPrincipal}}>
          <Header title={"Inventario"} />
          <Search />
        </div>
        <div className="stock-genius-inventario-layoth" >
          
            <Mostrar />

            <select
              className="stock-genius-options"
              id="opciones"
              name="opciones"
            >
              <option value="1">Disponible</option>
              <option value="0">Fuera de Stock</option>
            </select>

            <Delete />
          <button className="stock-genius-options stock-genius-button-export">Exportar</button>
          <div className="stock-genius-inventario-add" style={{backgroundColor:config.backgroundPrincipal}}>

          <Icon icon={"add"}  />
          </div>
          </div>
        
        <div className="stock-genius-inventario-table">
          <TableWithCheckbox data={data} />
        </div>
        <div className="stock-genius-inventario-total">
          <span>TOTAL DEL INVENTARIO</span>
          <span>$999.999.000</span>
        </div>
      </div>
    </>
  );
}

export default Inventario;
