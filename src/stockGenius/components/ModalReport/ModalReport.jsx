import React from 'react'
import './ModalReport.css'
import CardReports from '../CardReports/CardReports'
import {sum} from "../../helpers/sum"
import { formatPrice } from '../../helpers/formatPrice'
function ModalReport({data}) {
  
    
    
      
  return (
    <div className='stock-genius-modal-report-contianer'>
        <div className="stock-genius-modal-report-left-container">
            <div className='stock-genius-modal-report-header '>
                <span>Resumen del 17/05/2024</span>
                <span>Total transaccionado {formatPrice(sum(data?.movimientos,"valor"))} </span>
            </div>
            <CardReports data={data?.movimientos} atributo2={"valor"}/>
        </div>
        <div className="stock-genius-modal-report-right-container">

            <span className='stock-genius-modal-report-header '>Total de productos vendidos: {sum(data?.productos,"cantidad")}</span>
            <CardReports data={data?.productos} atributo2={"cantidad"}/>
        </div>

    </div>
  )
}

export default ModalReport