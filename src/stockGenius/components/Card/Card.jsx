import './Card.css'
function Card({ icon, text, value }) {
  return (
    <div className='stock-genius-home-card-content'>
      <div className="stock-genius-home-card-top">
        <img className="stock-genius-home-card-icon" src={`../../assets/icons/${icon}.svg`} alt={icon} />
        <span className='stock-genius-home-card-title'>{text}</span>
      </div>
      <span className='stock-genius-home-card-value'>{value}</span>
    </div>
  )
}

export default Card