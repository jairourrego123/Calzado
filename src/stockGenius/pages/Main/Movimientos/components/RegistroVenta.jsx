import React, { useCallback, useMemo, useState } from 'react'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import ProductsSelected from '../../../../components/ProductsSelected/SelectedProducts'
import './RegistroVenta.css'
import Buttons from '../../../../components/Buttons/Buttons';
import Totals from '../../../../components/Totals/Totals';
import ModalAddUsers from '../../../../components/ModalAddUsers/ModalAddUser';
import GeneralModal from '../../../../components/GeneralModal/GeneralModal';


import { ReactComponent as AddIcon } from "../../../../../assets/icons/add.svg"
import { SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert';
import ModalDetailSale from '../../../../components/ModalDetailSale/ModalDetailSale';
import { sum } from '../../../../helpers/sum';

export default function RegistroVenta({ selectedProducts, handleEliminarProducto, handleCloseAll,ventaProductos,setVentaProductos}) {

  const initialClients = useMemo(() => [

    { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
    { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
    { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
    { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
    { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }


  ], [])

  const [openModalDetail,setOpenModalDetail] = useState(false)
  const [dataDetailSale,setDataDetailSale]=useState([])
  const [clients,setClients] = useState(initialClients)
  const [selectedClient, setSelectedClient] = useState('')
  const [nameClient, setNameClient] = useState('')
  const [openModalUser, setOpenModalUser] = useState(false);



  const totalVenta = useMemo(()=>
    sum(ventaProductos,"total")
    ,[ventaProductos])

  const handleSelectClient = (e) => {
    setSelectedClient(e.target.value)
    setNameClient(e.target[e.target.selectedIndex].text)
  }

  const handleSubmitUser = (e)=>{
    console.log("usuario");
    console.table(e);
    setClients((prev)=>[...prev,{ id: 6, nombre: e.nombre, telefono: e.numero_contacto, barrio: e.lugar }])
    setNameClient(e.nombre)
    SweetAlertMessage("¡Éxito!", "Usuario creado correctamente.", "success")
    setSelectedClient(6)
    handleCloseModalUser();
  }
  const handleCloseModalUser = () => {
    
    setOpenModalUser(false);
  }

  const handleCloseModalDetail = ()=> {

    setOpenModalDetail(false);

  };


  const handleSubmitVenta = useCallback( (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Crear el array de objetos con los productos seleccionados y sus cantidades/valores
    const productos = selectedProducts.map((producto) => ({
      id: producto.id,
      estilo:producto.estilo,
      talla:producto.talla,
      color:producto.color,
      valor_fabricacion:producto.valor_fabricacion,
      cantidad: ventaProductos[producto.id].cantidad,
      valor_venta_producto:ventaProductos[producto.id].valor_venta_producto,
      total: ventaProductos[producto.id].total,
      ganancia_producto:(producto.valor_fabricacion*ventaProductos[producto.id].cantidad)-(ventaProductos[producto.id].total)

    }));
    
    const salida = {
      valor:totalVenta,
      estado:false
    }
    const cliente = {
      id:selectedClient,
      nombre:nameClient
    }

    
    setDataDetailSale({productos,pagos:[],salida,cliente});
    setOpenModalDetail(true)

    // const data = { venta: { cliente: e.target["clientes"].value }, productos: productos }
    // const data = useMemo(() => ({
    //   productos: [
    //     { id:1, estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10,valor_fabricacion:10000, valor_venta_producto: 100000, total: 1000000,ganancia_producto:50000 },
    //     { id:2, estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion:100000,valor_venta_producto: 375000, total: 1875000,ganancia_producto:50000 },
    //     { id:3, estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8,valor_fabricacion:100000, valor_venta_producto: 120000, total: 960000,ganancia_producto:50000 },
    //     { id:4, estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12,valor_fabricacion:100000, valor_venta_producto: 150000, total: 1800000,ganancia_producto:50000 },
    //   ],
    //   pagos: [
    //     { id: 1, nombre: "Transacción Bancolombia", valor: 1000000, fecha: "05/05/2024" },
    //     { id: 2, nombre: "Nequi", valor: 375000, fecha: "06/05/2024" },
    //     { id: 3, nombre: "Daviplata", valor: 960000, fecha: "07/05/2024" },
    //     { id: 4, nombre: "Efectivo", valor: 1800000, fecha: "08/05/2024" },
    //   ],
    //   salida: {
    //     id:2,
    //     valor: 5635000,
    //     estado: false,
    //   },
    //   cliente: {
    //     id: 6,
    //     nombre: "Jairo Miller Urrego Garay",
    //   },
    // }), []);
    // console.log(data);
  }
  ,[nameClient,selectedClient,selectedProducts,totalVenta,ventaProductos])
  

  return (
    <div>
      <form onSubmit={handleSubmitVenta} className='stock-genius-form-registro-venta'>

        <div className='stock-genius-registro-ventas'>

          <svg onClick={handleCloseAll} className='stock-genius-click' width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M33.75 18C33.75 17.3787 33.2463 16.875 32.625 16.875H6.09099L13.1705 9.7955C13.6098 9.35616 13.6098 8.64384 13.1705 8.2045C12.7312 7.76516 12.0188 7.76516 11.5795 8.2045L2.5795 17.2045C2.14017 17.6438 2.14017 18.3562 2.5795 18.7955L11.5795 27.7955C12.0188 28.2348 12.7312 28.2348 13.1705 27.7955C13.6098 27.3562 13.6098 26.6438 13.1705 26.2045L6.09099 19.125H32.625C33.2463 19.125 33.75 18.6213 33.75 18Z" fill="#191F2F" />
          </svg>

          <span className="stock-genius-titles" > Clientes</span>
          <span className="stock-genius-small-text" >Agrega un cliente para facturar</span>

          <div className='stock-genius-registro-ventas-seleccionable'>

            <SelectedSpecific
              id="clientes"
              name="clientes"
              value={selectedClient} // Asigna el valor seleccionado
              options={clients} // Pasa las opciones al componente
              onChange={handleSelectClient} // Define 
            />

                   <AddIcon className='stock-genius-click' onClick={()=>setOpenModalUser(true)}/>

          </div>
          <span className="stock-genius-titles" > Lista de Compras</span>
          <span className="stock-genius-layout stock-genius-small-text" >Lista de los producto seleccinoados desde inventario</span>


        </div>
        <div className='stock-genius-products-selected'>
          <ProductsSelected products={selectedProducts} handleEliminarProducto={handleEliminarProducto} setVentaProductos={setVentaProductos} ventaProductos={ventaProductos}/>
        </div>
        <div>
          <Totals value={totalVenta} />
          <Buttons buttonDoneText={"Vender"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />

        </div>

      </form>
      <GeneralModal isOpen={openModalUser} onClose={handleCloseModalUser} icon={"product"}
        title="Nuevo Usuario"
        layout="Agrega un nuevo Usuario">
        <ModalAddUsers onClose={handleCloseModalUser}  onSubmitUser={handleSubmitUser}/>
      </GeneralModal>
      <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"}  
          title="Metodo de Pago.">
        <ModalDetailSale onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseAll} />
        </GeneralModal>
    </div>
  )
}
