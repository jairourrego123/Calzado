import './Card.css'
import { ReactComponent as IconCard } from "../../../assets/icons/cash-card.svg"
import { Link } from 'react-router-dom'
import config from '../../const/config.json'

function Card({text, value,rute }) {
  return (
    <div className='stock-genius-home-card-content'>
      <div className="stock-genius-home-card-top">
      <IconCard className='stock-genius-home-card-icon'/>
      <Link className='stock-genius-click' to={`${config.routerPrincipal}/main/${rute}`} >

        <span className='stock-genius-home-card-title stock-genius-sub-titles'>{text}</span>
        </Link>
      </div>
      <span className='stock-genius-home-card-value stock-genius-sub-titles'>{value}</span>
    </div>
  )
}

export default Card