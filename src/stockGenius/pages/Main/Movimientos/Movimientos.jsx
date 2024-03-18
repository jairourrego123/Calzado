import { useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent"
import Icon from "../../../components/Icon/Icon"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
function Movimientos() {
  const data = [
    {
      "comprador": "Juan Pérez",
      "cantidad": 5,
      "precio": 100.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "comprador": "María García",
      "cantidad": 10,
      "precio": 75.25,
      "estado": false,
      "fecha": "2024-03-18"
    },
    {
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "precio": 150.75,
      "estado": true,
      "fecha": "2024-03-19"
    },
    {
      "comprador": "Ana López",
      "cantidad": 8,
      "precio": 200.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "precio": 50.00,
      "estado": true,
      "fecha": "2024-03-17"
    },
    {
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "precio": 300.50,
      "estado": false,
      "fecha": "2024-03-22"
    },
    {
      "comprador": "David Fernández",
      "cantidad": 7,
      "precio": 120.75,
      "estado": true,
      "fecha": "2024-03-23"
    },
    {
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "precio": 90.00,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "precio": 180.25,
      "estado": true,
      "fecha": "2024-03-25"
    },
    {
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "precio": 210.00,
      "estado": false,
      "fecha": "2024-03-24"
    }
  ]
  
  const [selectedSwitch, setSelectedSwitch] = useState('salidas');
  const [selectedState, setSelectedState] = useState(' ');
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);

  const handleIcon=()=>{
    setMostrarRegistroVenta((e)=>!e)
  }

  const handleChangeSelect = (option) => {
    console.log(option.target.value);
    setSelectedState(option.target.value);
  }
  const handleSwitchChange = (option) => {
    setSelectedSwitch(option);
    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };
  const opcionesSeleccionable = [
    { value: " ", label: "Todos" },
    { value: "1", label: "Entregados" },
    { value: "0", label: "Pendientes" }

  ];
  return (
    <div className={mostrarRegistroVenta?"stock-genius-movimientos-container-active":"stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">

        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search />
        </div>
        <div className="stock-genius-movimientos-left-layout">
          <Mostrar />
          <GeneralSelect id="estado"
            name="estado"
            value={selectedState} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeSelect} // Define la función de cambio 
          />
          <div className="switch-wrapper">
            <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} />
          </div>
          <div className="stock-genius-movimientos-buy" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleIcon}>

            <Icon icon={"buy"} />
          </div>
        </div>
        <div className="stock-genius-movimientos-left-table">
          <TableWithCheckbox data={data} />
        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando 1 a 10 de 100</span>
          <div>
            <button className="stock-genius-movimientos-left-footer-devoluciones">Devoluciones</button>
            <button className="stock-genius-movimientos-left-footer-resumen">Resumen</button>
          </div>
        </div>

      </div>
     <div className={`stock-genius-movimientos-container-right ${mostrarRegistroVenta?"stock-genius-active":"stock-genius-inactive"}`}></div>
    </div>
  )
}

export default Movimientos