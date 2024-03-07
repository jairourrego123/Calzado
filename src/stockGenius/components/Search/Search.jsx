import './Search.css'

function Search() {
  return (
    <div className="stock-genius-component-search">
      <img src={'../../assets/icons/search.svg'} alt='icono-buscar' className='stock-genius-component-search-icon-search'/>
      <input type="text" placeholder="Buscar..."  className='stock-genius-component-search-input'/>
      <img src={'../../assets/icons/arrow-right.svg'} alt='icono-flecha' className='stock-genius-component-search-icon-arrow'/>
    </div>
  )
}

export default Search