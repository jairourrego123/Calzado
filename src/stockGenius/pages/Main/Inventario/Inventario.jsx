import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Delete from "../../../components/Delete/Delete";
import Icon from "../../../components/Icon/Icon";
import config from '../../../const/config.json'
import "./Inventario.css";
import { useState } from "react";
import ModalAddProduct from "../../../components/ModalAddProduct/ModalAddProduct";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";

function Inventario() {
  const data = [
    {
      "estilo": "Clásico",
      "color": "Rojo",
      "talla": "40",
      "cantidad": 5,
      "disponibilidad": true,
      "precio": 100.50,
      "fecha": "2024-03-20"
    },
    {
      "estilo": "Moderno",
      "color": "Azul",
      "talla": "42",
      "cantidad": 10,
      "disponibilidad": false,
      "precio": 75.25,
      "fecha": "2024-03-18"
    },
    {
      "estilo": "Vintage",
      "color": "Verde",
      "talla": "39",
      "cantidad": 3,
      "disponibilidad": true,
      "precio": 150.75,
      "fecha": "2024-03-19"
    },
    {
      "estilo": "Industrial",
      "color": "Gris",
      "talla": "41",
      "cantidad": 8,
      "disponibilidad": false,
      "precio": 200.00,
      "fecha": "2024-03-21"
    },
    {
      "estilo": "Rústico",
      "color": "Marrón",
      "talla": "38",
      "cantidad": 15,
      "disponibilidad": true,
      "precio": 50.00,
      "fecha": "2024-03-17"
    },
    {
      "estilo": "Minimalista",
      "color": "Blanco",
      "talla": "39",
      "cantidad": 2,
      "disponibilidad": false,
      "precio": 300.50,
      "fecha": "2024-03-22"
    },
    {
      "estilo": "Escandinavo",
      "color": "Negro",
      "talla": "40",
      "cantidad": 7,
      "disponibilidad": true,
      "precio": 120.75,
      "fecha": "2024-03-23"
    },
    {
      "estilo": "Bohemio",
      "color": "Amarillo",
      "talla": "42",
      "cantidad": 12,
      "disponibilidad": false,
      "precio": 90.00,
      "fecha": "2024-03-19"
    },
    {
      "estilo": "Contemporáneo",
      "color": "Azul Marino",
      "talla": "43",
      "cantidad": 4,
      "disponibilidad": true,
      "precio": 180.25,
      "fecha": "2024-03-25"
    },
    {
      "estilo": "Ecléctico",
      "color": "Rosado",
      "talla": "39",
      "cantidad": 6,
      "disponibilidad": false,
      "precio": 210.00,
      "fecha": "2024-03-24"
    }
  ]
  ;
  
  

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvailable, setSelectedAvailable] = useState(' ');
  const [inventario,setInventario]=useState(data)
  const opcionesSeleccionable = [
    { value: null, label: "Todos" },
    { value: true, label: "Disponibles" },
    { value: false, label: "Fuera de Stock" }
  ];
  const handleChangeSelect = (option) => {
    console.log(Boolean(option.target.value));
    const available = option.target.value==='true'? true: option.target.value==="false"?false:null
    setSelectedAvailable(option.target.value);
    if (available === null) return setInventario(data);
    const response=data.filter((data)=>data.disponibilidad===available)
  
    setInventario(response)
  }
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="stock-genius-inventario-container">
        <div className="stock-genius-inventario-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Inventario"} />
          <Search />
        </div>
        <div className="stock-genius-inventario-layoth" >

          <Mostrar />
          <GeneralSelect 
      id="disponibilidad"
      name="disponibilidad"
      value={selectedAvailable} // Asigna el valor seleccionado
      options={opcionesSeleccionable} // Pasa las opciones al componente
      onChange={handleChangeSelect} // Define la función de cambio 
     

      />
        

          <Delete />
          <button className="stock-genius-options stock-genius-button-export">Exportar</button>

          <div className="stock-genius-inventario-add" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleOpenModal}>

            <Icon icon={"add"} />
          </div>

          <GeneralModal isOpen={isOpen} onClose={handleCloseModal} icon={"product"} title={"Nuevo Producto"} layout={"Agrega un nuevo producto."}>
          <ModalAddProduct onClose={handleCloseModal}/>
          </GeneralModal>

        </div>

        <div className="stock-genius-inventario-table">
          <TableWithCheckbox data={inventario} />
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
