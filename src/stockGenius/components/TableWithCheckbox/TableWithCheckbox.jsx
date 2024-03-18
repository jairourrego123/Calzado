import './TableWithCheckbox.css'
function TableWithCheckbox({ data,handleDoubleClick , selectedRows,handleCheckboxChange}) {




  if(Object.keys(data).length === 0) return <h2>Sin Resultados</h2>
  // Obtener las columnas de la tabla
  const columns = Object.keys(data[0]);
  // Función para renderizar la tabla
  return (
    <div className='stock-genius-component-container-table'>
      <table className='stock-genius-component-table '>
        <thead>
          <tr>
            <th className='stock-genius-component-table-column-check'>Item</th> 
            {columns.map((column, index) => column==='id'?'':<th key={index} scope='col'>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} onDoubleClick={()=>handleDoubleClick(row.id)} onClick={()=>handleCheckboxChange(row.id)} className={`stock-genius-component-table-check-box ${selectedRows.includes(row.id)?'stock-genius-table-check':'stock-genius-table-incheck'}`}>   
            {/* Checkbox */}
              <td className='stock-genius-component-table-column-check'>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(row.id)}
                  checked={selectedRows.includes(row.id)}
                />
              </td>
              
              {/* Datos de la fila */}
              {columns.map((column, columnIndex) => (
                column==='id'?'':
                <td key={columnIndex} data-label={column} className={column === 'estado' ? (row[column] === true ? 'table-check-box-disponible' : 'table-check-box-no-disponible') : ''}>
                {row[column]===true?"En Stock":row[column]===false?"Fuera de Stock":row[column]}
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
