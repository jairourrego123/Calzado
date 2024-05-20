import { useCallback, useMemo, useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent"
import Icon from "../../../components/Icon/Icon"
import Table from "../../../components/Table/Table"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import RegistroVenta from "./components/RegistroVenta"
import GeneralModal from "../../../components/GeneralModal/GeneralModal"
import ModalDetailSale from "../../../components/ModalDetailSale/ModalDetailSale"
import RegistroEntrada from "./components/RegistroEntrada"

function Movimientos() {
  const initialDataSalidas = useMemo(() => [
    {
      "id": 1,
      "comprador": "Juan Pérez",
      "cantidad": 5,
      "valor_fabricacion": 100.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "comprador": "María García",
      "cantidad": 10,
      "valor_fabricacion": 75.25,
      "estado": false,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "valor_fabricacion": 150.75,
      "estado": true,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "comprador": "Ana López",
      "cantidad": 8,
      "valor_fabricacion": 200.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "valor_fabricacion": 50.00,
      "estado": true,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "valor_fabricacion": 300.50,
      "estado": false,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "comprador": "David Fernández",
      "cantidad": 7,
      "valor_fabricacion": 120.75,
      "estado": true,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "valor_fabricacion": 90.00,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "valor_fabricacion": 180.25,
      "estado": true,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "valor_fabricacion": 210.00,
      "estado": false,
      "fecha": "2024-03-24"
    }
  ], []);
  const dataInventario = useMemo(() => [
    {
      "id": 1,
      "estilo": "Clásico de lo mas clasico del mundo clasico",
      "color": "Rojo",
      "talla": "40",
      "cantidad": 1,
      "stock_min": 3,
      "estado": false,
      "valor_fabricacion": 100.50,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "estilo": "Moderno",
      "color": "Azul",
      "talla": "42",
      "cantidad": 10,
      "stock_min": 5,
      "estado": true,
      "valor_fabricacion": 75.25,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "estilo": "Vintage",
      "color": "Verde",
      "talla": "39",
      "cantidad": 3,
      "stock_min": 4,
      "estado": false,
      "valor_fabricacion": 150.75,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "estilo": "Industrial",
      "color": "Gris",
      "talla": "41",
      "cantidad": 8,
      "stock_min": 4,
      "estado": true,
      "valor_fabricacion": 200.00,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "estilo": "Rústico",
      "color": "Marrón",
      "talla": "38",
      "cantidad": 5,
      "stock_min": 8,
      "estado": false,
      "valor_fabricacion": 50.00,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "estilo": "Minimalista",
      "color": "Blanco",
      "talla": "39",
      "cantidad": 2,
      "stock_min": 1,
      "estado": true,
      "valor_fabricacion": 300.50,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "estilo": "Escandinavo",
      "color": "Negro",
      "talla": "40",
      "cantidad": 2,
      "stock_min": 4,
      "estado": false,
      "valor_fabricacion": 120.75,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "estilo": "Bohemio",
      "color": "Amarillo",
      "talla": "42",
      "cantidad": 12,
      "stock_min": 6,
      "estado": true,
      "valor_fabricacion": 90.00,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "estilo": "Contemporáneo",
      "color": "Azul Marino",
      "talla": "43",
      "cantidad": 4,
      "stock_min": 12,
      "estado": false,
      "valor_fabricacion": 180.25,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "estilo": "Ecléctico",
      "color": "Rosado",
      "talla": "39",
      "cantidad": 6,
      "stock_min": 3,
      "estado": true,
      "valor_fabricacion": 210.00,
      "fecha": "2024-03-24"
    }
  ], []);

  const initialDataEntradas = useMemo(() => [
    {
        "id": 1,
        "proveedor": "Proveedor A",
        "registra": "Usuario 1",
        "estado":true,
        "fecha_registro": "2024-01-01",
        
    },
    {
        "id": 2,
        "proveedor": "Proveedor B",
        "registra": "Usuario 2",
        "estado":true,
        "fecha_registro": "2024-01-02",
    },
    {
        "id": 3,
        "proveedor": "Proveedor C",
        "registra": "Usuario 1",
        "estado":false,
        "fecha_registro": "2024-01-03",
    },
    {
        "id": 4,
        "proveedor": "Proveedor D",
        "registra": "Usuario 2",
        "estado":false,
        "fecha_registro": "2024-01-04",
    },
    {
        "id": 5,
        "proveedor": "Proveedor E",
        "registra": "Usuario 1",
        "estado":true,
        "fecha_registro": "2024-01-05",
    },
    {
        "id": 6,
        "proveedor": "Proveedor F",
        "registra": "Usuario 2",
        "estado":true,
        "fecha_registro": "2024-01-06",
    },
    {
        "id": 7,
        "proveedor": "Proveedor G",
        "registra": "Usuario 1",
        "estado":false,
        "fecha_registro": "2024-01-07",
    },
    {
        "id": 8,
        "proveedor": "Proveedor H",
        "registra": "Usuario 2",
        "estado":true,
        "fecha_registro": "2024-01-08",
    },
    {
        "id": 9,
        "proveedor": "Proveedor I",
        "registra": "Usuario 1",
        "estado":false,
        "fecha_registro": "2024-01-09",
    },
    {
        "id": 10,
        "proveedor": "Proveedor J",
        "registra": "Usuario 2",
        "estado":true,
        "fecha_registro": "2024-01-10",
    }
]
, []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState('salidas');
  const [selectedState, setSelectedState] = useState(' ');
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);
  const [data,setData] = useState(initialDataSalidas)
  const [selectedRows, setSelectedRows] = useState([]);
  const [ventaProductos,setVentaProductos] = useState({}) 
  const [dataDetailSale,setDataDetailSale]=useState([])
  // const [dataEntrada]=useState(initialDataEntradas)
  

  const handleCloseAll = () => {

    setMostrarRegistroVenta((e) => !e)
    setSelectedRows([])
    setVentaProductos({})
  }

  const handleChangeSelect = (option) => {
    setSelectedState(option.target.value)
    if (option.target.value === " ") {
      selectedSwitch==='Entradas'?setData(initialDataEntradas):setData(initialDataSalidas)
    } else {
      const available = option.target.value === 'true';
      const response = selectedSwitch==='Entradas' 
      ? initialDataEntradas.filter(data=> data.estado=== available)
      : initialDataSalidas.filter(data=> data.estado=== available)

    setData(response);
  }
}
  const handleSwitchChange = (option) => {
    setSelectedSwitch(option);
    if (option ==='Entradas') {
      setData(initialDataEntradas)
      setSelectedState("")
    }
    if (option ==='Salidas') {
      setData(initialDataSalidas)
      setSelectedState("")
    }
    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };

  const handleSearch = useCallback((text) => {
    
    const response = selectedSwitch ==='Entradas' 
    ?initialDataEntradas.filter(data => data.proveedor.toLowerCase().includes(text))
    :initialDataSalidas.filter(data => data.comprador.toLowerCase().includes(text))
    setData(response);
  }, [selectedSwitch,initialDataEntradas,initialDataSalidas]);

  const handleViewDetailSale = (id) => {
    const data = {
      productos: [
        { id:1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10,valor_fabricacion:10000, valor_venta_producto: 100000, total: 1000000,ganancia_producto:50000 },
        { id:2, estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion:100000,valor_venta_producto: 375000, total: 1875000,ganancia_producto:50000 },
        { id:3, estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8,valor_fabricacion:100000, valor_venta_producto: 120000, total: 960000,ganancia_producto:50000 },
        { id:4, estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12,valor_fabricacion:100000, valor_venta_producto: 150000, total: 1800000,ganancia_producto:50000 },
      ],
      pagos: [
        { id: 1, nombre: "Transacción Bancolombia", valor: 1000000, fecha: "05/05/2024" },
        { id: 2, nombre: "Nequi", valor: 375000, fecha: "06/05/2024" },
        { id: 3, nombre: "Daviplata", valor: 960000, fecha: "07/05/2024" },
        { id: 4, nombre: "Efectivo", valor: 1800000, fecha: "08/05/2024" },
      ],
      salida: {
        id:2,
        valor: 5635000,
        estado: false,
      },
      cliente: {
        id: 6,
      nombre: "Jairo Miller Urrego Garay",
      },
    }

    setDataDetailSale(data)
    setOpenModal(true)
  }

  const handleCheckboxChange = useCallback((rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        setVentaProductos((prevVentaProductos) => {
          const { [rowIndex.id]: _, ...newVentaProductos } = prevVentaProductos;
          return newVentaProductos;
        });
        return prevSelectedRows.filter(row => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
   
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  const opcionesSeleccionable = [
    { value: " ", label: "Todos" },
    { value: "true", label: "Entregados" },
    { value: "false", label: "Pendientes" }

  ];


  return (
    <div className={mostrarRegistroVenta ? "stock-genius-movimientos-container-active" : "stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">

        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search onSearch={handleSearch} />
        </div>
        <div className="stock-genius-movimientos-left-layout">
          <Mostrar />
          <GeneralSelect id="estado"
            name="estado"
            value={selectedState} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeSelect} 
          />
          <div className="switch-wrapper">
            <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch}  options={["Salidas","Entradas"]}/>
          </div>
          <div className="stock-genius-general-add" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleCloseAll}>
            <Icon icon={"add"} />
          </div>
        </div>
        <div className="stock-genius-movimientos-left-table">
          {mostrarRegistroVenta 
          ? <TableWithCheckbox data={dataInventario} handleCheckboxChange={handleCheckboxChange}  selectedRows={selectedRows} excludedColumns={['id', 'valor_fabricacion', 'stock_min', 'estado', 'fecha']} /> 
          : <Table data={data} handleDoubleClick={handleViewDetailSale} />}


        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando 1 a 10 de 100</span>
          <div>
            <button className="stock-genius-movimientos-left-footer-devoluciones">Devoluciones</button>
            <button className="stock-genius-movimientos-left-footer-resumen">Resumen</button>
          </div>
        </div>
      </div>
      <div className={`stock-genius-movimientos-container-right ${mostrarRegistroVenta ? "stock-genius-active" : "stock-genius-inactive"}`}>
        {selectedSwitch==="Entradas"
        ?<RegistroEntrada/>
        :<RegistroVenta  selectedProducts={selectedRows} handleEliminarProducto={handleCheckboxChange} handleCloseAll={handleCloseAll} ventaProductos={ventaProductos} setVentaProductos={setVentaProductos} />
      }
      
      </div>
      <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} 
          title="Metodo de Pago.">
        <ModalDetailSale onClose={handleCloseModal} data={dataDetailSale} handleCloseAll={handleCloseModal}/>
        </GeneralModal>

    </div>
  )
}

export default Movimientos