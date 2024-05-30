import { useState } from "react";
import { formatPrice } from "../../helpers/formatPrice";
import SectionReturn from "./SectionReturn/SectionReturn";
import './TableDetail.css';

function TableDetail({ columns, data, subtotal, type, devolucion = [], subtotalDevolucion = 0,selectedTab }) {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleSelect = (id) => {
    setSelectedRowId((prev)=>
       prev === id ? null:id
    );
  };
  return (
    <table className='stock-genius-table-detail'>
      <thead>
        <tr>
          {selectedTab === 2 && <th></th>}
          {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
          {selectedTab === 2 &&
              <td>
                <input
                  type="checkbox"
                  checked={selectedRowId === row.id}
                  onChange={() => handleSelect(row.id)}
                />
              </td>
            }
            <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'}>{row.estilo} {row.color} x{row.talla}</td>
            <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
            {type === "salida" && (
              <>
                <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row?.valor_venta_producto)}</td>
                <td data-label={"Total"} style={{ textAlign: 'right' }} className={'stock-genius-table-row'}>{formatPrice(row?.cantidad * row?.valor_venta_producto)}</td>
              </>
            )}
          </tr>
        ))}

        {type === "salida" &&
          <tr>
            {selectedTab === 2 &&<td></td>}
            <td colSpan="3" style={{ textAlign: 'left' }}>Subtotal</td>
            <td style={{ textAlign: 'right' }}>{formatPrice(subtotal)}</td>
          </tr>
        }
        {devolucion.length !== 0 && <SectionReturn devolucion={devolucion} subtotalDevolucion={subtotalDevolucion} type={type} selectedTab={selectedTab}/>}
      </tbody>
    </table>
  );
}

export default TableDetail;
