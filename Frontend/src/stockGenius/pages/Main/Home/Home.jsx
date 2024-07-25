import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import Header from "../../../components/Header/Header";
import Table from "../../../components/Table/Table";
import config from '../../../const/config.json'

import "./Home.css";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
import { formatPrice } from "../../../helpers/formatPrice";
import { useMemo } from "react";

import {getDataHome,getDetailSpend} from "../../../services/data/dataService"
import { useLoader } from "../../../context/LoadingContext";
function Home() {
  const  {showLoader,hideLoader} = useLoader()
  const [data,setData] = useState([])
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [loadData,setLoadData]=useState(false)
  const handleViewMovimineto = async (id) => {
    
    const dataprev= await getDetailSpend(id.orden)
    console.log("data view movimiento",dataprev);
    setDataDetail(dataprev)
    setOpenModalDetail(true)

  }
  const handleCloseAll = ()=>{
    setLoadData(e=>!e)
  }
  const handleCloseModal = () => {
    setOpenModalDetail(false)
  }
  useEffect(() => {
    console.log("ejecutando efecto home");

    GetDataHome();
  }, [loadData]);
  const GetDataHome = async () => {
    const response = await getDataHome({ params: { fecha:"2024-06-15" } })
    setData(response);

  };
  const columns = useMemo(()=>["orden","cliente","cantidad","valor_neto","ganancia","estado","fecha"],[])
  const columns_decimals=["valor_neto","ganancia"]

  return (
    <div className="stock-genius-home-container">
      <div className="stock-genius-home-header" style={{ backgroundColor: config.backgroundPrincipal }}>
        <Header title={"Home"} />
      </div>

      <span className="stock-genius-home-layout stock-genius-sub-titles">Últimas ventas</span>
      <div className="stock-genius-home-table">
        <Table data={data?.venta} handleDoubleClick={handleViewMovimineto} columns={columns} columns_decimals={columns_decimals}/>
      </div>
      <div className="stock-genius-home-cards">


          <Card
            rute={"movimientos"}
            text={"Ventas del dia"}
            value={formatPrice( data?.suma_ventas?.suma_total)}
          />


        <Card 
        rute={"movimientos"}
        text={"Ganancias del dia"}
        value={formatPrice( data?.suma_ganancia?.suma_total)}
         />
        <Card
          rute={"gastos"}
          text={"Gastos del dia"}
          value={formatPrice( data?.suma_gastos?.suma_total)}
        />
        {/* <Card
            text={"Ganancias del dia"}
            value={"$2.000.000"}
          /> */}
      </div>
      <GeneralModal onClose={handleCloseModal} icon={"product"} isOpen={openModalDetail}
        title={"Detalle de venta."}
        layout={"Visualiza el detalle de esta venta."}  >
        <ModalDetail atributo={"cliente"} data={dataDetail} onClose={handleCloseModal} handleCloseAll={handleCloseAll} type={"venta"} />
      </GeneralModal>
    </div>
  );
}

export default Home;
