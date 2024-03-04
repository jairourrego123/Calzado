import Card from '../../../components/Card/Card'
import Header from '../../../components/Header/Header'
import Table from '../../../components/Table/Table'
import './Home.css'
function Home() {
  const data = [{ "comprador": "jairo Miller  Urrego", "cantidad": "20", "precio": "120.000", "fecha": "10/03/2024" }, { "comprador": "jairo Miller  Urrego", "cantidad": "20", "precio": "120.000", "fecha": "10/03/2024" }, { "comprador": "jairo Miller  Urrego", "cantidad": "20", "precio": "120.000", "fecha": "10/03/2024" }, { "comprador": "jairo Miller  Urrego", "cantidad": "20", "precio": "120.000", "fecha": "10/03/2024" }]

  return (
    <div className='stock-genius-home-container'>
      <div className='stock-genius-home-header'><Header title={"Home"} /></div>

      <span className="stock-genius-home-layout">Últimas ventas</span>
      <div className='stock-genius-home-table'><Table data={data} /></div>
      <div className='stock-genius-home-cards'>
        <Card icon={"cash-card"} text={"Ventas del dia"} value={"$50.000.000"} />
        <Card icon={"cash-card"} text={"Ganancias del dia"} value={"$2.000.000"} />
        <Card icon={"cash-card"} text={"Abonos del dia"} value={"$1.999.000"} />
      </div>
    </div>
  )
}

export default Home