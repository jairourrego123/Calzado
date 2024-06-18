import { formatPrice}from '../../helpers/formatPrice';
import './Table.css'
function Table({ data=[], styles,handleDoubleClick, columns=[] }) {

    
 
  console.log(data);
  
  return (
    <div className='stock-genius-component-container-table'>
      <table className='stock-genius-component-table'>
        <thead>
          <tr>
            {columns.map((column, index) => column==='id'?'':<th key={index} scope='col'>{column.replace("_"," ")}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length === 0 ?  <h2>Sin Resultados</h2> : data.map((row) => (
            <tr key={row.id} onDoubleClick={handleDoubleClick && (()=>handleDoubleClick(row))}>
              {columns.map((column, columnIndex) => (
                 <td key={columnIndex} data-label={column} className={column === 'estado' ? (row[column] === true ? 'stock-genius-table-disponible' : 'stock-genius-table-no-disponible') : ''}>
                {row[column]===true?"Completo":row[column]===false?"Pendiente":  column==="valor_neto"||column==="ganancia"?formatPrice(row[column]):row[column]}
                </td>
              ))}
            </tr>))}

        </tbody>
      </table>
    </div>
  )
}

export default Table