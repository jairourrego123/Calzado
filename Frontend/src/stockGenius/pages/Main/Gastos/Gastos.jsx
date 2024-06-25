import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import Mostrar from "../../../components/Mostrar/Mostrar";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Table from "../../../components/Table/Table"
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"

import './Gastos.css'
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddExpenses from "../../../components/ModalAddExpenses/ModalAddExpenses";
import FilterDate from "../../../components/FilterDate/FilterDate";
import { getExpenses, getExpensesDateRange } from "../../../services/gastos/expenseService";
function Gastos() {
  const initialData = useMemo(() => [
    {
      
      "id":1,
      "usuario": "Usuario 1",
      "tipo_gasto": "General",
      "precio": 100,
      "fecha": "2024-04-23",
    },
    {
      "id":2,
      "usuario": "Usuario 2",
      "tipo_gasto": "Personal",
      "precio": 150,
      "fecha": "2024-04-22",
    },
    {
      "id":3,
      "usuario": "Usuario 1",
      "tipo_gasto": "Personal",
      "precio": 200,
      "fecha": "2024-04-21",
    },
    {
      "id":4,
      "usuario": "Usuario 2",
      "tipo_gasto": "General",
      "precio": 120,
      "fecha": "2024-04-20",
    },
    {
      "id":5,
      "usuario": "Usuario 1",
      "tipo_gasto": "General",
      "precio": 180,
      "fecha": "2024-04-19",
    },
    {
      "id":6,
      "usuario": "Usuario 2",
      "tipo_gasto": "Personal",
      "precio": 90,
      "fecha": "2024-04-18",
    },
    {
      "id":7,
      "usuario": "Usuario 1",
      "tipo_gasto": "Personal",
      "precio": 210,
      "fecha": "2024-04-17",
    },
    {
      "id":8,
      "usuario": "Usuario 2",
      "tipo_gasto": "General",
      "precio": 140,
      "fecha": "2024-04-16",
    },
    {
      "id":9,
      "usuario": "Usuario 1",
      "tipo_gasto": "General",
      "precio": 160,
      "fecha": "2024-04-15",
    },
    {
      "id":10,
      "usuario": "Usuario 2",
      "tipo_gasto": "Personal",
      "precio": 170,
      "fecha": "2024-04-14",
    }
  ]

    , []);
  const [data] = useState(initialData);
  const [gastos, setGastos] = useState(data);
  const [selectedExpenseType, setSelectedExpenseType] = useState(' ');
  const [openModal, setOpenModal] = useState(false);
  const [loadData,setLoadData]=useState(false)
  useEffect(()=>{
    GetListExpensives()
  },[loadData])

  const GetListExpensives = async(params={})=>{
      const response = await getExpenses({params:params})
      setGastos(response.results)
  };
  const handleSearchExpensive = useCallback((text) => {
    const response = data.filter(data => data.usuario.toLowerCase().includes(text));
    setGastos(response);

  }, [data]);

  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: "General", label: "General" },
    { value: "Personal", label: "Personal " }
  ], []);

  const handleChangeExpenseType = useCallback((option) => {
    setSelectedExpenseType(option.target.value);
    if (option.target.value === " ") {
      setLoadData((prev)=>!prev);
    } else {
      GetListExpensives({tipo_gasto:option.target.value})
    }
  }, [data]);

  
  const handleFilterData = async (date)=>{

    if (date[0] === null && date[1] ===null) return  GetListExpensives()
    if (date[0] === null || date[1] ===null) return
    console.log(date);
    const result = await getExpensesDateRange({fecha_inicio:date[0], fecha_fin:date[1]})
    setGastos(result.data)
  };

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const columns =["orden","usuario","tipo_gasto","descripcion","metodo_de_pago","valor",'fecha'] 
  return (
    <>
      <div className="stock-genius-general-content">
        <div className="stock-genius-gastos-header">
          <Header title={"Gastos"} />
          <Search onSearch={handleSearchExpensive} />
        </div>
        <div className="stock-genius-left-layout">
          <Mostrar />
          <FilterDate handleFilterDate={handleFilterData}/>
          <GeneralSelect
            id="tipo-gasto"
            name="Tipo Gasto"
            value={selectedExpenseType} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeExpenseType} // Define la función de cambio 
          />
           
          <div className="stock-genius-general-add"   onClick={handleOpenModal}>
            <AddIcon className="stock-genius-click"/>
          </div>

          <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} 
          title="Registro de gastos"
            layout="Registro de los gastos tanto individual como general">
            <ModalAddExpenses onClose={handleCloseModal}/>
          </GeneralModal>
        </div>
        <div className="stock-genius-gastos-table">
        <Table data={gastos} columns={columns} />
        
        </div>
        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
      </div>
    </>
    // <Header title={"Gastos"}/>
  )
}

export default Gastos