import Header from "../../../components/Header/Header"
import Table from "../../../components/Table/Table"
import './Home.css'
function Home() {
  return (
    // <div>Home</div>
    <>
    <Header title={"Home"}/>
    <span className="stock-genius-home-ultimas-ventas">Últimas ventas</span>
    <div className="stock-genius-home-container">
      <div className="stock-genius-home-table">
    <Table/>
      </div>
      <div className="stock-genius-home-cartas">

      </div>
    </div>
    </>
    
  )
}

export default Home