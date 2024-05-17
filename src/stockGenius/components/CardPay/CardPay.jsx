import { formatPrice}from '../../helpers/formatPrice'
import './CardPay.css'
import {ReactComponent as CloseIcon} from '../../../assets/icons/close.svg'
function CardPay({pays,handleDeletePay}) {


  return (
    
    <>
        {pays?.map(pay=>(
          <div key={pays.id} className='stock-genius-card-pay stock-genius-body'>

          <div className='stock-genius-card-pay-metodo '>
          <span>{pays.nombre} - {pays.fecha} </span>
           {pays.metodo_id && <CloseIcon className='stock-genius-click' onClick={handleDeletePay}/> }
          </div>
         
           
              {/* {pagos.map(pago=>(
                  <div className='stock-genius-card-pay-pago'>
                   <span >Pago Individual</span>
                   <span >{formatPrice(pago.valor)}</span>
                  </div>   
              ) )} */}
          
          <div className='stock-genius-card-pay-total '>
              <span >Total Individual </span>
              <span className='stock-genius-sub-titles'>{formatPrice(pays.valor)}</span>
          </div>
          </div>
        ))}
    </>
  
    

    
    
 
  )
}

export default CardPay