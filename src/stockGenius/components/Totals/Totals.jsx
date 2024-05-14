import React from 'react'
import FormatPrice from '../Utilities/FormatPrice'

function Totals({value}) {
  return (
    <div >
        <span >TOTAL :</span>
        <span className='stock-genius-titles'>{FormatPrice(value)}</span>
    </div>
  )
}

export default Totals