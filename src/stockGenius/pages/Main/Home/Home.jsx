import { useState } from "react";
import Card from "../../../components/Card/Card";
import Header from "../../../components/Header/Header";
import Table from "../../../components/Table/Table";
import config from '../../../const/config.json'

import "./Home.css";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalDetail from "../../../components/ModalDetail/ModalDetail";
function Home() {
  const data = [
    {
      "id": 1,
      "comprador": "Juan Pérez",
      "cantidad": 5,
      "valor": 100000.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "comprador": "María García",
      "cantidad": 10,
      "valor": 75000.25,
      "estado": false,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "valor": 150000.75,
      "estado": true,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "comprador": "Ana López",
      "cantidad": 8,
      "valor": 200000.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "valor": 50000.00,
      "estado": true,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "valor": 300000.50,
      "estado": false,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "comprador": "David Fernández",
      "cantidad": 7,
      "valor": 120000.75,
      "estado": true,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "valor": 90000.00,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "valor": 180000.25,
      "estado": true,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "valor": 210000.00,
      "estado": false,
      "fecha": "2024-03-24"
    }
];

  const [openModalDetail,setOpenModalDetail]=useState(false)
  const [dataDetail,setDataDetail]= useState([])
const handleViewMovimineto = (id)=>{
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
  setDataDetail(data)
}
const handleCloseModal = ()=>{
  setOpenModalDetail(false)
}
  return (
    <div className="stock-genius-home-container">
      <div className="stock-genius-home-header" style={{backgroundColor:config.backgroundPrincipal}}>
        <Header title={"Home"} />
      </div>

      <span className="stock-genius-home-layout stock-genius-sub-titles">Últimas ventas</span>
      <div className="stock-genius-home-table">
        <Table data={data} handleDoubleClick={handleViewMovimineto} />
      </div>
      <div className="stock-genius-home-cards">
        <Card

          text={"Ventas del dia"}
          value={"$50.000.000"}
        />
        <Card  text={"Ingresos del dia"} value={"$1.999.000"} />
        <Card
          text={"Gastos del dia"}
          value={"$2.000.000"}
          />
          {/* <Card
            text={"Ganancias del dia"}
            value={"$2.000.000"}
          /> */}
      </div>
      <GeneralModal onClose={handleCloseModal} icon={"product"} isOpen={openModalDetail} 
      title={"Detalle de venta."} 
      layout={"Visualiza el detalle de esta venta."}  >
        <ModalDetail atributo={"cliente"} data={dataDetail} onClose={handleCloseModal} handleCloseAll={handleCloseModal} type={"salida"} />
      </GeneralModal>
    </div>
  );
}

export default Home;
