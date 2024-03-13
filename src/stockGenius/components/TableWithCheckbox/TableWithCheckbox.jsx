import React, { useState } from 'react';
import './TableWithCheckbox.css'
function TableWithCheckbox({ data }) {
  // Estado para almacenar las filas seleccionadas
  const [selectedRows, setSelectedRows] = useState([]);

  // Manejar el cambio en el checkbox de una fila
  const handleCheckboxChange = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter(row => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };


  // Obtener las columnas de la tabla
  const columns = Object.keys(data[0]);
  // Función para renderizar la tabla
  return (
    <div className='stock-genius-component-container-table'>
      <table className='stock-genius-component-table '>
        <thead>
          <tr>
            <th className='stock-genius-component-table-column-check'>Seleccionar</th> 
            {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={()=>handleCheckboxChange(rowIndex)} className={`stock-genius-component-table-check-box ${selectedRows.includes(rowIndex)?'stock-genius-table-check':'stock-genius-table-incheck'}`}>   
            {/* Checkbox */}
              <td className='stock-genius-component-table-column-check'>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(rowIndex)}
                  checked={selectedRows.includes(rowIndex)}
                />
              </td>
              {/* Datos de la fila */}
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} data-label={column} className={column === 'disponible' ? (row[column] === '1' ? 'table-check-box-disponible' : 'table-check-box-no-disponible') : ''}>
                {row[column]}
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
