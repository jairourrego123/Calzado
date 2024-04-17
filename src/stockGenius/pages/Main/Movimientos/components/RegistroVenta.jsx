import React, { useMemo, useState } from 'react'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import ProductsSelected from '../../../../components/ProductsSelected/SelectedProducts'
import './RegistroVenta.css'
export default function RegistroVenta({SelectedProducts,handleEliminarProducto}) {

    const initialClients = useMemo(() => [

        { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
        { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
        { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
        { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
        { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }
    
    
      ], [])

    const [clients] = useState(initialClients)
    const [selectedClient, setSelectedClient] = useState('')
    const handleSelectClient = (e) => {
        setSelectedClient(e.target.value)
      }

  return (
    <div className='stock-genius-registro-ventas'>
       
        <h1 className="stock-genius-titles" > Clientes</h1>
        <span className="stock-genius-layout" >Agrega un cliente para facturar</span>
        <SelectedSpecific
          id="clientes"
          name="clientes"
          value={selectedClient} // Asigna el valor seleccionado
          options={clients} // Pasa las opciones al componente
          onChange={handleSelectClient} // Define 
        />
        <h1 className="stock-genius-titles" > Lista de Compras</h1>
        <span className="stock-genius-layout" >Lista de los producto seleccinoados desde inventario</span>
        <ProductsSelected  products={SelectedProducts} handleEliminarProducto={handleEliminarProducto}  />
        </div>
    )
}
