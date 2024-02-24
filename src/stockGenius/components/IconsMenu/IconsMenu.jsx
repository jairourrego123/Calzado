import './IconsMenu.css'
function IconsMenu({text}) {
  return (
    <div className="stock-genius-icons-menu">
      
    <img src={`../assets/icons/${text.toLowerCase()}.svg`}/>
    <label>{text}</label>
    </div>
  )
}

export default IconsMenu