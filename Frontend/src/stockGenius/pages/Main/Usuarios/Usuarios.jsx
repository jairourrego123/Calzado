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
import Table from "../../../components/Table/Table";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
import { SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import { addClient, getClients, getDetailSpend, getSales } from "../../../services/ventas/salesService";
import { addSuppliers, getDetailEntry, getEntries, getSuppliers } from "../../../services/entradas/entryService";

function Clientes() {


  

const options = ["Clientes","Proveedores"]
  // const [data] = useState(initialData)
  const [selectedSwitch, setSelectedSwitch] = useState(options[0]);
  const [clientes, setClientes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);
  const [dataMovimientos,setDataMovimientos]=useState([])
  const [colums,setColumns]=useState([])
  const [openModaMovimientos,setOpenModalMovimientos]=useState(false)
  const [openModalDetail,setOpenModalDetail] = useState(false)
  const [dataDetailSale,setDataDetailSale]= useState([])
  const [loadData,setLoadData]=useState(false) 
  const [decimals,setDecimals] = useState([])
    
  useEffect(()=>{
    selectedSwitch==="Clientes"? GetDataClients(): GetDataSupliers()
    setSelectedUserType("")

  },[loadData,selectedSwitch])

  const GetDataClients = async (params) => {
    const response = await getClients({params: params })
    setClientes(response.results);

  };
  const GetDataSupliers = async (params) => {
    const response = await getSuppliers({params: params })
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

  const GetListVentas = async (params={})=>{
    setColumns(["orden","cliente","cantidad","valor_neto","ganancia","estado","fecha"])
    setDecimals(["valor_neto","ganancia"])
    const response = await getSales({params:params});
    setDataMovimientos(response.results);
  }
  const GetListEntradas = async (params={})=>{
    const response = await getEntries({params:params});
    setColumns(["orden","proveedor","valor_neto","estado","usuario","fecha"])
    setDecimals(["valor_neto"])
    setDataMovimientos(response.results);
    
  }

  const handleViewSpend = async(venta)=>{
    console.log("venta",venta);

    const dataprev= await getDetailSpend(venta.id)
    console.log("info",dataprev);
    return dataprev

  
}
const handleViewEntrry = async(entrada)=>{
  
    console.log("entrada",entrada);
    const dataprev= await getDetailEntry(entrada.id)
    console.log("info",dataprev);
    return dataprev

  
}

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

  const handleCloseModalDetail = ()=>{
    setOpenModalDetail(false)
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

   const handleViewDetail = async (element) => {
    console.log("element",element);
    if (selectedSwitch==="Proveedores") {

       setDataDetailSale(await handleViewEntrry(element))
    }
    else {
      setDataDetailSale(await handleViewSpend(element))
    }
    setOpenModalDetail(true)
  }


  const handleDoubleClickCard = useCallback((element_id)=>{

        
        setOpenModalMovimientos(true)
        
        if (selectedSwitch ==="Clientes"){
          
          GetListVentas({cliente:element_id})
        }
        else {
          GetListEntradas({proveedor:element_id})
        }
    
  },[selectedSwitch])
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
              <Table data={dataMovimientos} columns={colums} columns_decimals={decimals} handleDoubleClick={handleViewDetail}/>
          </GeneralModal>

          <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"}
        title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseModalDetail} type={selectedSwitch==="Clientes"?"venta":"entrada"} atributo={selectedSwitch==="Clientes"?"cliente":"proveedor"} />
      </GeneralModal>
        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
    </div>
  )
}

export default Clientes