import FormatPrice from '../Utilities/FormatPrice'
import './CardPay.css'

function CardPay({transacciones}) {

    console.log(transacciones);
  return (
    
    <>
        {transacciones?.map(transaccion=>(
          <div key={transaccion.id} className='stock-genius-card-pay stock-genius-body'>

  
          <span className='stock-genius-card-pay-metodo '>{transaccion.nombre} - {transaccion.fecha} </span>
         
           
              {/* {pagos.map(pago=>(
                  <div className='stock-genius-card-pay-pago'>
                   <span >Pago Individual</span>
                   <span >{FormatPrice(pago.valor)}</span>
                  </div>   
              ) )} */}
          
          <div className='stock-genius-card-pay-total '>
              <span >Total Individual </span>
              <span className='stock-genius-sub-titles'>{FormatPrice(transaccion.valor)}</span>
          </div>
          </div>
        ))}
    </>
  
    

    
    
 
  )
}

export default CardPay