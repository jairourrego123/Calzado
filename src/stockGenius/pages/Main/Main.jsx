import { useState } from 'react';
import Menu from '../../components/Menu/Menu'
import config from '../../const/config.json'
import RoutesPrivados from '../../routes/RoutesPrivados/RoutesPrivados'
import './Main.css'
import { useLocation } from 'react-router-dom';

function  Main() {

  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad

  // Función para cambiar la visibilidad al hacer clic
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const location = useLocation();
  let ruta = location.pathname.split('/')[3]
  ruta = ruta[0].toLocaleUpperCase() + ruta.slice(1)
  
 
  return (
    <div className='stock-genius-container'style={{backgroundColor:config.backgroundMenu}}>
      <div className='stock-genius-content-container-menu' style={{backgroundColor:config.backgroundMenu}}>
        <div className="stock-genius-container-menu-movil" style={{backgroundColor:config.backgroundMenu}}>

        <img src={`../../assets/icons/menu.svg`} onClick={toggleVisibility} alt="menu" width={35}/>
        <h2 className='stock-genius-title-menu'>{ruta}</h2>
        </div>
        <div className='stock-genius-menu-container'  style={{backgroundColor:config.backgroundMenu ,display: isVisible? "" : "none"}} ><Menu /></div>
      </div>
      <div className='stock-genius-content-container' style={{backgroundColor:config.backgroundPrincipal}}><RoutesPrivados/></div>

    </div>
  )
}

export default Main