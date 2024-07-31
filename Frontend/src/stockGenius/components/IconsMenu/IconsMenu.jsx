import './IconsMenu.css'
function IconsMenu({text}) {
  return (
    <div className="stock-genius-icons-menu">
      
    <img src={`/stock/assets/icons/${text.toLowerCase()}.svg`} alt={text.toLowerCase()}/>
    <label className='stock-genius-menu-label'>{text}</label>
    </div>
  )
}

export default IconsMenu