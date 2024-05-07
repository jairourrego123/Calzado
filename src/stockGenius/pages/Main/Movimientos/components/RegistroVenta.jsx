import React, { useMemo, useState } from 'react'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import ProductsSelected from '../../../../components/ProductsSelected/SelectedProducts'
import './RegistroVenta.css'
import FormatPrice from '../../../../components/Utilities/FormatPrice';
export default function RegistroVenta({SelectedProducts,handleEliminarProducto,handleIcon}) {


  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const initialClients = useMemo(() => [

    { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
    { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
    { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
    { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
    { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }


  ], [])
const [clients] = useState(initialClients)
const [selectedClient, setSelectedClient] = useState('')
const  [totalGeneral,setTotalGeneral]= useState(0)

const handleSelectClient = (e) => {
    setSelectedClient(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Crear el array de objetos con los productos seleccionados y sus cantidades/valores
    const productos = SelectedProducts.map((producto) => ({
      id: producto.id,
      cantidad: e.target[`cantidad-${producto.id}`].value,
      valor: parseInt(e.target[`valor-${producto.id}`].value?.replace(/[$\.]/g, '')),
    }));
    setProductosSeleccionados(productos);
    const data = {venta:{cliente:e.target["clientes"].value}, productos:productos}
    console.log(data);
  };



  return (
    <form onSubmit={handleSubmit} className='stock-genius-form-registro-venta'>
    
    <div className='stock-genius-registro-ventas'>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M33.75 18C33.75 17.3787 33.2463 16.875 32.625 16.875H6.09099L13.1705 9.7955C13.6098 9.35616 13.6098 8.64384 13.1705 8.2045C12.7312 7.76516 12.0188 7.76516 11.5795 8.2045L2.5795 17.2045C2.14017 17.6438 2.14017 18.3562 2.5795 18.7955L11.5795 27.7955C12.0188 28.2348 12.7312 28.2348 13.1705 27.7955C13.6098 27.3562 13.6098 26.6438 13.1705 26.2045L6.09099 19.125H32.625C33.2463 19.125 33.75 18.6213 33.75 18Z" fill="#191F2F"/>
    </svg>
      
    <h1 className="stock-genius-titles" > Clientes</h1>
    <span className="stock-genius-layout" >Agrega un cliente para facturar</span>


       

   
        <SelectedSpecific
          id="clientes"
          name="clientes"
          value={selectedClient} // Asigna el valor seleccionado
          options={clients} // Pasa las opciones al componente
          onChange={handleSelectClient} // Define 
        />
        <h2 className="stock-genius-titles" > Lista de Compras</h2>
          <span className="stock-genius-layout" >Lista de los producto seleccinoados desde inventario</span>
        <br/>

        <ProductsSelected  products={SelectedProducts} handleEliminarProducto={handleEliminarProducto} setTotalGeneral={setTotalGeneral} />
    </div>
    <div>
        <h2>TOTAL:</h2>
        <span>{FormatPrice(totalGeneral)}</span>
        <input type="submit" value="Enviar" />

    </div>
        </form>
    )
}
