import { formatPrice}from '../../helpers/formatPrice'
import './TotalsSection.css'
function TotalsSection({totalGeneral,totalPagado}) {

  return (
    <div className='stock-genius-totals-section'>
    <div className='stock-genius-totals-section-total-general stock-genius-body'>
      <span>Total General</span>
      <span className='stock-genius-titles'>{formatPrice(totalGeneral)}</span>
    </div>
    <div className='stock-genius-totals-section-total-pagado stock-genius-body'>
      <span>Total Pagado</span>
      <span className='stock-genius-titles'>{formatPrice(totalPagado)}</span>
    </div>
  </div>
  )
}

export default TotalsSection