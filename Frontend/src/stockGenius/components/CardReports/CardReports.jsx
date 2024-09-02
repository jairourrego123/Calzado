import React from 'react'
import './CardReports.css'
import { formatPrice } from '../../helpers/formatPrice'
function CardReports({data,atributo2,visible}) {
  return (

    visible && <div className='stock-genius-card-report-container' >

        {
        
        atributo2==="ventas" ?
        data.map((data,index)=>(
            <div className='stock-genius-card-report' key={index}>
            <span>{data?.nombre}</span>
            <span>{formatPrice(data?.valor)}</span>
            </div>
        ))
        :
        atributo2==="metodos" ?
        data.map((data,index)=>(
            <div className='stock-genius-card-report' key={index}>
            <span>{data?.nombre}</span>
            <span>{formatPrice(data?.saldo_actual)}</span>
            </div>
        ))
        :
        data.map((data,index)=>(
          <div className='stock-genius-card-report' key={index}>
          <span>{data?.producto__estilo} {data?.producto__color} x{data?.producto__talla}</span>
          <span>{data?.cantidad_vendida}Und</span>
          </div>
      ))
        }
    </div>
  )
}

export default CardReports