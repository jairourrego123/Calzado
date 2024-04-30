import './IconsMenu.css'
function IconsMenu({text}) {
  return (
    <div className="stock-genius-icons-menu">
      
    <img src={`/assets/icons/${text.toLowerCase()}.svg`} alt={text.toLowerCase()}/>
    <label>{text}</label>
    </div>
  )
}

export default IconsMenu