import { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import Mostrar from "../../../components/Mostrar/Mostrar";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Table from "../../../components/Table/Table";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddExpenses from "../../../components/ModalAddExpenses/ModalAddExpenses";
import FilterDate from "../../../components/FilterDate/FilterDate";
import { getExpenses, getTypeExpenses } from "../../../services/gastos/expenseService";
import './Gastos.css';
import Paginations from "../../../components/Paggination/Paginations";

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [typeExpensives, setTypesExpensives] = useState([{ value: "", label: "Todos" }]);
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
  useEffect(() => {
    GetAllData();
  }, [loadData]);

  const GetAllData = async (params = {}) => {
    try {
      const [responseExpense, responsetypes] = await Promise.all([
        getExpenses({ params }),
        getTypeExpenses()
      ]);
      setGastos(responseExpense.results);
      setTotalPages(responseExpense.total_pages)

      console.log("Tipos de gasto",responsetypes.results);
      setTypesExpensives(responsetypes.results);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Maneja el error adecuadamente aquí, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  const GetListExpensives = async (params = {}) => {
    try {
      const responseExpense=  await getExpenses({params: params })
      setGastos(responseExpense.results);
      setTotalPages(responseExpense.total_pages)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Maneja el error adecuadamente aquí, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  const handleSearchExpensive = useCallback((text) => {
    GetListExpensives({ search: text });
  }, []);

  const handleChangeExpenseType = useCallback((event) => {
    const value = event.target.value;
    setSelectedExpenseType(value);
    console.log("value",value);
    if (value === "all") {
      setLoadData(prev => !prev);
    } else {
      GetListExpensives({ tipo_gasto: value });
    }
  }, []);

  const handleFilterData = async (date) => {
    if (date[0] === null && date[1] === null) return GetListExpensives();
    if (date[0] === null || date[1] === null) return;
    GetListExpensives({ fecha_inicio: date[0], fecha_fin: date[1] });
  };

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const columns = ["orden", "usuario", "tipo_de_gasto", "descripcion", "metodo_pago", "valor", 'fecha'];
  const columns_decimals = ["valor"];

  const handleChangePage = useCallback((event,value)=>{

    setPage(value)
    GetListExpensives({page:value})


  },[page])
  if (loading) {
    return <div>Loading...</div>;  // Componente de carga
  }
  return (
    <div className="stock-genius-general-content">
      <div className="stock-genius-gastos-header">
        <Header title="Gastos" />
        <Search onSearch={handleSearchExpensive} />
      </div>
      <div className="stock-genius-left-layout">
        {/* <Mostrar /> */}
       
        <GeneralSelect
          id="tipo-gasto"
          name="Tipo de gasto"
          value={selectedExpenseType}
          options={[{ value: "all", label: "Todos" }, ...typeExpensives]}
          onChange={handleChangeExpenseType}
        />
         <FilterDate handleFilterDate={handleFilterData} />
        <div className="stock-genius-general-add" onClick={handleOpenModal}>
          <AddIcon className="stock-genius-click" />
        </div>
        <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon="product" title="Registro de gastos" layout="Registro de los gastos tanto individual como general">
          <ModalAddExpenses onClose={handleCloseModal} setLoadData={setLoadData} typeExpensives={typeExpensives} />
        </GeneralModal>
      </div>
      <div className="stock-genius-gastos-table">
        <Table data={gastos} columns={columns} columns_decimals={columns_decimals} />
      </div>
      <div className="stock-genius-gastos-footer">
      <span>Mostrando {page} de {totalPages}</span>
      {totalPages>1&&<Paginations totalPages={totalPages} currentPage={page} handleChangePage={handleChangePage}/>}

      </div>
    </div>
  );
}

export default Gastos;
