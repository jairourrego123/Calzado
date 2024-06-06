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
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"
import Table from "../../../components/Table/Table";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
import { SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";

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
      "nombre": "Juan Carlos González Fonzales L",
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
    setOpenModalMovimientos(false)
  }, []);
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
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
  const [clientes, setClientes] = useState(initialData);
  const [selectedUserType, setSelectedUserType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);
  const [dataMovimientos,setDataMovimientos]=useState([])
  const [openModaMovimientos,setOpenModalMovimientos]=useState(false)
  const [openModalDetail,setOpenModalDetail] = useState(false)
  const [dataDetailSale,setDataDetailSale]= useState([])
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
    setSelectedSwitch(option)
    if (option==="Clientes") {
        
     setClientes(initialData)
    }
     else{
        
       setClientes(initialDataProveedores)
 }

  }

  const handleCloseModalDetail = ()=>{
    setOpenModalDetail(false)
  }
  const handleViewDetail = (id) => {
    let data = {}
    if (selectedSwitch==="Proveedores") {

      data = {
        productos: [
          { id: 1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 5 }
        ],
        devolucion:[],
        pagos: [],
        entrada: { id: 1, estado: false, valor: 120000 },
        proveedor: { id: 6, nombre: "Provedor A" }
      }

    }
    else {
      data = {
        productos: [
          { id: 1, estilo: "Clasico de lo mas clasico que existe", talla: "42", color: "Rojo", cantidad: 10, valor_fabricacion: 10000, valor_venta_producto: 100000, total: 1000000, ganancia_producto: 50000 },
          { id: 2, estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion: 100000, valor_venta_producto: 375000, total: 1875000, ganancia_producto: 50000 },
          { id: 3, estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_fabricacion: 100000, valor_venta_producto: 120000, total: 960000, ganancia_producto: 50000 },
          { id: 4, estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_fabricacion: 100000, valor_venta_producto: 150000, total: 1800000, ganancia_producto: 50000 },
        ],
        devolucion: [
          { id: 1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 5, valor_venta_producto: 100000, total: 500000, fecha: "1/06/2022", motivo: "Cambio de Talla", descripcion: "Se entrega en buenas condiciones." },
          { id: 3, estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 2, valor_venta_producto: 100000, total: 200000, fecha: "2/06/2022", motivo: "Defectuoso", descripcion: "Se encuentra descocido en un la parte superior." },

        ],
        pagos: [
          { id: 1, nombre: "Transacción Bancolombia", valor: 1000000, fecha: "05/05/2024" },
          { id: 2, nombre: "Nequi", valor: 375000, fecha: "06/05/2024" },
          { id: 3, nombre: "Daviplata", valor: 960000, fecha: "07/05/2024" },
          { id: 4, nombre: "Efectivo", valor: 1800000, fecha: "08/05/2024" },
        ],
        salida: {
          id: 2,
          valor: 5635000,
          estado: false,
        },
        cliente: {
          id: 6,
          nombre: "Jairo Miller Urrego Garay",
        },
      }
    }

    setDataDetailSale(data)
    setOpenModalDetail(true)
  }
  const handlenNewSupplier=(data)=>{
    SweetAlertMessage("¡Éxito!", "Proveedor creado correctamente.", "success")
    handleCloseModal()
   }
  const handlenNewClient=(data)=>{
    SweetAlertMessage("¡Éxito!", "Cliente creado correctamente.", "success")
    handleCloseModal()
   }
  
  const handlenNewUser=(data)=>{
    if (selectedSwitch==="Clientes") {
        
      handlenNewClient(data)
     }
      else{
         
        handlenNewSupplier(data)
  }
  
   }
  
  const handleDoubleClickCard = useCallback(()=>{

        setOpenModalMovimientos(true)
        if (selectedSwitch ==="Clientes"){
          setDataMovimientos(initialDataMovimientosCliente)
        }
        else {
         setDataMovimientos(initialDataMovimientosProveedor)
        }
    
  },[selectedSwitch,initialDataMovimientosCliente,initialDataMovimientosProveedor])
  return (
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Clientes"}/>
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
              <Table data={dataMovimientos} handleDoubleClick={handleViewDetail}/>
          </GeneralModal>

          <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"}
        title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseModalDetail} type={selectedSwitch==="Clientes"?"salida":"entrada"} atributo={selectedSwitch==="Clientes"?"cliente":"proveedor"} />
      </GeneralModal>
        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
    </div>
  )
}

export default Clientes