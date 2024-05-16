import FormatPrice from "../Utilities/FormatPrice"
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
          <td data-label={"Valor"} className={'stock-genius-table-row'}>{FormatPrice(row.valor_fabricacion)}</td>
          <td data-label={"Total"} style={{ textAlign: 'right' }} className={'stock-genius-table-row'}>{FormatPrice(row.cantidad * row.valor_fabricacion)}</td>
        </tr>
      ))}
      <tr>
        <td colSpan="3" style={{ textAlign: 'left' }}>Subtotal</td>
        <td style={{ textAlign: 'right' }}>{FormatPrice(subtotal)}</td>
      </tr>
    </tbody>
  </table>
  )
}

export default TableDetail