import Card from "../../../components/Card/Card";
import Header from "../../../components/Header/Header";
import Table from "../../../components/Table/Table";
import config from '../../../const/config.json'

import "./Home.css";
function Home() {
  const data = [
    {
      "id": 1,
      "comprador": "Juan Pérez",
      "cantidad": 5,
      "precio": 100.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "comprador": "María García",
      "cantidad": 10,
      "precio": 75.25,
      "estado": false,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "precio": 150.75,
      "estado": true,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "comprador": "Ana López",
      "cantidad": 8,
      "precio": 200.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "precio": 50.00,
      "estado": true,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "precio": 300.50,
      "estado": false,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "comprador": "David Fernández",
      "cantidad": 7,
      "precio": 120.75,
      "estado": true,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "precio": 90.00,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "precio": 180.25,
      "estado": true,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "precio": 210.00,
      "estado": false,
      "fecha": "2024-03-24"
    }
];
const handleViewMovimineto = (id)=>{
  alert("Detalles Venta")
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
        <Card

          text={"Ganancias del dia"}
          value={"$2.000.000"}
        />
        <Card  text={"Abonos del dia"} value={"$1.999.000"} />
      </div>
    </div>
  );
}

export default Home;
