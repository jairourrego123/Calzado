import './CardClientes.css'
import {ReactComponent as Cliente} from '../../../../../assets/icons/cliente.svg'
import {ReactComponent as Proveedor} from '../../../../../assets/icons/proveedor.svg'
function CardClientes({clientes,selected}) {

    
  return (
   <>
   <div className="stock-genius-card-client-container"> 
    
       
        { clientes.map((cliente)=>(
            <div className="stock-genius-card-client-content" key={cliente.id} >
                {cliente.estado&&<span className="stock-genius-card-client-debe" >Debe</span>}
                {selected == "Clientes"? <Cliente/>:<Proveedor/>}
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