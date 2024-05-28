import './SectionReturn.css'
import { formatPrice } from '../../../helpers/formatPrice'

function SectionReturn({devolucion,subtotalDevolucion,type}) {
  return (
    <>
      <tr className='stock-genius-row-linea-gris'>
          <td colSpan="4">
         <hr className="stock-genius-detail-linea-gris" />
          </td>
        </tr>
         <span >Devoluciones</span>
         {devolucion.map(row => (
          <tr key={row.id}>
            <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
            <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
            {type === "salida" && (
              <>
                <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row?.valor_venta_producto)}</td>
                <td data-label={"Total"} style={{ textAlign: 'right' }} className={'stock-genius-table-row'}>{formatPrice(row?.cantidad * row?.valor_venta_producto)}</td>
              </>

            )
            }
          </tr>
        ))}
         <tr>
            <td colSpan="3" style={{ textAlign: 'left' }}>Subtotal</td>
            <td style={{ textAlign: 'right' }}>{formatPrice(subtotalDevolucion)}</td>
         </tr>
    </>
  )
}

export default SectionReturn