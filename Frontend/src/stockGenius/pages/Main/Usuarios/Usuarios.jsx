import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search";
import CardClientes from "./components/CardClientes";
import Mostrar from "../../../components/Mostrar/Mostrar";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddUsers from "../../../components/ModalAddUsers/ModalAddUser";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"

import { SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import { addClient, getClients } from "../../../services/ventas/salesService";
import { addSuppliers, getSuppliers } from "../../../services/entradas/entryService";
import Paginations from "../../../components/Paggination/Paginations";
import ModalDataUsers from "../../../components/ModalDataUsers/ModalDataUsers";

function Clientes() {


  

const options = ["Clientes","Proveedores"]
  // const [data] = useState(initialData)
  const [selectedSwitch, setSelectedSwitch] = useState(options[0]);
  const [clientes, setClientes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);
  const [openModaMovimientos,setOpenModalMovimientos]=useState(false)
  const [loadData,setLoadData]=useState(false) 
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
  const [selectedClient,setSelectedClient]=useState('')
  useEffect(()=>{
    selectedSwitch==="Clientes"? GetDataClients(): GetDataSupliers()
    setSelectedUserType("")

  },[loadData,selectedSwitch])

  const GetDataClients = async (params) => {
    const response = await getClients({params: params })
    setTotalPages(response.total_pages)

    setClientes(response.results);

  };
  const GetDataSupliers = async (params) => {
    const response = await getSuppliers({params: params })
    setTotalPages(response.total_pages)

    setClientes(response.results);

  };
  
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setOpenModalMovimientos(false)
  }, []);
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const handleSearchClientes = useCallback((text) => {
    if (selectedSwitch==="Clientes") {
      GetDataClients({search:text})
    }
    else{
      GetDataSupliers({search:text})
    }
    

  }, [selectedSwitch]);





  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: false, label: "Deben" },
    { value: true, label: "No Deben " }
  ], []);

  const handleChangeExpenseType = useCallback((option) => {
    setSelectedUserType(option.target.value);
    const value = option.target.value === 'true';
    if (option.target.value === " ") {
      selectedSwitch==="Clientes"?GetDataClients():GetDataSupliers()
    } else {
      selectedSwitch==="Clientes"?GetDataClients({estado:value}):GetDataSupliers({estado:value})
    }
  }, [selectedSwitch]);

  const handleSwitchChange = (option)=>{
    setSelectedSwitch(option)
  }


  const createSupplier=async(data)=>{
    const response = await addSuppliers(data)
    SweetAlertMessage("¡Éxito!", "Proveedor creado correctamente.", "success")
    handleCloseModal()
    setLoadData(prev=>!prev)
    return response;
   }
  const createClient= async(data)=>{
    const response = await addClient(data)
    SweetAlertMessage("¡Éxito!", "Cliente creado correctamente.", "success")
    handleCloseModal()
    setLoadData(prev=>!prev)
    return response
   }
  
  
  
  const handlenNewUser=(data)=>{
    if (selectedSwitch==="Clientes") {
      createClient(data)
     }
      else{   
      createSupplier(data)
  }
  
   }



   const handleDoubleClickCard = useCallback((element_id)=>{

        
    setOpenModalMovimientos(true)
    setSelectedClient(element_id)

},[selectedSwitch])



  const handleChangePage = useCallback((event,value)=>{

    setPage(value)
    if (selectedSwitch ==="Clientes"){
          
      GetDataClients({page:value})
    }
    else {
      GetDataSupliers({page:value})
    }


  },[page,selectedSwitch])
  return (
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={selectedSwitch}/>
        <Search onSearch={handleSearchClientes}/>
      </div>
      <div className="stock-genius-left-layout">
          <Mostrar   />
          <GeneralSelect
            id="estado"
            name="Estado"
            value={selectedUserType} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeExpenseType} // Define la función de cambio 
          />
        <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} options={options} />
          <div className="stock-genius-general-add" onClick={handleOpenModal}  >
          <AddIcon className="stock-genius-click"/>

          </div>

        </div>
        <div className="stock-genius-table">
          <CardClientes clientes={clientes} setClientes={setClientes}selected={selectedSwitch} handleDoubleClick={handleDoubleClickCard} />
        
        </div>

        <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} 
          title={`Nuevo ${selectedSwitch ==="Clientes"?"Cliente":"Proveedor"}`}
            layout={`Agrega un nuevo${selectedSwitch ==="Clientes"?"Cliente":"Proveedor"}`}>
              <ModalAddUsers onClose={handleCloseModal} onSubmitUser={handlenNewUser}/>
          </GeneralModal>
        <GeneralModal isOpen={openModaMovimientos} onClose={handleCloseModal} icon={"product"} 
          title="Movimientos realizados"
            layout="Visualiza los movimientos realizados.">
                <ModalDataUsers selectedSwitch={selectedSwitch} selectedClient={selectedClient}/>
            </GeneralModal>

        
        <div className="stock-genius-gastos-footer">
        <span>Mostrando {page} de {totalPages}</span>
          {totalPages>0&&<Paginations totalPages={totalPages} currentPage={page} handleChangePage={handleChangePage}/>}

        </div>
    </div>
  )
}

export default Clientes