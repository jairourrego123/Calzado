import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { getResumenFinanciero } from '../../services/data/dataService'
import { formatPrice } from '../../helpers/formatPrice'
import './ModalFinancialSummary.css'
function ModalFinancialSummary() {
    const [data,setData]=useState([])

    const GetInfoResumen= async()=>{
        const response = await getResumenFinanciero()
        setData(response)
    }
    useEffect(() => {
      
        GetInfoResumen()
     
    },[])
    

  return (
    <div className='stock-genius-modal-resumen-financiero'>
    <Table columns={["item","valor"]} columns_decimals={["valor"]} data={data?.items} />
    <br/>
    <span >Total capital de trabajo</span>
    <span className='stock-genius-titles'>{formatPrice(data?.total)}</span>
    </div>
  )
}

export default ModalFinancialSummary