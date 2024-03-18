import { useState } from 'react'
import './Search.css'


function Search({onSearch}) {
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que se recargue la página
    onSearch(search);
  };


  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="stock-genius-component-search">
          <img src={'../../assets/icons/search.svg'} alt='icono-buscar' className='stock-genius-component-search-icon-search' />
          <input 
            type="text" 
            placeholder="Buscar..."    
            className='stock-genius-component-search-input' 
            value={search} 
            onChange={handleChange} 
          />
          
            <img src={'../../assets/icons/arrow-right.svg'} alt='icono-flecha'  className="stock-genius-component-search-icon-arrow" onClick={handleSubmit}/>
         
        </div>
      </form>
    </div>
  );
}


export default Search