import React from 'react'
import './ModalReport.css'
import CardReports from '../CardReports/CardReports'
import {sum} from "../../helpers/sum"
import { formatPrice } from '../../helpers/formatPrice'
function ModalReport({data}) {
  
    console.log(data);
    
      
  return (
    <div className='stock-genius-modal-report-contianer'>

 
    <div className='stock-genius-modal-report-content-ventas'>
        <div className="stock-genius-modal-report-left-container">
            <div className='stock-genius-modal-report-header '>
                <span>Resumen del 17/05/2024</span>
                <span>Total transaccionado {formatPrice(sum(data?.ventas,"valor"))} </span>
            </div>
            <CardReports data={data?.ventas} atributo2={"valor"}/>
        </div>
        <div className="stock-genius-modal-report-right-container">

            <span className='stock-genius-modal-report-header '>Total de productos vendidos: {sum(data?.productos,"cantidad")}</span>
            <CardReports data={data?.productos} atributo2={"cantidad"}/>
        </div>

    </div>
    <div className='stock-genius-modal-report-content-abonos-gastos'>
    <span className='stock-genius-modal-report-header '>Total Vendido $1.000.000</span>
    <span className='stock-genius-modal-report-header '>Abonos $2.000.000</span>
    <span className='stock-genius-modal-report-header '>Gastos  $1.000.000</span>
    <span className='stock-genius-modal-report-header '>Ganancias  $1.000.000</span>


    </div>
    </div>
  )
}

export default ModalReport