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


  
  const initialDataMovimientosCliente = useMemo(()=>[
    {
        "id": 1,
        "orden": "SC2024-00001",
        "comprador": "Juan Pérez",
        "cantidad": 5,
        "valor": 100.50,
        "estado": true,
        "fecha_registro": "2024-03-20"
    },
    {
        "id": 2,
        "orden": "SC2024-00002",
        "comprador": "Juan Pérez",
        "cantidad": 3,
        "valor": 150.75,
        "estado": false,
        "fecha_registro": "2024-04-15"
    },
    {
        "id": 3,
        "orden": "SC2024-00003",
        "comprador": "Juan Pérez",
        "cantidad": 10,
        "valor": 200.00,
        "estado": true,
        "fecha_registro": "2024-02-10"
    },
    {
        "id": 4,
        "orden": "SC2024-00004",
        "comprador": "Juan Pérez",
        "cantidad": 2,
        "valor": 75.00,
        "estado": true,
        "fecha_registro": "2024-01-05"
    },
    {
        "id": 5,
        "orden": "SC2024-00005",
        "comprador": "Juan Pérez",
        "cantidad": 7,
        "valor": 300.00,
        "estado": false,
        "fecha_registro": "2024-05-22"
    },
    {
        "id": 6,
        "orden": "SC2024-00006",
        "comprador": "Juan Pérez",
        "cantidad": 1,
        "valor": 50.00,
        "estado": true,
        "fecha_registro": "2024-03-30"
    },
    {
        "id": 7,
        "orden": "SC2024-00007",
        "comprador": "Juan Pérez",
        "cantidad": 8,
        "valor": 400.00,
        "estado": false,
        "fecha_registro": "2024-02-18"
    },
    {
        "id": 8,
        "orden": "SC2024-00008",
        "comprador": "Juan Pérez",
        "cantidad": 4,
        "valor": 120.00,
        "estado": true,
        "fecha_registro": "2024-04-10"
    },
    {
        "id": 9,
        "orden": "SC2024-00009",
        "comprador": "Juan Pérez",
        "cantidad": 6,
        "valor": 180.50,
        "estado": false,
        "fecha_registro": "2024-03-05"
    },
    {
        "id": 10,
        "orden": "SC2024-00010",
        "comprador": "Juan Pérez",
        "cantidad": 9,
        "valor": 250.00,
        "estado": true,
        "fecha_registro": "2024-05-01"
    }
]
,[])

const initialDataMovimientosProveedor = useMemo(()=>[
  {
      "id": 1,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor A",
      "registra": "Usuario 1",
      "estado": true,
      "fecha_registro": "2024-01-01"
  },
  {
      "id": 2,
      "orden": "EP2024-00002",
      "proveedor": "Proveedor A",
      "registra": "Usuario 2",
      "estado": false,
      "fecha_registro": "2024-01-02"
  },
  {
      "id": 3,
      "orden": "EP2024-00003",
      "proveedor": "Proveedor A",
      "registra": "Usuario 3",
      "estado": true,
      "fecha_registro": "2024-01-03"
  },
  {
      "id": 4,
      "orden": "EP2024-00004",
      "proveedor": "Proveedor A",
      "registra": "Usuario 4",
      "estado": false,
      "fecha_registro": "2024-01-04"
  },
  {
      "id": 5,
      "orden": "EP2024-00005",
      "proveedor": "Proveedor A",
      "registra": "Usuario 5",
      "estado": true,
      "fecha_registro": "2024-01-05"
  },
  {
      "id": 6,
      "orden": "EP2024-00006",
      "proveedor": "Proveedor A",
      "registra": "Usuario 6",
      "estado": false,
      "fecha_registro": "2024-01-06"
  },
  {
      "id": 7,
      "orden": "EP2024-00007",
      "proveedor": "Proveedor A",
      "registra": "Usuario 7",
      "estado": true,
      "fecha_registro": "2024-01-07"
  },
  {
      "id": 8,
      "orden": "EP2024-00008",
      "proveedor": "Proveedor A",
      "registra": "Usuario 8",
      "estado": false,
      "fecha_registro": "2024-01-08"
  },
  {
      "id": 9,
      "orden": "EP2024-00009",
      "proveedor": "Proveedor A",
      "registra": "Usuario 9",
      "estado": true,
      "fecha_registro": "2024-01-09"
  },
  {
      "id": 10,
      "orden": "EP2024-00010",
      "proveedor": "Proveedor A",
      "registra": "Usuario 10",
      "estado": false,
      "fecha_registro": "2024-01-10"
  }
]
,[])
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
    { value: true, label: "Deben" },
    { value: false, label: "No Deben " }
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
          <CardClientes clientes={clientes} selected={selectedSwitch} handleDoubleClick={handleDoubleClickCard} />
        
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