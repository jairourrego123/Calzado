import { useCallback, useEffect, useMemo, useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import Table from "../../../components/Table/Table"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import RegistroVenta from "./components/RegistroVenta"
import GeneralModal from "../../../components/GeneralModal/GeneralModal"
import ModalDetail from "../../../components/ModalDetail/ModalDetail"
import Tabs from "../../../components/Tabs/Tabs"
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg"
import FilterDate from "../../../components/FilterDate/FilterDate"
import { getDetailSpend, getSales } from "../../../services/ventas/salesService"
import { getDetailEntry, getEntries } from "../../../services/entradas/entryService"
import { getReturns } from "../../../services/devoluciones/returnService"
import { getInventory } from "../../../services/inventario/inventoryService"
import Paginations from "../../../components/Paggination/Paginations"
function Movimientos() {
  //console.log("movimientos");



  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedState, setSelectedState] = useState(' ');
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);
  const [data, setData] = useState([])
  const [dataInventario, setDataInventario] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [ventaProductos, setVentaProductos] = useState({})
  const [dataDetailSale, setDataDetailSale] = useState([])
  const [columns, setColumns] = useState([])
  const [decimals, setDecimals] = useState(["valor"])
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
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

  const tabs = useMemo(() => [
    { label: "Ventas" },
    { label: "Entradas" },
    { label: "Devoluciones" },
  ], [])
  useEffect(() => {
    handleTabChange(0);
    // eslint-disable-next-line
  }, [])


  const GetListProductos = async (params = {}) => {
    setColumns(["referencia", "estilo", "color", "talla", "cantidad", "estado", "valor"])
    setDecimals(["valor"])
    const response = await getInventory({ params: params });
    setTotalPages(response.total_pages)

    setDataInventario(response.results);

  }

  const GetListVentas = async (params = {}) => {
    setColumns(["orden", "cliente", "cantidad", "valor_neto", "ganancia", "estado", "fecha"])
    setDecimals(["valor_neto", "ganancia"])
    console.time("GetListVentas")
    const response = await getSales({ params: params });
    setTotalPages(response.total_pages)

    console.timeEnd("GetListVentas")
    setData(response.results);
  }
  const GetListEntradas = async (params = {}) => {
    console.time("GetListEntradas")
    const response = await getEntries({ params: params });
    setTotalPages(response.total_pages)

    console.timeEnd("GetListEntradas")
    setColumns(["orden", "proveedor", "cantidad", "valor_neto", "estado", "usuario", "fecha"])
    setDecimals(["valor_neto"])
    setData(response.results);

  }
  const GetListDevoluciones = async (params = {}) => {
    setColumns(["orden", "referencia", "tipo", "valor_devolucion", "fecha", "usuario"])
    setDecimals(["valor_devolucion"])

    const response = await getReturns({ params: params });
    setTotalPages(response.total_pages)
    setData(response.results);
  }


  const handleChangeSelect = async (option) => {
    setSelectedState(option.target.value)



    if (selectedTab !== 2) {
      const tem_params = { ...params, estado: option.target.value }
      setParams(tem_params)
      handleFilters(selectedTab, tem_params)

    } else {
      const tem_params = { ...params, tipo: option.target.value }
      setParams(tem_params)
      handleFilters(selectedTab, tem_params)
    }

  }
  const handleSearch = useCallback(async (text) => {
    if (mostrarRegistroVenta) {
      await GetListProductos({ search: text })
    }
    else {
      switch (selectedTab) {
        case 0:
          await GetListVentas({ search: text });
          break;
        case 1:
          await GetListEntradas({ search: text });
          break;
        case 2:
          await GetListDevoluciones({ search: text });
          break;
        default:
          break;
      }
    }
  }, [selectedTab, mostrarRegistroVenta]);

  const handleViewSpend = async (venta) => {

    const dataprev = await getDetailSpend(venta.id)
    return dataprev


  }
  const handleViewEntrry = async (venta) => {

    //console.log("venta", venta);
    const dataprev = await getDetailEntry(venta.id)
    return dataprev


  }
  const handleViewDetail = async (row) => {
    let data = {}
    if (selectedTab === 2) {
      return
      //   //console.log("tipooo",row);
      //   if (row.tipo==="ENTRADA") {
      //     // data = await handleViewEntrry(row)
      //   }
      //  else{

      //   // data = await handleViewSpend(row)
      //  }

    }
    if (selectedTab === 1) {

      data = await handleViewEntrry(row)

    }
    else if (selectedTab === 0) {

      data = await handleViewSpend(row)
      // setSelectedTab(0)
    }

    // //console.log("data",data);

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

  const handleCloseAll = async () => {
    openModal ? handleTabChange(selectedTab, true) :
      !mostrarRegistroVenta
        ? await GetListProductos()
        : handleTabChange(selectedTab, true)
    openModal ? setMostrarRegistroVenta(false) : setMostrarRegistroVenta((e) => !e)
    setSelectedRows([])
    setVentaProductos({})

  }

  const handleTabChange = async (index, venta_realizada = false) => {

    console.time("handleTabChange")
    setSelectedTab(index);
    if (!mostrarRegistroVenta || venta_realizada) {
      if (index === 0) {

        await GetListVentas();
      }
      if (index === 1) {
        await GetListEntradas();
      }
      if (index === 2) {
        await GetListDevoluciones();
      }
    }
    else if (index === 2) {

      setMostrarRegistroVenta(false)
      await GetListDevoluciones();

    }
    setSelectedState(" ");
    console.timeEnd("handleTabChange")
  };

  const handleFilters = async (index, params = {}) => {

    if (index === 0) {
      await GetListVentas(params);
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
      //console.log("entre  al filter data");
      const tem_params = { ...params, fecha_inicio: '', fecha_fin: '' }

      setParams(tem_params)
      return handleFilters(selectedTab, tem_params);
    }
    if (date[0] === null || date[1] === null) return;
    const tem_params = { ...params, fecha_inicio: date[0], fecha_fin: date[1] }
    setParams(tem_params)
    handleFilters(selectedTab, tem_params);
  };

  const handleChangePage = useCallback(async (event, value) => {

    setPage(value)
    if (mostrarRegistroVenta) {
      await GetListProductos({ page: value })
    }
    else {
      switch (selectedTab) {
        case 0:
          await GetListVentas({ page: value });
          break;
        case 1:
          await GetListEntradas({ page: value });
          break;
        case 2:
          await GetListDevoluciones({ page: value });
          break;
        default:
          break;
      }

    }


  }, [mostrarRegistroVenta, selectedTab])
  return (
    <div className={mostrarRegistroVenta ? "stock-genius-movimientos-container-active" : "stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">

        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search onSearch={handleSearch} />
        </div>

        <div className="stock-genius-left-layout">
          {/* <Mostrar /> */}

          <GeneralSelect id="estado"
            name={selectedTab !== 2 ? "Estado" : "Tipo"}
            value={selectedState} // Asigna el valor seleccionado
            options={selectedTab !== 2 ? opcionesSeleccionableEstado : opcionesSeleccionableDevoluciones} // Pasa las opciones al componente
            onChange={handleChangeSelect}
          />
          <FilterDate handleFilterDate={handleFilterData} />
          {
            selectedTab !== 2 &&
            <div className="stock-genius-general-add" >
              <AddIcon className="stock-genius-click" onClick={handleCloseAll} />
            </div>
          }
        </div>



        <div className="stock-genius-movimientos-left-table stock-genius-tabs-and-table">

          <Tabs tabs={tabs} onTabChange={handleTabChange} />


          {mostrarRegistroVenta
            ? <TableWithCheckbox data={dataInventario} columns={columns} columns_decimals={decimals} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} />
            : <Table data={data} columns={columns} columns_decimals={decimals} handleDoubleClick={handleViewDetail} />}



        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando {page} de {totalPages}</span>
          {totalPages > 1 && <Paginations totalPages={totalPages} currentPage={page} handleChangePage={handleChangePage} />}
        </div>
        
        <div className={`stock-genius-movimientos-container-right ${mostrarRegistroVenta ? "stock-genius-active" : "stock-genius-inactive"}`}>
          <RegistroVenta selectedProducts={selectedRows} handleEliminarProducto={handleCheckboxChange}
            handleCloseAll={handleCloseAll}
            ventaProductos={ventaProductos}
            setVentaProductos={setVentaProductos}
            selectedTab={selectedTab} type={type} tabs={tabs} />

        </div>

      </div>

      <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"}
        title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModal} data={dataDetailSale} handleCloseAll={handleCloseAll} type={dataDetailSale?.venta ? "venta" : "entrada"} atributo={dataDetailSale?.cliente ? "cliente" : "proveedor"} />
      </GeneralModal>

    </div>
  )
}

export default Movimientos