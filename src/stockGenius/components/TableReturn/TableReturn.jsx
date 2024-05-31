import { formatPrice } from "../../helpers/formatPrice"
import {ReactComponent as Delete} from "../../../assets/icons/eliminar.svg"
import './TableReturn.css'
function TableReturn({returnProducts,setReturnProducts}) {
  const columns=["Estilo","Cantidad","Valor","Total","Motivo","Descripcion"]
  const handleDeleteReturn = (index)=>{

    
    const result  = returnProducts.slice(0, index).concat(returnProducts.slice(index + 1));

    setReturnProducts(result)
  }
  return (
    <table className='stock-genius-table-detail'>
    <thead>
      <tr>
        {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
      </tr>
    </thead>
    <tbody>
      {returnProducts.map((row,index) => (
        <tr key={index}>
          <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
          <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
          <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row.valor)}</td>
          <td data-label={"Total"} className={'stock-genius-table-row'}>{formatPrice(row.valor * row.cantidad)}</td>
          <td data-label={"Motivo"} className={'stock-genius-table-row'}>{row.motivo}</td>
          <td data-label={"Descripción"} className={'stock-genius-table-row'}>{row.descripcion}</td>
          <td><Delete className="stock-genius-click stock-genius-icon-delete " onClick={()=>handleDeleteReturn(index)}/></td>
        </tr>
      ))}

    </tbody>
  </table>
  )
}

export default TableReturn