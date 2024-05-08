import React from 'react'
import FormatPrice from '../Utilities/FormatPrice'

function Totals({value}) {
  return (
    <div >
        <h2>TOTAL :</h2>
        <h2 className='stock-genius-titles'>{FormatPrice(value)}</h2>
    </div>
  )
}

export default Totals