import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import Header from "../../../components/Header/Header";
import Table from "../../../components/Table/Table";
import config from '../../../const/config.json'

import "./Home.css";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
import apiClient from '../../../api/axios';
import { formatPrice } from "../../../helpers/formatPrice";
import { useMemo } from "react";

import {getDataHome,getDetailSpend} from "../../../services/data/dataService"
function Home() {

  const [data,setData] = useState([])
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [loadData,setLoadData]=useState(false)
  const handleViewMovimineto = async (id) => {
    
    const dataprev= await getDetailSpend(id.orden)
    setDataDetail(dataprev)
    setOpenModalDetail(true)

    const data = {
      productos: [
        { id: 1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10, valor_fabricacion: 10000, valor_venta_producto: 100000, total: 1000000, ganancia_producto: 50000 },
        { id: 2, estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion: 100000, valor_venta_producto: 375000, total: 1875000, ganancia_producto: 50000 },
        { id: 3, estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_fabricacion: 100000, valor_venta_producto: 120000, total: 960000, ganancia_producto: 50000 },
        { id: 4, estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_fabricacion: 100000, valor_venta_producto: 150000, total: 1800000, ganancia_producto: 50000 },
      ],
      pagos: [
        { id: 1, nombre: "Transacción Bancolombia", valor: 1000000, fecha: "05/05/2024" },
        { id: 2, nombre: "Nequi", valor: 375000, fecha: "06/05/2024" },
        { id: 3, nombre: "Daviplata", valor: 960000, fecha: "07/05/2024" },
        { id: 4, nombre: "Efectivo", valor: 1800000, fecha: "08/05/2024" },
      ],
      devolucion: [],
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
    // setDataDetail(data)
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
  return (
    <div className="stock-genius-home-container">
      <div className="stock-genius-home-header" style={{ backgroundColor: config.backgroundPrincipal }}>
        <Header title={"Home"} />
      </div>

      <span className="stock-genius-home-layout stock-genius-sub-titles">Últimas ventas</span>
      <div className="stock-genius-home-table">
        <Table data={data?.venta} handleDoubleClick={handleViewMovimineto} columns={columns}/>
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
        value={formatPrice( data?.suma_gastos?.suma_total)}
         />
        <Card
          rute={"gastos"}
          text={"Gastos del dia"}
          value={formatPrice( data?.suma_ganancia?.suma_total)}
        />
        {/* <Card
            text={"Ganancias del dia"}
            value={"$2.000.000"}
          /> */}
      </div>
      <GeneralModal onClose={handleCloseModal} icon={"product"} isOpen={openModalDetail}
        title={"Detalle de venta."}
        layout={"Visualiza el detalle de esta venta."}  >
        <ModalDetail setLoadDataHome={setLoadData}atributo={"cliente"} data={dataDetail} onClose={handleCloseModal} handleCloseAll={handleCloseModal} type={"venta"} />
      </GeneralModal>
    </div>
  );
}

export default Home;
