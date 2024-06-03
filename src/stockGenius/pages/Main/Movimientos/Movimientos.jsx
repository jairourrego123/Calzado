import { useCallback, useMemo, useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import Icon from "../../../components/Icon/Icon"
import Table from "../../../components/Table/Table"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import RegistroVenta from "./components/RegistroVenta"
import GeneralModal from "../../../components/GeneralModal/GeneralModal"
import RegistroEntrada from "./components/RegistroEntrada"
import ModalDetail from "../../../components/ModalDetail/ModalDetail"
import Tabs from "../../../components/Tabs/Tabs"
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"
function Movimientos() {
  console.log("movimientos");

  const initialDataSalidas = useMemo(() => [
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
      "comprador": "María García",
      "cantidad": 10,
      "valor": 75.25,
      "estado": false,
      "fecha_registro": "2024-03-18"
    },
    {
      "id": 3,
      "orden": "SC2024-00003",
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "valor": 150.75,
      "estado": true,
      "fecha_registro": "2024-03-19"
    },
    {
      "id": 4,
      "orden": "SC2024-00004",
      "comprador": "Ana López",
      "cantidad": 8,
      "valor": 200.00,
      "estado": false,
      "fecha_registro": "2024-03-21"
    },
    {
      "id": 5,
      "orden": "SC2024-00005",
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "valor": 50.00,
      "estado": true,
      "fecha_registro": "2024-03-17"
    },
    {
      "id": 6,
      "orden": "SC2024-00006",
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "valor": 300.50,
      "estado": false,
      "fecha_registro": "2024-03-22"
    },
    {
      "id": 7,
      "orden": "SC2024-00007",
      "comprador": "David Fernández",
      "cantidad": 7,
      "valor": 120.75,
      "estado": true,
      "fecha_registro": "2024-03-23"
    },
    {
      "id": 8,
      "orden": "SC2024-00008",
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "valor": 90.00,
      "estado": false,
      "fecha_registro": "2024-03-19"
    },
    {
      "id": 9,
      "orden": "SC2024-00009",
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "valor": 180.25,
      "estado": true,
      "fecha_registro": "2024-03-25"
    },
    {
      "id": 10,
      "orden": "SC2024-00010",
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "valor": 210.00,
      "estado": false,
      "fecha_registro": "2024-03-24"
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
      "valor": 100.50,
      "fecha_registro": "2024-03-20"
    },
    {
      "id": 2,
      "estilo": "Moderno",
      "color": "Azul",
      "talla": "42",
      "cantidad": 10,
      "stock_min": 5,
      "estado": true,
      "valor": 75.25,
      "fecha_registro": "2024-03-18"
    },
    {
      "id": 3,
      "estilo": "Vintage",
      "color": "Verde",
      "talla": "39",
      "cantidad": 3,
      "stock_min": 4,
      "estado": false,
      "valor": 150.75,
      "fecha_registro": "2024-03-19"
    },
    {
      "id": 4,
      "estilo": "Industrial",
      "color": "Gris",
      "talla": "41",
      "cantidad": 8,
      "stock_min": 4,
      "estado": true,
      "valor": 200.00,
      "fecha_registro": "2024-03-21"
    },
    {
      "id": 5,
      "estilo": "Rústico",
      "color": "Marrón",
      "talla": "38",
      "cantidad": 5,
      "stock_min": 8,
      "estado": false,
      "valor": 50.00,
      "fecha_registro": "2024-03-17"
    },
    {
      "id": 6,
      "estilo": "Minimalista",
      "color": "Blanco",
      "talla": "39",
      "cantidad": 2,
      "stock_min": 1,
      "estado": true,
      "valor": 300.50,
      "fecha_registro": "2024-03-22"
    },
    {
      "id": 7,
      "estilo": "Escandinavo",
      "color": "Negro",
      "talla": "40",
      "cantidad": 2,
      "stock_min": 4,
      "estado": false,
      "valor": 120.75,
      "fecha_registro": "2024-03-23"
    },
    {
      "id": 8,
      "estilo": "Bohemio",
      "color": "Amarillo",
      "talla": "42",
      "cantidad": 12,
      "stock_min": 6,
      "estado": true,
      "valor": 90.00,
      "fecha_registro": "2024-03-19"
    },
    {
      "id": 9,
      "estilo": "Contemporáneo",
      "color": "Azul Marino",
      "talla": "43",
      "cantidad": 4,
      "stock_min": 12,
      "estado": false,
      "valor": 180.25,
      "fecha_registro": "2024-03-25"
    },
    {
      "id": 10,
      "estilo": "Ecléctico",
      "color": "Rosado",
      "talla": "39",
      "cantidad": 6,
      "stock_min": 3,
      "estado": true,
      "valor": 210.00,
      "fecha_registro": "2024-03-24"
    }
  ], []);

  const initialDataEntradas = useMemo(() => [
    {
      "id": 1,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor A",
      "registra": "Usuario 1",
      "estado": true,
      "fecha_registro": "2024-01-01",

    },
    {
      "id": 2,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor B",
      "registra": "Usuario 2",
      "estado": true,
      "fecha_registro": "2024-01-02",
    },
    {
      "id": 3,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor C",
      "registra": "Usuario 1",
      "estado": false,
      "fecha_registro": "2024-01-03",
    },
    {
      "id": 4,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor D",
      "registra": "Usuario 2",
      "estado": false,
      "fecha_registro": "2024-01-04",
    },
    {
      "id": 5,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor E",
      "registra": "Usuario 1",
      "estado": true,
      "fecha_registro": "2024-01-05",
    },
    {
      "id": 6,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor F",
      "registra": "Usuario 2",
      "estado": true,
      "fecha_registro": "2024-01-06",
    },
    {
      "id": 7,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor G",
      "registra": "Usuario 1",
      "estado": false,
      "fecha_registro": "2024-01-07",
    },
    {
      "id": 8,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor H",
      "registra": "Usuario 2",
      "estado": true,
      "fecha_registro": "2024-01-08",
    },
    {
      "id": 9,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor I",
      "registra": "Usuario 1",
      "estado": false,
      "fecha_registro": "2024-01-09",
    },
    {
      "id": 10,
      "orden": "EP2024-00001",
      "proveedor": "Proveedor J",
      "registra": "Usuario 2",
      "estado": true,
      "fecha_registro": "2024-01-10",
    }
  ]
    , []);

  const initialDataDevolucion = useMemo(() => [
    {
      "id": 1,
      "referencia": "EP2024-00001",
      "tipo": "Entrada",
      "valor": 15000.75,
      "fecha": "2024-01-01"
    },
    {
      "id": 2,
      "referencia": "SC2024-00001",
      "tipo": "Salida",
      "valor": 20000.00,
      "fecha": "2024-01-02"
    },
    {
      "id": 3,
      "referencia": "EP2024-00002",
      "tipo": "Entrada",
      "valor": 35000.50,
      "fecha": "2024-01-03"
    },
    {
      "id": 4,
      "referencia": "SC2024-00002",
      "tipo": "Salida",
      "valor": 12000.25,
      "fecha": "2024-01-04"
    },
    {
      "id": 5,
      "referencia": "EP2024-00003",
      "tipo": "Entrada",
      "valor": 50000.00,
      "fecha": "2024-01-05"
    },
    {
      "id": 6,
      "referencia": "SC2024-00003",
      "tipo": "Salida",
      "valor": 30000.75,
      "fecha": "2024-01-06"
    },
    {
      "id": 7,
      "referencia": "EP2024-00004",
      "tipo": "Entrada",
      "valor": 45000.00,
      "fecha": "2024-01-07"
    },
    {
      "id": 8,
      "referencia": "SC2024-00004",
      "tipo": "Salida",
      "valor": 25000.50,
      "fecha": "2024-01-08"
    },
    {
      "id": 9,
      "referencia": "EP2024-00005",
      "tipo": "Entrada",
      "valor": 60000.25,
      "fecha": "2024-01-09"
    },
    {
      "id": 10,
      "referencia": "SC2024-00005",
      "tipo": "Salida",
      "valor": 35000.00,
      "fecha": "2024-01-10"
    }
  ]
    , [])
  
  const dataInitial = useMemo (()=>[initialDataSalidas,initialDataEntradas,initialDataDevolucion],[initialDataSalidas,initialDataEntradas,initialDataDevolucion])
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedState, setSelectedState] = useState(' ');
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);
  const [data, setData] = useState(initialDataSalidas)
  const [selectedRows, setSelectedRows] = useState([]);
  const [ventaProductos, setVentaProductos] = useState({})
  const [dataDetailSale, setDataDetailSale] = useState([])
  const [totalEntrada, setTotalEntrada] = useState('')
  // const [dataEntrada]=useState(initialDataEntradas)

  const type = useMemo(() => ({
    "Entradas": { "nombre": "entrada", "atributo": "proveedor" },
    "Salidas": { "nombre": "salida", "atributo": "cliente" },
  }), [])
  const handleCloseAll = () => {

    setMostrarRegistroVenta((e) => !e)
    setSelectedRows([])
    setVentaProductos({})
    setTotalEntrada('')
  }

  const handleChangeSelect = (option) => {
    setSelectedState(option.target.value)
    if (option.target.value === " ") {
      setData(dataInitial[selectedTab])
    } else {
      const available = option.target.value === 'true';
      const response = selectedTab !== 2
        ? dataInitial[selectedTab].filter(data => data.estado === available)
        : dataInitial[selectedTab].filter(data => data.tipo === option.target.value)
      setData(response);
    }
  }

  const handleSearch = useCallback((text) => {
    
    if (selectedTab === 0) {
      setData(dataInitial[selectedTab].filter(data => data.comprador.toLowerCase().includes(text)))}
    if (selectedTab === 1) {
      setData(dataInitial[selectedTab].filter(data => data.proveedor.toLowerCase().includes(text)))}
    if (selectedTab === 2) {
      setData(dataInitial[selectedTab].filter(data => data.referencia.toLowerCase().includes(text)))}

  }, [selectedTab, dataInitial ]);

  const handleViewDetail = (id) => {
    let data = {}
    if (selectedTab === 1) {

      data = {
        productos: [
          { id: 1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 5 }
        ],
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
  const opcionesSeleccionableEstado = [
    { value: " ", label: "Todos" },
    { value: "true", label: "Entregados" },
    { value: "false", label: "Pendientes" }

  ];
  const opcionesSeleccionableDevoluciones = [
    { value: " ", label: "Todos" },
    { value: "Entrada", label: "Entradas" },
    { value: "Salida", label: "Salidas" }

  ];

  const tabs  = useMemo(()=> [
    { label: "Salidas" },
    { label: "Entradas" },
    { label: "Devoluciones" },
  ],[])
  const handleTabChange = (index) => {
    setSelectedTab(index);
    if (index === 1) {
      setData(initialDataEntradas);
    }
    if (index === 0) {
      setData(initialDataSalidas);
    }
    if (index === 2) {
      setData(initialDataDevolucion);
    }
    setSelectedState(" ");
  };
  return (
    <div className={mostrarRegistroVenta ? "stock-genius-movimientos-container-active" : "stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">

        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search onSearch={handleSearch} />
        </div>

        <div className="stock-genius-left-layout">
          <Mostrar />
          <GeneralSelect id="estado"
            name="estado"
            value={selectedState} // Asigna el valor seleccionado
            options={selectedTab!==2?opcionesSeleccionableEstado:opcionesSeleccionableDevoluciones} // Pasa las opciones al componente
            onChange={handleChangeSelect}
          />
          {
            selectedTab !==2 &&
            <div className="stock-genius-general-add" onClick={handleCloseAll}>
              <AddIcon className="stock-genius-click"/>
            </div>
          }
        </div>



        <div className="stock-genius-movimientos-left-table stock-genius-tabs-and-table">

          <Tabs tabs={tabs} onTabChange={handleTabChange} />


          {mostrarRegistroVenta
            ? <TableWithCheckbox data={dataInventario} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} excludedColumns={['id', 'valor_fabricacion', 'stock_min', 'estado', 'fecha']} />
            : <Table data={data} handleDoubleClick={handleViewDetail} />}



        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando 1 a 10 de 100</span>

        </div>
      </div>
      <div className={`stock-genius-movimientos-container-right ${mostrarRegistroVenta ? "stock-genius-active" : "stock-genius-inactive"}`}>
           <RegistroVenta selectedProducts={selectedRows} handleEliminarProducto={handleCheckboxChange} 
           handleCloseAll={handleCloseAll}
            ventaProductos={ventaProductos} 
            setVentaProductos={setVentaProductos}
             selectedTab={selectedTab} type={type} tabs={tabs} />
        

      </div>
      <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"}
        title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModal} data={dataDetailSale} handleCloseAll={handleCloseModal} type={type[tabs[selectedTab].label]?.["nombre"]} atributo={type[tabs[selectedTab].label]?.["atributo"]} />
      </GeneralModal>

    </div>
  )
}

export default Movimientos