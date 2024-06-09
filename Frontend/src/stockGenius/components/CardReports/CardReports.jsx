import React from 'react'
import './CardReports.css'
import { formatPrice } from '../../helpers/formatPrice'
function CardReports({data,atributo2}) {
  return (
    <div className='stock-genius-card-report-container'>
        {data.map((data,index)=>(
            <div className='stock-genius-card-report' key={index}>
            <span>{data.nombre}</span>
            <span>{atributo2==="valor"?formatPrice(data.valor):data[atributo2]+"Und"}</span>
            </div>
        ))}
    </div>
  )
}

export default CardReports