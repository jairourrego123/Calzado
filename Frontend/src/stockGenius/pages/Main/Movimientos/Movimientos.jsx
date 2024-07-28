import { useCallback, useEffect, useMemo, useReducer } from "react";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Header from "../../../components/Header/Header";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Search from "../../../components/Search/Search";
import config from '../../../const/config.json';
import './Movimientos.css';
import Table from "../../../components/Table/Table";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import RegistroVenta from "./components/RegistroVenta";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
import Tabs from "../../../components/Tabs/Tabs";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg";
import FilterDate from "../../../components/FilterDate/FilterDate";
import { getSales } from "../../../services/ventas/salesService"
import { getEntries } from "../../../services/entradas/entryService"
import { getReturns } from "../../../services/devoluciones/returnService"
import { getInventory } from "../../../services/inventario/inventoryService"

const initialState = {
  openModal: false,
  selectedTab: 0,
  selectedState: ' ',
  mostrarRegistroVenta: false,
  data: [],
  selectedRows: [],
  ventaProductos: {},
  dataDetailSale: [],
  columns: [],
  decimals: ["valor"],
  params: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, [action.key]: action.value };
    case 'SET_PARAMS':
      return { ...state, params: { ...state.params, ...action.value } };
    default:
      return state;
  }
};

function Movimientos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const type = useMemo(() => ({
    "Entradas": { "nombre": "entrada", "atributo": "proveedor" },
    "Ventas": { "nombre": "venta", "atributo": "cliente" },
  }), []);

  const opcionesSeleccionableEstado = useMemo(() => [
    { value: ' ', label: "Todos" },
    { value: "true", label: "Completos" },
    { value: "false", label: "Pendientes" }
  ], []);

  const opcionesSeleccionableDevoluciones = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: "Entrada", label: "Entradas" },
    { value: "Venta", label: "Ventas" }
  ], []);

  const tabs = useMemo(() => [
    { label: "Ventas" },
    { label: "Entradas" },
    { label: "Devoluciones" },
  ], []);

  useEffect(() => {
    handleTabChange(0);
    // eslint-disable-next-line
  }, []);

  const fetchData = useCallback(async (fetchFunc, columns, params = {}) => {
    const response = await fetchFunc({ params });
    dispatch({ type: 'SET_STATE', key: 'data', value: response.results });
    dispatch({ type: 'SET_STATE', key: 'columns', value: columns });
  }, []);
  

  const handleTabChange = useCallback(async (index, venta_realizada = false) => {
    dispatch({ type: 'SET_STATE', key: 'selectedTab', value: index });
    dispatch({ type: 'SET_STATE', key: 'selectedState', value: ' ' });
    
  
    if (!state.mostrarRegistroVenta || venta_realizada) {
      if (index === 0) {
        await fetchData(getSales, ["orden", "cliente", "cantidad", "valor", "ganancia", "estado", "fecha"]);
      } else if (index === 1) {
        await fetchData(getEntries, ["orden", "proveedor", "valor", "estado", "usuario", "fecha"]);
      } else if (index === 2) {
       
        await fetchData(getReturns, ["orden", "referencia", "tipo", "valor_devolucion", "fecha", "usuario"]);
      }
    }
    else if (index === 2) {
       
      dispatch({ type: 'SET_STATE', key: 'mostrarRegistroVenta', value: false });
    }
  }, [fetchData, state.mostrarRegistroVenta]);
  

  const handleFilters = useCallback(async (index, params = {}) => {
    if (index === 0) {
      await fetchData(getSales, ["orden", "cliente", "cantidad", "valor", "ganancia", "estado", "fecha"], params);
    } else if (index === 1) {
      await fetchData(getEntries, ["orden", "proveedor", "valor", "estado", "usuario", "fecha"], params);
    } else if (index === 2) {
      await fetchData(getReturns, ["orden", "referencia", "tipo", "valor_devolucion", "fecha", "usuario"], params);
    }
  }, [fetchData]);
  

  const handleChangeSelect = useCallback(async (option) => {
    const value = option.target.value;
    dispatch({ type: 'SET_STATE', key: 'selectedState', value });

    const tem_params = { ...state.params, [state.selectedTab !== 2 ? 'estado' : 'tipo']: value };
    dispatch({ type: 'SET_PARAMS', value: tem_params });
    await handleFilters(state.selectedTab, tem_params);
  }, [handleFilters, state.params, state.selectedTab]);

  
  const handleSearch = useCallback(async (text) => {
    if (state.mostrarRegistroVenta) {
      await fetchData(getInventory, ["referencia", "estilo", "color", "talla", "cantidad", "estado", "valor"], { search: text });
    } else {
      if (state.selectedTab === 0) {
        await fetchData(getSales, ["orden", "cliente", "cantidad", "valor", "ganancia", "estado", "fecha"], { search: text });
      } else if (state.selectedTab === 1) {
        await fetchData(getEntries, ["orden", "proveedor", "valor", "estado", "usuario", "fecha"], { search: text });
      } else if (state.selectedTab === 2) {
        await fetchData(getReturns, ["orden", "referencia", "tipo", "valor_devolucion", "fecha", "usuario"], { search: text });
      }
    }
  }, [fetchData, state.mostrarRegistroVenta, state.selectedTab]);
  

  const handleViewDetail = useCallback((row) => {
    dispatch({ type: 'SET_STATE', key: 'dataDetailSale', value: state.data });
    dispatch({ type: 'SET_STATE', key: 'openModal', value: true });
  }, [state.data]);

  const handleCheckboxChange = useCallback((rowIndex) => {
    const newSelectedRows = state.selectedRows.includes(rowIndex)
      ? state.selectedRows.filter(row => row !== rowIndex)
      : [...state.selectedRows, rowIndex];
    dispatch({ type: 'SET_STATE', key: 'selectedRows', value: newSelectedRows });
  }, [state.selectedRows]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'SET_STATE', key: 'openModal', value: false });
  }, []);

  const handleCloseAll = useCallback(async () => {
    dispatch({ type: 'SET_STATE', key: 'mostrarRegistroVenta', value: !state.mostrarRegistroVenta });
    dispatch({ type: 'SET_STATE', key: 'selectedRows', value: [] });
    dispatch({ type: 'SET_STATE', key: 'ventaProductos', value: {} });
    !state.mostrarRegistroVenta ? await fetchData(getInventory,["referencia", "estilo", "color", "talla", "cantidad", "estado", "valor"]) : handleTabChange(state.selectedTab, true);
  }, [fetchData, handleTabChange, state.mostrarRegistroVenta, state.selectedTab]);

  const handleFilterData = useCallback(async (date) => {
    if (date[0] === null && date[1] === null) {
      const tem_params = { ...state.params, fecha_inicio: '', fecha_fin: '' };
      dispatch({ type: 'SET_PARAMS', value: tem_params });
      return handleFilters(state.selectedTab, tem_params);
    }
  
    if (date[0] === null || date[1] === null) return;
    const tem_params = { ...state.params, fecha_inicio: date[0], fecha_fin: date[1] };
    dispatch({ type: 'SET_PARAMS', value: tem_params });
    await handleFilters(state.selectedTab, tem_params);
  }, [handleFilters, state.params, state.selectedTab]);
  
  console.log("state,data:",state.data);
  console.log("state columna:",state.columns);
  return (
    <div className={state.mostrarRegistroVenta ? "stock-genius-movimientos-container-active" : "stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">
        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search onSearch={handleSearch} />
        </div>
        <div className="stock-genius-left-layout">
          <Mostrar />
          <FilterDate handleFilterDate={handleFilterData} />
          <GeneralSelect 
            id="estado"
            name={state.selectedTab !== 2 ? "Estado" : "Tipo"}
            value={state.selectedState}
            options={state.selectedTab !== 2 ? opcionesSeleccionableEstado : opcionesSeleccionableDevoluciones}
            onChange={handleChangeSelect}
          />
          {state.selectedTab !== 2 && (
            <div className="stock-genius-general-add">
              <AddIcon className="stock-genius-click" onClick={handleCloseAll} />
            </div>
          )}
        </div>
        <div className="stock-genius-movimientos-left-table stock-genius-tabs-and-table">
          <Tabs tabs={tabs} onTabChange={handleTabChange} />
          {state.mostrarRegistroVenta
            ? <TableWithCheckbox data={state.data} columns={state.columns} columns_decimals={state.decimals} handleCheckboxChange={handleCheckboxChange} selectedRows={state.selectedRows} />
            : <Table data={state.data} columns={state.columns} columns_decimals={state.decimals} handleDoubleClick={handleViewDetail} />}
        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando 1 a 10 de 100</span>
        </div>
      </div>
      <div className={`stock-genius-movimientos-container-right ${state.mostrarRegistroVenta ? "stock-genius-active" : "stock-genius-inactive"}`}>
        <RegistroVenta 
          selectedProducts={state.selectedRows} 
          handleEliminarProducto={handleCheckboxChange}
          handleCloseAll={handleCloseAll}
          ventaProductos={state.ventaProductos}
          setVentaProductos={(value) => dispatch({ type: 'SET_STATE', key: 'ventaProductos', value })}
          selectedTab={state.selectedTab} 
          type={type} 
          tabs={tabs} 
        />
      </div>
      <GeneralModal isOpen={state.openModal} onClose={handleCloseModal} icon={"product"} title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModal} data={state.dataDetailSale} />
      </GeneralModal>
    </div>
  );
}

export default Movimientos;
