import './CardClientes.css'
function CardClientes({clientes}) {
  
    
  return (
   <>
   <div className="stock-genius-card-client-container"> 
    
       
        { clientes.map((cliente)=>(
            <div className="stock-genius-card-client-content" >
                 {cliente.estado&&<span className="stock-genius-card-client-debe" >Debe</span>}
                <img src="../../assets/icons/person.svg" alt="Icono-cliente" className='stock-genius-card-client-image' />
                <hr className="lineaNegra" /> {/* Aplica la clase CSS 'lineaNegra' */}
                <span className="stock-genius-card-client-text">{cliente.nombre}</span>
                <span className="stock-genius-card-client-text">{cliente.lugar}</span>
                <span className="stock-genius-card-client-text">{cliente.numero_contacto}</span>
          
            </div>
            ))}
   
    </div>
    </> 
  )
}

export default CardClientes