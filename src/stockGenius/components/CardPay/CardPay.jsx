import FormatPrice from '../Utilities/FormatPrice'
import './CardPay.css'

function CardPay({metodo,pagos,total}) {

  return (
    <div className='stock-genius-card-pay'>
    <span className='stock-genius-card-pay-metodo'>{metodo}- <span>12/05/2024</span></span>
   
     
        {pagos.map(pago=>(
            <div className='stock-genius-card-pay-pago'>
             <span>Pago Individual</span>
             <span>{FormatPrice(pago.valor)}</span>
            </div>   
        ) )}
    
    <div className='stock-genius-card-pay-total'>
        <span>Total Individual</span>
        <span>{FormatPrice(120000)}</span>
    </div>

    
    
    </div>
  )
}

export default CardPay