import './SelectedProductsSale.css';
import { formatPrice}from '../../helpers/formatPrice';

function SelectedProducts({ products = [], handleEliminarProducto,setVentaProductos,ventaProductos,selectedTab}) {

  
  const handleCambiarCantidades = (e, id) => {
    const { value } = e.target;
  setVentaProductos(prevVentaProductos => ({
    ...prevVentaProductos,
    [id]: {
      ...prevVentaProductos[id],
      cantidad: value,
      total:value*prevVentaProductos[id]?.valor_venta_producto || 0
    }
  }));
  }
  const handleCambiarValores = (e, id) => {
    const {value} = e.target;
    const valor  =(parseInt(value.replace(/[$.]/g, '')) || 0 );
    setVentaProductos(prevVentaProductos => ({
      ...prevVentaProductos,
      [id]: {
        ...prevVentaProductos[id],
        valor_venta_producto: valor,
        moneda:formatPrice(valor),
        total:prevVentaProductos[id]?.cantidad*valor || 0
      }
    }));
      
   
  }

  if (!products.length) return <h5>Selecciona los productos que quieres agregar a la venta</h5>;

  const columns = ["Estilo", "Cantidad", "Valor", "Total"];

  return (
    <>
        <table className='stock-genius-component-table stock-genius-selected-products '>
          <thead>
            <tr>
              {columns.map((column, index) => <th key={index} scope='col' >{column}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody className=''>
            {products.map((row,index) => (
              <tr key={row.id}>
                <td data-label={"Estilo"}   >{row.estilo} {row.color} x{row.talla} </td>

                <td data-label={"Cantidad"} className={'stock-genius-table-row'} >
                  <input
                    type='number'
                    autoFocus
                    className='stock-genius-small-input'
                    placeholder={row.cantidad}
                    name={`cantidad-${row.id}`}
                    required
                    max={selectedTab==0&&row.cantidad}
                    min={0}
                    onChange={(e) => handleCambiarCantidades(e, row.id)}
                  />
                </td>
                <td data-label={"Valor"}  >
                  <input
                    type='text'
                    className='stock-genius-small-input'
                    placeholder={formatPrice(row.valor_fabricacion)}
                    name={`valor-${row.id}`}
                     value={ventaProductos[row.id]?.moneda }
                    onChange={(e) => handleCambiarValores(e, row.id)}
                    required

                  />
                </td>
                <td data-label={"Total"} className={'stock-genius-table-total'} >{formatPrice(ventaProductos[row.id]?.['total'] || "$0")}</td>

                <td data-label={"Accion"} onClick={() => handleEliminarProducto(row)}>
                  
                  <svg  className="stock-genius-selected-product-delete" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 6.22386 1 6.5 1ZM11 2.5V1.5C11 0.671573 10.3284 0 9.5 0H6.5C5.67157 0 5 0.671573 5 1.5V2.5H2.50566C2.50226 2.49997 2.49885 2.49997 2.49544 2.5H1.5C1.22386 2.5 1 2.72386 1 3C1 3.27614 1.22386 3.5 1.5 3.5H2.0384L2.89116 14.1595C2.97431 15.1989 3.84207 16 4.88479 16H11.1152C12.1579 16 13.0257 15.1989 13.1088 14.1595L13.9616 3.5H14.5C14.7761 3.5 15 3.27614 15 3C15 2.72386 14.7761 2.5 14.5 2.5H13.5046C13.5011 2.49997 13.4977 2.49997 13.4943 2.5H11ZM12.9584 3.5L12.112 14.0797C12.0704 14.5994 11.6366 15 11.1152 15H4.88479C4.36343 15 3.92955 14.5994 3.88798 14.0797L3.0416 3.5H12.9584ZM5.47064 4.50086C5.74631 4.48465 5.98292 4.69497 5.99914 4.97064L6.49914 13.4706C6.51535 13.7463 6.30503 13.9829 6.02936 13.9991C5.7537 14.0154 5.51708 13.805 5.50086 13.5294L5.00086 5.02936C4.98465 4.7537 5.19497 4.51708 5.47064 4.50086ZM10.5294 4.50086C10.805 4.51708 11.0154 4.7537 10.9991 5.02936L10.4991 13.5294C10.4829 13.805 10.2463 14.0154 9.97064 13.9991C9.69497 13.9829 9.48465 13.7463 9.50086 13.4706L10.0009 4.97064C10.0171 4.69497 10.2537 4.48465 10.5294 4.50086ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z" fill="black" />
                  </svg>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </>
  );
}

export default SelectedProducts;