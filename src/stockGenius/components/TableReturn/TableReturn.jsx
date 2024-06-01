import { formatPrice } from "../../helpers/formatPrice"
import {ReactComponent as Delete} from "../../../assets/icons/eliminar.svg"
import './TableReturn.css'
import { SweetAlertConfirm, SweetAlertMessage } from "../SweetAlert/SweetAlert";
import { useCallback } from "react";
function TableReturn({returnProducts,setReturnProducts,returnSaved}) {
  const columns=["Estilo","Cantidad","Valor","Total","Motivo","Descripcion","Fecha"]


    const  handleDeleteReturn = useCallback((index) => {
      SweetAlertConfirm("¡No podrás revertir esta devolución!")
        .then((result) => {
          if (result.isConfirmed) {
            const result  = returnProducts.slice(0, index).concat(returnProducts.slice(index + 1));
            setReturnProducts(result)
          } else if (result.dismiss === 'cancel') {
            SweetAlertMessage("Cancelado", "No se ha eliminado la devolución", "error");
          }
        });
    }, [returnProducts,setReturnProducts]);

  
  return (
    <table className='stock-genius-table-detail'>
    <thead>
      <tr>
        {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
      </tr>
    </thead>
    <tbody>
      {returnSaved.length>0&& returnSaved.map((row,index) => (
        <tr key={index}>
          <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
          <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
          <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row.valor_venta_producto)}</td>
          <td data-label={"Total"} className={'stock-genius-table-row'}>{formatPrice(row.total)}</td>
          <td data-label={"Motivo"} className={'stock-genius-table-row'}>{row.motivo}</td>
          <td data-label={"Descripción"} className={'stock-genius-table-row'}>{row.descripcion}</td>
          <td data-label={"Fecha"} className={'stock-genius-table-row'}>{row.fecha}</td>
        </tr>
      ))}
      {returnProducts.map((row,index) => (
        <tr key={index}>
          <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
          <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
          <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row.valor_venta_producto)}</td>
          <td data-label={"Total"} className={'stock-genius-table-row'}>{formatPrice(row.total)}</td>
          <td data-label={"Motivo"} className={'stock-genius-table-row'}>{row.motivo}</td>
          <td data-label={"Descripción"} className={'stock-genius-table-row'}>{row.descripcion}</td>
          <td data-label={"Fecha"} className={'stock-genius-table-row'}>{row.fecha}</td>
          <td><Delete className="stock-genius-click stock-genius-icon-delete " onClick={()=>handleDeleteReturn(index)}/></td>
        </tr>
      ))}

    </tbody>
  </table>
  )
}

export default TableReturn