import React from 'react';
import './TableWithCheckbox.css';
import { formatPrice}from '../../helpers/formatPrice';

function TableWithCheckbox({ data, handleDoubleClick = undefined, selectedRows, handleCheckboxChange, excludedColumns,columns=[] }) {


  // Función para renderizar la tabla
  return (
    <div className='stock-genius-component-container-table'>
      <table className='stock-genius-component-table'>
        <thead>
          <tr>
            <th className='stock-genius-component-table-column-check'>Item</th>
            {columns.map((column, index) => (
              <th key={index} scope='col'>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} onDoubleClick={handleDoubleClick && (() => handleDoubleClick(row.id)) } onClick={() => handleCheckboxChange(row)} className={`stock-genius-component-table-check-box ${selectedRows.includes(row) ? 'stock-genius-table-check' : 'stock-genius-table-incheck'}`}>
              {/* Checkbox */}
              <td className='stock-genius-component-table-column-check' >
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(row)}
                  checked={selectedRows.includes(row)}
                />
              </td>

              {/* Datos de la fila */}
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} data-label={column} className={column === 'estado' ? (row[column] === true ? 'stock-genius-table-disponible' : 'stock-genius-table-no-disponible') : ''}>
                  {row[column] === true ? "En Stock" : row[column] === false ? "Fuera de Stock":  column==="valor"?formatPrice(row[column]):row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableWithCheckbox;
