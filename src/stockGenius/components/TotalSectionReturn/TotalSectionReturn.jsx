import React from 'react'
import { formatPrice } from '../../helpers/formatPrice'

function TotalSectionReturn({totalGeneral,totalDevolucion}) {
  return (
    <div className='stock-genius-totals-section'>
    <div className='stock-genius-totals-general-y-pagado'>

    
    <div className='stock-genius-totals-section-total-general stock-genius-body'>
    <span>Total General</span>
    <span className='stock-genius-titles'>{formatPrice(totalGeneral)}</span>
  </div>
  <div className='stock-genius-totals-section-total-pagado stock-genius-body'>
    <span>Devolución Total</span>
    <span className='stock-genius-titles'>{formatPrice(totalDevolucion)}</span>
  </div>
  </div>
  <div className='stock-genius-totalss-faltantante stock-genius-body'>
    <span>Total a Pagar</span>
    <span className='stock-genius-titles'>{formatPrice(totalGeneral-totalDevolucion)}</span>
  </div>
</div>
  )
}

export default TotalSectionReturn