import { useCallback, useState } from "react";
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import Mostrar from "../../../components/Mostrar/Mostrar";
import Icon from "../../../components/Icon/Icon";
import config from '../../../const/config.json'
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";
import './Cuentas.css'
import Table from "../../../components/Table/Table";


function Cuentas() {
  const initialData = [
    {
      "id": 1,
      "cantidad": 5,
      "precio": 100.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,

      "cantidad": 10,
      "precio": 75.25,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "id": 3,
      "cantidad": 3,
      "precio": 150.75,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 4,
      "cantidad": 8,
      "precio": 200.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "cantidad": 15,
      "precio": 50.00,
      "estado": true,
      "fecha": "2024-03-22"
    },
    {
      "id": 6,
      "cantidad": 2,
      "precio": 300.50,
      "estado": false,
      "fecha": "2024-03-23"
    },
    {
      "id": 7,
      "cantidad": 7,
      "precio": 120.75,
      "estado": true,
      "fecha": "2024-03-24"
    },
    {
      "id": 8,
      "cantidad": 12,
      "precio": 90.00,
      "estado": false,
      "fecha": "2024-03-25"
    },
    {
      "id": 9,
      "cantidad": 4,
      "precio": 180.25,
      "estado": true,
      "fecha": "2024-03-26"
    },
    {
      "id": 10,
      "cantidad": 6,
      "precio": 210.00,
      "estado": false,
      "fecha": "2024-03-27"
    }
];
  const [data] = useState(initialData);
  const [selectedSwitch, setSelectedSwitch] = useState('salidas');

  const [extractos, setExtractos] = useState(data);


  const handleSearchExtracto = useCallback((text) => {
    const response = data.filter(data => data.usuario.toLowerCase().includes(text));
    setExtractos(response);
    

  }, [data]);

  const handleSwitchChange = (option) => {
    setSelectedSwitch(option);
    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };
  return (
    // <Header title={"Extractos"}/>
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Cuentas"}/>
        <Search onSearch={handleSearchExtracto}/>
      </div>
      <div className="stock-genius-extractos-layoth">
          <Mostrar />
          <div className="switch-wrapper">
            <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} options={["Cierres de Caja","Transferencias"]}/>
          </div>
          <div className="stock-genius-general-add" style={{ backgroundColor: config.backgroundPrincipal }}  >
            <Icon  icon={"add"}  />
          </div>

        </div>

        <div className="stock-genius-table">
        <Table data={extractos}  />
        
        </div>
        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
    </div>
  )
}

export default Cuentas