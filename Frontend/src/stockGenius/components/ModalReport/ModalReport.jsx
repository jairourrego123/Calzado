import React, { useContext } from 'react'
import './ModalReport.css'
import CardReports from '../CardReports/CardReports'
import {sum} from "../../helpers/sum"
import { formatPrice } from '../../helpers/formatPrice'
import ButtonsModal from "../ButtonsModal/ButtonsModal"
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert'
import { updateCierre } from '../../services/finanzas/financeService'
function ModalReport({data,onClose,setLoadData}) {
    
    const {rol} = JSON.parse(localStorage.getItem("usuario"))
    console.log("rol de la persona",rol);

    const UpdateAnalisis=async()=>{
        try {
            const response = await updateCierre(data?.id,{estado:true})
            return response
           } catch (error) {
            throw new Error('Error al traer analisis del dia ');
           }
    }
    const handleReport = (e)=>{
        e.preventDefault();
        SweetAlertConfirm("¡No podrá revertir esto!")
        .then(async (result)=>{
          if (result.isConfirmed) {
              try {
                await UpdateAnalisis()
                setLoadData((e)=>!e)
                SweetAlertMessage("Confirmado","Haz aprobado  correctamente.","success")
                onClose()
              } catch (error) {
                console.error(error);
              }
             
          }
          
      
          
      })
    }
      console.log("data reporte",data);
  return (
    <div className='stock-genius-modal-report-contianer'>

 
    <div className='stock-genius-modal-report-content-ventas'>
        <div className="stock-genius-modal-report-left-container">
            <div className='stock-genius-modal-report-header '>
                <span>Resumen del { new Date(data.fecha).toLocaleDateString()}</span>
                {/* <span>Total transaccionado {formatPrice(sum(data?.ventas,"valor"))} </span> */}
            </div>
            <span className='stock-genius-body'>Valor de ventas registradas:</span>
            <CardReports data={data?.ventas_por_metodo_pago} atributo2={"ventas"}/>
        </div>
        <div className="stock-genius-modal-report-right-container">

            <span className='stock-genius-modal-report-header '>Total de productos vendidos: {data.total_productos_vendidos}</span>
            <CardReports data={data?.productos} atributo2={"productos"}/>
        </div>

    </div>
    <div className='stock-genius-modal-report-content-abonos-gastos'>
    <span className='stock-genius-modal-report-header '>Abonos a ventas: {formatPrice(data?.abonos_ventas)}</span>
    <span className='stock-genius-modal-report-header '>Abonos a entradas: {formatPrice(data?.abonos_entradas)}</span>
    <span className='stock-genius-modal-report-header '>Gastos: {formatPrice(data?.total_gastos)}</span>
    <span className='stock-genius-modal-report-header '>Devoluciones de entradas: {formatPrice(data?.total_devoluciones_entradas)}</span>
    <span className='stock-genius-modal-report-header '>Devoluciones de ventas: {formatPrice(data?.total_devoluciones_ventas)}</span>
    <span className='stock-genius-modal-report-header '>Transferencias externas: {formatPrice(data?.transferencias_externas)}</span>
    </div>
    <div className='stock-genius-modal-report-content-abonos-gastos'>
    <span className='stock-genius-modal-report-totales-generales '>Total venta {formatPrice(data?.total_vendido)}</span>
    <span className='stock-genius-modal-report-totales-generales '>Ganancias:  {formatPrice(data?.total_ganancias)}</span>

    </div>
    {rol==="Administrador" && !data?.estado&&
    <form onSubmit={handleReport}>

    <ButtonsModal onClose={onClose} titleButton='Aprobar'/>
    </form>
}
    </div>
  )
}

export default ModalReport