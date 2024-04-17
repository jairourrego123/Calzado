import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './SelectedProducts.css';

function SelectedProducts({ products = [], handleEliminarProducto }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);



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

  if (Object.keys(products).length === 0) return <h2>Selecciona los productos que quieres agregar a la venta</h2>;

  const columns = ["Estilo", "Color", "Talla", "Cantidad", "Valor"];

  return (
    <div className='stock-genius-component-container-'>
      <form onSubmit={handleSubmit}>
        <table className='stock-genius-component-table'>
          <thead>
            <tr>
              {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map((row) => (
              <tr key={row.id}>
                <td data-label={"Estilo"} className={'stock-genius-table-row'}>{row.estilo}</td>
                <td data-label={"Color"} className={'stock-genius-table-row'}>{row.color}</td>
                <td data-label={"Talla"} className={'stock-genius-table-row'}>{row.talla}</td>
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
                  />
                </td>
                <td data-label={"Valor"} className={'stock-genius-table-row'}>
                  <input
                    type='number'
                    className='small-input'
                    placeholder={row.precio}
                    name={`valor-${row.id}`}
                    required
                  />
                </td>
                <td data-label={"Accion"} className={'stock-genius-table-row'} onClick={() => handleEliminarProducto(row)}>
                  <Icon icon={"eliminar"}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default SelectedProducts;
