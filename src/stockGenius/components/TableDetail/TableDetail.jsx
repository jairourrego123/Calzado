import { formatPrice}from "../../helpers/formatPrice"
import './TableDetail.css'
function TableDetail({ columns, data, subtotal }) {

  return (
    <table className='stock-genius-table-detail'>
    <thead>
      <tr>
        {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(row => (
        <tr key={row.id}>
          <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
          <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
          <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row.valor_venta_producto)}</td>
          <td data-label={"Total"} style={{ textAlign: 'right' }} className={'stock-genius-table-row'}>{formatPrice(row.cantidad * row.valor_venta_producto)}</td>
        </tr>
      ))}



      <tr>
        <td colSpan="3" style={{ textAlign: 'left' }}>Subtotal</td>
        <td style={{ textAlign: 'right' }}>{formatPrice(subtotal)}</td>
      </tr>
    </tbody>
  </table>
  )
}

export default TableDetail