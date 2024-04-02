

function TableListProductsSelected({ data, handleDoubleClick, selectedRows, handleCheckboxChange, excludedColumns }) {
    if (Object.keys(data).length === 0) return ""

    // Obtener las columnas de la tabla excluyendo las columnas especificadas
    const columns = ["estilo", "talla","cant","valor"]

    // Función para renderizar la tabla
    return (
        <div className='stock-genius-component-container-table'>
            <table className='stock-genius-component-table'>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope='col'>{column}</th>
                        ))}
                    </tr>
                    
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} >

                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex} data-label={column}>
                                    {row[column]}
                                </td>
                            ))}
                            {/* <td  data-label={"cant"}>
                               <input value={""}/>
                            </td> */}
                            
                            <td className='stock-genius-component-table-column-check'>
                                <img src="../../assets/icons/eliminar.svg" />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableListProductsSelected;
