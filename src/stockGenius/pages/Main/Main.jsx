import Menu from '../../components/Menu/Menu'
import config from '../../const/config.json'
import RoutesPrivados from '../../routes/RoutesPrivados/RoutesPrivados'
import './Main.css'
function  Main() {
  return (
    <div className='stock-genius-container'style={{backgroundColor:config.backgroundPrincipal}}>
      <div className='stock-genius-content-container-menu' style={{backgroundColor:config.backgroundMenu}}>
        <img className='stock-genius-content-container-menu-hamgurger' src={`../../assets/icons/menu.svg`} alt="menu" />
        <div className='stock-genius-menu-container' ><Menu /></div>
      </div>
      <div className='stock-genius-content-container'><RoutesPrivados/></div>

    </div>
  )
}

export default Main