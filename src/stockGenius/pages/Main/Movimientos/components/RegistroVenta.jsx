import React, { useCallback, useMemo, useState } from 'react'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import ProductsSelectedSale from '../../../../components/ProductsSelectedSale/SelectedProductsSale'
import './Registros.css'
import Buttons from '../../../../components/Buttons/Buttons';
import Totals from '../../../../components/Totals/Totals';
import ModalAddUsers from '../../../../components/ModalAddUsers/ModalAddUser';
import GeneralModal from '../../../../components/GeneralModal/GeneralModal';
import { ReactComponent as AddIcon } from "../../../../../assets/icons/add.svg"
import { SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert';
import ModalDetailSale from '../../../../components/ModalDetailSale/ModalDetailSale';
import { sum } from '../../../../helpers/sum';
import HeaderRegistros from './HeaderRegistros/HeaderRegistros';

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
    setClients((prev)=>[...prev,{ id: 6, nombre: e.nombre, numero_contacto: e.numero_contacto, lugar: e.lugar }])
    setNameClient(e.nombre)
    SweetAlertMessage("¡Éxito!", "Usuario creado correctamente.", "success")
    setSelectedClient(6)
    setOpenModalUser(false)
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

  }
  ,[nameClient,selectedClient,selectedProducts,totalVenta,ventaProductos])
  

  return (
    <div>
      <form onSubmit={handleSubmitVenta} className='stock-genius-form-registro'>

        <div className='stock-genius-registro-header'>

          <HeaderRegistros handleCloseAll={handleCloseAll} title={"Clientes"} text={"Agrega un cliente para facturar"}/>

          <div className='stock-genius-registro-seleccionable'>

            <SelectedSpecific
              id="clientes"
              name="clientes"
              value={selectedClient} // Asigna el valor seleccionado
              options={clients} // Pasa las opciones al componente
              onChange={handleSelectClient} // Define 
            />

                   <AddIcon className='stock-genius-click' onClick={()=>setOpenModalUser(true)}/>

          </div>
          <span className="stock-genius-titles" > Lista de productos</span>
          <span className="stock-genius-layout stock-genius-small-text" >Lista de los producto seleccinoados desde inventario</span>
        </div>
        <div className='stock-genius-registro-products-selected'>
          <ProductsSelectedSale products={selectedProducts} handleEliminarProducto={handleEliminarProducto} setVentaProductos={setVentaProductos} ventaProductos={ventaProductos}/>
        </div>
        <div>
          <Totals value={totalVenta} />
          <Buttons buttonDoneText={"Vender"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />
        </div>
      </form>
      <GeneralModal isOpen={openModalUser} onClose={handleCloseModalUser} icon={"product"}
        title="Nuevo Usuario"
        layout="Agrega un nuevo usuario">
        <ModalAddUsers onClose={handleCloseModalUser}  onSubmitUser={handleSubmitUser}/>
      </GeneralModal>
      <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"}  
          title="Metodo de Pago."
          layout={"Valida la información y registra los medios de pago."}>

        <ModalDetailSale onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseAll} />
        </GeneralModal>
    </div>
  )
}
