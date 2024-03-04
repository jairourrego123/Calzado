import './Table.css'
function Table({data,styles}) {

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }
  const columns = Object.keys(data[0]); // Obtiene las columnas a partir de las claves del primer objeto

  return (
    <table className='stock-genius-component-table'>
    <thead>
      <tr>
        {columns.map((column,index)=> <th key={index} scope='col'>{column}</th>)}
       
      </tr>
    </thead>
    <tbody>
    {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} data-label={column}>{row[column]}</td>
            ))}
          </tr>))}

    </tbody>
  </table>
  )
}

export default Table