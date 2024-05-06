import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './SelectedProducts.css';
import FormatPrice from '../Utilities/FormatPrice';

function SelectedProducts({ products = [], handleEliminarProducto }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [valores,setValores]= useState({})
  const [totals, setTotals] = useState({});

  const calcularTotal = (id, cantidad, valor) => {
    const total = (cantidad || 0) * (parseInt(valor?.replace(/[$\.]/g, '')) || 0);
    setTotals((prevTotals) => ({ ...prevTotals, [id]: FormatPrice(total) }));
  };
  const handleCambiarCantidades=(e,id)=>{
    calcularTotal(id,e.target.value,valores[id])
  }
  const handleCambiarValores=(e,id)=>{
    console.log((e.target.value));
    setValores((prevValores) => ({ ...prevValores, [id]: FormatPrice(e.target.value) }))
    calcularTotal(id,parseInt(e.target.parentNode.previousSibling.firstChild.value),e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Crear el array de objetos con los productos seleccionados y sus cantidades/valores
    const productos = products.map((producto) => ({
      id: producto.id,
      cantidad: e.target[`cantidad-${producto.id}`].value,
      valor: e.target[`valor-${producto.id}`].value,
    }));
    setProductosSeleccionados(productos);
    console.log(productos); // Aquí puedes hacer lo que necesites con los datos de los productos
  };

  if (Object.keys(products).length === 0) return <h3>Selecciona los productos que quieres agregar a la venta</h3>;

  const columns = ["Estilo", "Cantidad", "Valor","Total"];
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className='stock-genius-component-table stock-genius-selected-products'>
          <thead>
            <tr>
              {columns.map((column, index) => <th  key={index} scope='col' >{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map((row) => (
              <tr key={row.id}>
                <td data-label={"Estilo"}   className={'stock-genius-table-row'} >{row.estilo} {row.color} x{row.talla} </td>
               
                <td data-label={"Cantidad"} className={'stock-genius-table-row'}>
                  <input
                    type='number'
                    autoFocus
                    className='small-input'
                    placeholder={row.cantidad}
                    name={`cantidad-${row.id}`}
                    required
                    max={row.cantidad}
                    min={0}
                    onChange={(e)=>handleCambiarCantidades(e,row.id)}
                  />
                </td>
                <td data-label={"Valor"} className={'stock-genius-table-row'}>
                  <input
                    type='text'
                    className='small-input'
                    placeholder={row.precio}
                    name={`valor-${row.id}`}
                    value={valores[row.id]}
                    onChange={(e)=>handleCambiarValores(e,row.id)}
                    required
                    
                  />
                </td>
                <td data-label={"Total"} className={'stock-genius-table-row'}>{totals[row.id]}</td>

                <td data-label={"Accion"} className={'stock-genius-table-row'} onClick={() => handleEliminarProducto(row)}>
                  <Icon icon={"eliminar"}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default SelectedProducts;
