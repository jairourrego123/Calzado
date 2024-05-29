import React, { useCallback, useState } from 'react'
import './ReturnProduct.css'
import TableDetail from "../TableDetail/TableDetail"
import TableWithCheckbox from "../TableWithCheckbox/TableWithCheckbox"
function ReturnProduct({type,data}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = useCallback((rowIndex) => {
    console.log(rowIndex);
    setSelectedRows(rowIndex);
  }, []);
  const products = [
    { id: 1, estilo: 'Producto #1', cantidad: 5, price: 50000 },
    { id: 2, estilo: 'Producto #2', cantidad: 5, price: 50000 },
    { id: 3, estilo: 'Producto #3', cantidad: 5, price: 50000 },
  ];
  // if (!data.productos.length) return <h3>No se encuentran Productos</h3>;
  const columns = type === "salida" ? ["Estilo", "Cantidad", "Valor", "Total"] : type === "entrada" ? ["Estilo", "Cantidad"] : [];

  return (
    <div className='stock-genius-return-product'>
        <span className='stock-genius-sub-titles'>Productos</span>
        <span className='stock-genius-small-text'> Total de productos de la transacción</span>

      {/* <TableDetail columns={columns} data={data} type={type}/> */}
      <TableWithCheckbox data={data}  handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} excludedColumns={['id',"valor_cantidad","valor_venta_producto","ganancia_producto"]}/>
    </div>
  )
}

export default ReturnProduct;