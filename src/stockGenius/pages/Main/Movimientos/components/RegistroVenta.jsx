import React, { useCallback, useMemo, useState } from 'react'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import ProductsSelected from '../../../../components/ProductsSelected/SelectedProducts'
import './RegistroVenta.css'
import Buttons from '../../../../components/Buttons/Buttons';
import Totals from '../../../../components/Totals/Totals';
import Icon from '../../../../components/Icon/Icon';
import ModalAddUsers from '../../../../components/ModalAddUsers/ModalAddUser';
import GeneralModal from '../../../../components/GeneralModal/GeneralModal';


import { ReactComponent as AddIcon } from "../../../../../assets/icons/add.svg"
import { SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert';

export default function RegistroVenta({ SelectedProducts, handleEliminarProducto, handleIcon, totalGeneral, setTotalGeneral,valores,setValores,totals,setTotals }) {


  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const initialClients = useMemo(() => [

    { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
    { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
    { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
    { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
    { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }


  ], [])
  const [clients,setClients] = useState(initialClients)
  const [selectedClient, setSelectedClient] = useState('')
  const [openModalUser, setOpenModalUser] = useState(false);



  const handleSelectClient = (e) => {
    setSelectedClient(e.target.value)
  }

  const handleSubmitVenta = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Crear el array de objetos con los productos seleccionados y sus cantidades/valores
    const productos = SelectedProducts.map((producto) => ({
      id: producto.id,
      cantidad: e.target[`cantidad-${producto.id}`].value,
      valor: parseInt(e.target[`valor-${producto.id}`].value?.replace(/[$\.]/g, '')),
    }));
    setProductosSeleccionados(productos);
    const data = { venta: { cliente: e.target["clientes"].value }, productos: productos }
    console.log(data);
  };
  const handleCloseModalUser = useCallback((e) => {
    
    setOpenModalUser(false);
  }, []);

  const handleSubmitUser = (e)=>{
    console.log(e);
    setClients((prev)=>[...prev,{ id: 6, nombre: e.nombre, telefono: "123456789", barrio: "Centro" }])
    SweetAlertMessage("¡Éxito!", "Usuario creado correctamente.", "success")
    setSelectedClient(6)
    handleCloseModalUser();
  }
  

  return (
    <>
      <form onSubmit={handleSubmitVenta} className='stock-genius-form-registro-venta'>

        <div className='stock-genius-registro-ventas'>

          <svg onClick={handleIcon} className='stock-genius-click' width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M33.75 18C33.75 17.3787 33.2463 16.875 32.625 16.875H6.09099L13.1705 9.7955C13.6098 9.35616 13.6098 8.64384 13.1705 8.2045C12.7312 7.76516 12.0188 7.76516 11.5795 8.2045L2.5795 17.2045C2.14017 17.6438 2.14017 18.3562 2.5795 18.7955L11.5795 27.7955C12.0188 28.2348 12.7312 28.2348 13.1705 27.7955C13.6098 27.3562 13.6098 26.6438 13.1705 26.2045L6.09099 19.125H32.625C33.2463 19.125 33.75 18.6213 33.75 18Z" fill="#191F2F" />
          </svg>

          <h1 className="stock-genius-titles" > Clientes</h1>
          <span className="stock-genius-layout" >Agrega un cliente para facturar</span>

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
          <h2 className="stock-genius-titles" > Lista de Compras</h2>
          <span className="stock-genius-layout" >Lista de los producto seleccinoados desde inventario</span>


        </div>
        <div className='stock-genius-products-selected'>
          <ProductsSelected products={SelectedProducts} handleEliminarProducto={handleEliminarProducto} setTotalGeneral={setTotalGeneral}  valores={valores} setValores={setValores} totals={totals} setTotals={setTotals}/>
        </div>
        <div>
          <Totals value={totalGeneral} />
          <Buttons buttonDoneText={"Vender"} buttonCloseText={"Cerrar"} buttonCloseAction={handleIcon} />

        </div>

      </form>
      <GeneralModal isOpen={openModalUser} onClose={handleCloseModalUser} icon={"product"}
        title="Nuevo Usuario"
        layout="Agrega un nuevo Usuario">
        <ModalAddUsers onClose={handleCloseModalUser}  onSubmitUser={handleSubmitUser}/>
      </GeneralModal>
    </>
  )
}
