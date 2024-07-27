import { useCallback, useEffect, useMemo, useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import Table from "../../../components/Table/Table"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import RegistroVenta from "./components/RegistroVenta"
import GeneralModal from "../../../components/GeneralModal/GeneralModal"
import ModalDetail from "../../../components/ModalDetail/ModalDetail"
import Tabs from "../../../components/Tabs/Tabs"
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"
import FilterDate from "../../../components/FilterDate/FilterDate"
import { getSales } from "../../../services/ventas/salesService"
import { getEntries } from "../../../services/entradas/entryService"
import { getReturns } from "../../../services/devoluciones/returnService"
import { getInventory } from "../../../services/inventario/inventoryService"
function Movimientos() {
  console.log("movimientos");
  
  
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedState, setSelectedState] = useState(' ');
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);
  const [data, setData] = useState([])
  const [dataInventario,setDataInventario] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [ventaProductos, setVentaProductos] = useState({})
  const [dataDetailSale, setDataDetailSale] = useState([])
  const [columns,setColumns] = useState([])
  const [decimals,setDecimals] = useState(["valor"])
  const [params,setParams]=useState({})

  // alert(mostrarRegistroVenta)
  const type = useMemo(() => ({
    "Entradas": { "nombre": "entrada", "atributo": "proveedor" },
    "Ventas": { "nombre": "venta", "atributo": "cliente" },
  }), [])
  // alert(mostrarRegistroVenta)

  const opcionesSeleccionableEstado = [
    { value: ' ', label: "Todos" },
    { value: "true", label: "Completos" },
    { value: "false", label: "Pendientes" }

  ];
  const opcionesSeleccionableDevoluciones = [
    { value: " ", label: "Todos" },
    { value: "Entrada", label: "Entradas" },
    { value: "Venta", label: "Ventas" }

  ];

  const tabs  = useMemo(()=> [
    { label: "Ventas" },
    { label: "Entradas" },
    { label: "Devoluciones" },
  ],[])
  useEffect(() => {
    handleTabChange(0);
   
  }, [])
  

  const GetListProductos= async(params={})=>{
    setColumns( ["referencia","estilo","color","talla","cantidad","estado","valor"])
    setDecimals(["valor"])
    const response = await getInventory({params: params });
    setDataInventario(response.results);

  }
    
  const GetListVentas = async (params={})=>{
    setColumns(["orden","cliente","cantidad","valor","ganancia","estado","fecha"])
    setDecimals(["valor","ganancia"])
    console.time("GetListVentas")
    const response = await getSales({params:params});
    console.timeEnd("GetListVentas")
    setData(response.results);
  }
  const GetListEntradas = async (params={})=>{
    console.time("GetListEntradas")
    const response = await getEntries({params:params});
    console.timeEnd("GetListEntradas")
    setColumns(["orden","proveedor","valor","estado","usuario","fecha"])
    setDecimals(["valor"])
    setData(response.results);
    
  }
  const GetListDevoluciones = async (params={})=>{
    setColumns(["orden","referencia","tipo","valor_devolucion","fecha","usuario"])
    setDecimals(["valor_devolucion"])
    const response = await getReturns({params:params});
    setData(response.results);
  }


  const handleChangeSelect = async (option) => {
    setSelectedState(option.target.value)
  

   
    if (selectedTab!==2) {
      const tem_params = {...params,estado:option.target.value }
      setParams(tem_params)
      handleFilters(selectedTab,tem_params)

    } else {
      const tem_params = {...params,tipo:option.target.value }
      setParams(tem_params)
      handleFilters(selectedTab,tem_params)
  }

  }
  const handleSearch = useCallback(async (text) => {
    if (mostrarRegistroVenta) {
     await GetListProductos({search:text})
    }
    else {
    switch (selectedTab) {
      case 0:
        await GetListVentas({search:text});
        break;
      case 1:
       await  GetListEntradas({search:text});
        break;
      case 2:
       await GetListDevoluciones({search:text});
        break;
      default:
        break;
    }
    }
  }, [selectedTab,mostrarRegistroVenta]);

  const handleViewDetail = (row) => {
    let data = {}
     if (selectedTab === 2){
      if (row.tipo==="Salida") {
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
     else{
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
   
    }
    if (selectedTab === 1) {

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
    else if (selectedTab === 0){
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
      setSelectedTab(0)
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

  const handleCloseAll = async() => {
    !mostrarRegistroVenta
    ?await GetListProductos()
    :handleTabChange(selectedTab,true)
    setMostrarRegistroVenta((e) => !e)
    setSelectedRows([])
    setVentaProductos({})

  }

  const handleTabChange = async (index,venta_realizada=false) => {
    
    console.time("handleTabChange")
    setSelectedTab(index);
    if(!mostrarRegistroVenta ||venta_realizada ){
    if (index === 0) {
      
     await  GetListVentas();
    }
    if (index === 1) {
      await GetListEntradas();
    }
    if (index === 2) {
      setMostrarRegistroVenta(false)
      await GetListDevoluciones();
    }
  }
    setSelectedState(" ");
    console.timeEnd("handleTabChange")
  };

  const handleFilters = async (index,params={}) => {
    
    if (index === 0) {
     await  GetListVentas(params);
    }
    if (index === 1) {
      await GetListEntradas(params);
    }
    if (index === 2) {
      await GetListDevoluciones(params);
    }
  };

  const handleFilterData = async (date) => {
    if (date[0] === null && date[1] === null) {
      console.log("entre  al filter data");
      const tem_params = {...params,fecha_inicio:'',fecha_fin:'' }

      setParams(tem_params)
      return handleFilters(selectedTab,tem_params);
    }
    if (date[0] === null || date[1] === null) return;
    const tem_params = {...params,fecha_inicio: date[0],fecha_fin:date[1] }
    setParams(tem_params)
    handleFilters(selectedTab,tem_params);
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
          <FilterDate handleFilterDate={handleFilterData}/>
          <GeneralSelect id="estado"
            name={selectedTab!==2?"Estado":"Tipo"}
            value={selectedState} // Asigna el valor seleccionado
            options={selectedTab!==2?opcionesSeleccionableEstado:opcionesSeleccionableDevoluciones} // Pasa las opciones al componente
            onChange={handleChangeSelect}
          />
          {
            selectedTab !==2  &&
            <div className="stock-genius-general-add" >
              <AddIcon className="stock-genius-click" onClick={handleCloseAll}/>
            </div>
          }
        </div>



        <div className="stock-genius-movimientos-left-table stock-genius-tabs-and-table">

          <Tabs tabs={tabs} onTabChange={handleTabChange} />


          {mostrarRegistroVenta
            ? <TableWithCheckbox data={dataInventario} columns={columns} columns_decimals={decimals}  handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows}  />
            : <Table data={data} columns={columns} columns_decimals={decimals} handleDoubleClick={handleViewDetail} />}



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
        <ModalDetail  onClose={handleCloseModal} data={dataDetailSale} handleCloseAll={handleCloseAll} type={dataDetailSale?.salida?"salida":"entrada"} atributo={dataDetailSale?.cliente?"cliente":"proveedor"} />
      </GeneralModal>

    </div>
  )
}

export default Movimientos