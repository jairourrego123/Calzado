import React from 'react'
import { formatPrice}from '../../helpers/formatPrice'

function Totals({value}) {
  return (
    <div >
        <span >TOTAL :</span>
        <span className='stock-genius-titles'>{formatPrice(value)}</span>
    </div>
  )
}

export default Totals