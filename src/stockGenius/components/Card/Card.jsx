import './Card.css'
import { ReactComponent as IconCard } from "../../../assets/icons/cash-card.svg"

function Card({text, value }) {
  return (
    <div className='stock-genius-home-card-content'>
      <div className="stock-genius-home-card-top">
      <IconCard className='stock-genius-home-card-icon'/>
        <span className='stock-genius-home-card-title stock-genius-sub-titles'>{text}</span>
      </div>
      <span className='stock-genius-home-card-value stock-genius-sub-titles'>{value}</span>
    </div>
  )
}

export default Card