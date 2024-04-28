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

function Clientes() {
  const initialData = [
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
  ]
  ;

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const [data] = useState(initialData)
  const [clientes, setClientes] = useState(data);
  const [selectedUserType, setSelectedUserType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);

  const handleSearchClientes = useCallback((text) => {
    const response = data.filter(data => data
      .nombre.toLowerCase().includes(text));
    setClientes(response);
    

  }, [data]);

  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: true, label: "Deben" },
    { value: false, label: "No Deben " }
  ], []);

  const handleChangeExpenseType = useCallback((option) => {
    setSelectedUserType(option.target.value);
    if (option.target.value === " ") {
      setClientes(data);
    } else {
      const value = option.target.value === 'true';
      const response = data.filter(dato => dato.estado === value);
      setClientes(response);
    }
  }, [data]);

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
          <div className="stock-genius-general-add" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleOpenModal}  >
            <Icon  icon={"add"}  />
          </div>

        </div>

        <div className="stock-genius-table">
          <CardClientes clientes={clientes}/>
        
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