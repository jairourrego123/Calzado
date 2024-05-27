import { useCallback, useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Icon from "../../../components/Icon/Icon";
import Search from "../../../components/Search/Search";
import config from '../../../const/config.json'
import CardClientes from "./components/CardClientes";
import Mostrar from "../../../components/Mostrar/Mostrar";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddUsers from "../../../components/ModalAddUsers/ModalAddUser";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";

function Clientes() {
  const initialData = useMemo(()=>[
  {
      "id": 11,
      "nombre": "Carolina Gómez",
      "lugar": "Usme",
      "numero_contacto": "31234567890",
      "estado": true
    },
    {
      "id": 12,
      "nombre": "Andrés Rodríguez",
      "lugar": "Centro",
      "numero_contacto": "31287654321",
      "estado": false
    },
    {
      "id": 13,
      "nombre": "Sofía Martínez",
      "lugar": "Suba",
      "numero_contacto": "31276543210",
      "estado": true
    },
    {
      "id": 14,
      "nombre": "Diego Gómez",
      "lugar": "Bosa",
      "numero_contacto": "31265432109",
      "estado": true
    },
    {
      "id": 15,
      "nombre": "Laura Pérez",
      "lugar": "Soacha",
      "numero_contacto": "31254321098",
      "estado": false
    },
    {
      "id": 16,
      "nombre": "Camilo Rodríguez",
      "lugar": "Ciudad Bolívar",
      "numero_contacto": "31243210987",
      "estado": true
    },
    {
      "id": 17,
      "nombre": "Ana María López",
      "lugar": "Molinos",
      "numero_contacto": "31232109876",
      "estado": false
    },
    {
      "id": 18,
      "nombre": "Juan Carlos González",
      "lugar": "Tunal",
      "numero_contacto": "31221098765",
      "estado": true
    },
    {
      "id": 19,
      "nombre": "Juliana Martínez",
      "lugar": "Tintal",
      "numero_contacto": "31210987654",
      "estado": true
    },
    {
      "id": 20,
      "nombre": "Felipe Gutiérrez",
      "lugar": "Fontibón",
      "numero_contacto": "31209876543",
      "estado": false
    }
  ],[]) ;

  const initialDataProveedores = useMemo(()=>[
    {
      "id": 101,
      "nombre": "Distribuidora La Palma",
      "lugar": "Cali",
      "numero_contacto": "31012345678",
      "estado": true
    },
    {
      "id": 102,
      "nombre": "Comercializadora Andes",
      "lugar": "Medellín",
      "numero_contacto": "31087654321",
      "estado": false
    },
    {
      "id": 103,
      "nombre": "Suministros y Servicios",
      "lugar": "Bogotá",
      "numero_contacto": "31076543210",
      "estado": true
    },
    {
      "id": 104,
      "nombre": "Proveeduría del Norte",
      "lugar": "Barranquilla",
      "numero_contacto": "31065432109",
      "estado": true
    },
    {
      "id": 105,
      "nombre": "Importadora del Sur",
      "lugar": "Cartagena",
      "numero_contacto": "31054321098",
      "estado": false
    },
    {
      "id": 106,
      "nombre": "Central de Abastos",
      "lugar": "Bucaramanga",
      "numero_contacto": "31043210987",
      "estado": true
    },
    {
      "id": 107,
      "nombre": "Mercancías del Oriente",
      "lugar": "Cúcuta",
      "numero_contacto": "31032109876",
      "estado": false
    },
    {
      "id": 108,
      "nombre": "Distribuciones La Costa",
      "lugar": "Santa Marta",
      "numero_contacto": "31021098765",
      "estado": true
    },
    {
      "id": 109,
      "nombre": "Logística Central",
      "lugar": "Pereira",
      "numero_contacto": "31010987654",
      "estado": true
    },
    {
      "id": 110,
      "nombre": "Comercializadora Pacífico",
      "lugar": "Manizales",
      "numero_contacto": "31009876543",
      "estado": false
    }
  ],[]);
  
  

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  // const [data] = useState(initialData)
  const [selectedSwitch, setSelectedSwitch] = useState("Clientes");
  const [clientes, setClientes] = useState(initialData);
  const [selectedUserType, setSelectedUserType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);


  const handleSearchClientes = useCallback((text) => {
    if (selectedSwitch==="Clientes") {
      const response = initialData.filter(data => data
        .nombre.toLowerCase().includes(text));
        setClientes(response);
    }
    else{
      const response = initialDataProveedores.filter(data => data
        .nombre.toLowerCase().includes(text));
        setClientes(response);
    }
    

  }, [selectedSwitch,initialDataProveedores,initialData]);

  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: true, label: "Deben" },
    { value: false, label: "No Deben " }
  ], []);

  const handleChangeExpenseType = useCallback((option) => {
    setSelectedUserType(option.target.value);
    if (option.target.value === " ") {
      selectedSwitch==="Clientes"?setClientes(initialData):setClientes(initialDataProveedores)
    } else {
      if (selectedSwitch==="Clientes") {
        const value = option.target.value === 'true';
      const response = initialData.filter(dato => dato.estado === value);
      setClientes(response);
      }
      else{
        const value = option.target.value === 'true';
        const response = initialDataProveedores.filter(dato => dato.estado === value);
        setClientes(response);
      }
    }
  }, [initialData,initialDataProveedores,selectedSwitch]);

  const handleSwitchChange = (option)=>{
    if (option==="Clientes") {
      setClientes(initialData)
    }
    else{
      setClientes(initialDataProveedores)
    }
    
    setSelectedSwitch(option)


  }

  return (
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Clientes"}/>
        <Search onSearch={handleSearchClientes}/>
      </div>
      <div className="stock-genius-extractos-layoth">
          <Mostrar   />
          <GeneralSelect
            id="tipo-gasto"
            name="Tipo Gasto"
            value={selectedUserType} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeExpenseType} // Define la función de cambio 
          />
        <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} options={["Clientes","Proveedores"]} />
          <div className="stock-genius-general-add" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleOpenModal}  >
            <Icon  icon={"add"}  />
          </div>

        </div>
        <div className="stock-genius-table">
          <CardClientes clientes={clientes} selected={selectedSwitch}/>
        
        </div>

        <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} 
          title="Nuevo Usuario"
            layout="Agrega un nuevo Usuario">
              <ModalAddUsers onClose={handleCloseModal}/>
          </GeneralModal>

        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
    </div>
  )
}

export default Clientes