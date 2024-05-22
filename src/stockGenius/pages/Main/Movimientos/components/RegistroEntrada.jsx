import React, { useMemo, useState } from 'react'
import HeaderRegistros from './HeaderRegistros/HeaderRegistros'
import {ReactComponent as AddIcon} from '../../../../../assets/icons/add.svg'
import SelectedSpecific from '../../../../components/SelectedSpecific/SelectedSpecific'
import GeneralModal from '../../../../components/GeneralModal/GeneralModal'
import ModalAddUsers from '../../../../components/ModalAddUsers/ModalAddUser'
import { SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert'
import ProductsSelectedEntry from '../../../../components/ProductsSelectedEntry/ProductsSelectedEntry'
import Buttons from '../../../../components/Buttons/Buttons'
import { formatPrice } from '../../../../helpers/formatPrice'
import ModalDetailSale from '../../../../components/ModalDetail/ModalDetail'

function RegistroEntrada({selectedProducts,handleCloseAll,handleEliminarProducto,totalEntrada,setTotalEntrada}) {
  const initialSupplier = useMemo(()=>
    [
      {
        "id": 1,
        "nombre": "Proveedor A",
        "barrio": "Barrio 1",
        "telefono": "123-456-789"
      },
      {
        "id": 2,
        "nombre": "Proveedor B",
        "barrio": "Barrio 2",
        "telefono": "987-654-321"
      },
      {
        "id": 3,
        "nombre": "Proveedor C",
        "barrio": "Barrio 3",
        "telefono": "555-555-555"
      },
      {
        "id": 4,
        "nombre": "Proveedor D",
        "barrio": "Barrio 4",
        "telefono": "444-444-444"
      },
      {
        "id": 5,
        "nombre": "Proveedor E",
        "barrio": "Barrio 5",
        "telefono": "333-333-333"
      }
    ]
    
  ,[])
  
  const [supplier,setSupplier] = useState(initialSupplier)
  const [nameSupplier,setNameSupplier] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [openModalSupplier,setOpenModalSupplier]=useState(false)
  const [openModalDetaill,setOpenModalDetail]= useState(false)
  const [dataModalDetail,setDataModalDetail]= useState({})
  
  const handleSelectedSupplier = (e) => {
    setSelectedSupplier(e.target.value)
    setNameSupplier(e.target[e.target.selectedIndex].text)

  }

  const handleAddSupplier = (e)=>{
    setSupplier((prev)=>[...prev,{id:6,nombre:e.nombre,numero_contacto:e.numero_contacto,lugar:e.lugar}])
    setNameSupplier(e.nombre)
    SweetAlertMessage("¡Éxito!", "Proveedor creado correctamente.", "success")
    setSelectedSupplier(6)
    setOpenModalSupplier(false)


  }

  const handleCloseModalSupplier = (e)=>{
    setOpenModalSupplier(false)
  }



  const handleSubmitEntrada = (e)=>{
    e.preventDefault()
    const productos = selectedProducts.map(producto=>(
      {
        id:producto.id,
        estilo:producto.estilo,
        talla:producto.talla,
        color:producto.color,
        cantidad:e.target[`cantidad-${producto.id}`].value

      }
    ))

    const valor = parseInt(e.target["total"].value.replace(/[$.]/g, ''))
    const entrada = {estado:false,valor}
    const proveedor = {id:supplier,nombre:nameSupplier}
    const data = {productos,pagos:[],entrada,proveedor}
    console.log(data);
    setDataModalDetail(data)
    setOpenModalDetail(true)
  
  }

  const handleCloseModalDetail = ()=>{
    setOpenModalDetail(false)
  }

  const handleChangeTotal = (e)=>{

    setTotalEntrada(formatPrice(e.target.value))

  }
  return (
    <div>

      <form onSubmit={handleSubmitEntrada} className='stock-genius-form-registro' >

        <div className='stock-genius-registro-header'>


        <HeaderRegistros handleCloseAll={handleCloseAll} title={"Proveedor"}  text={"Selecciona el proveedor del producto."}/>
        <div className='stock-genius-registro-seleccionable'>

            <SelectedSpecific
              id="supplier"
              name="supplier"
              value={selectedSupplier} // Asigna el valor seleccionado
              options={supplier} // Pasa las opciones al componente
              onChange={handleSelectedSupplier} // Define 
            />

                   <AddIcon className='stock-genius-click'  onClick={()=>setOpenModalSupplier(true)}/>

          </div>
          <span className="stock-genius-titles" > Lista de productos</span>
          <span className="stock-genius-layout stock-genius-small-text" >Lista de los producto seleccinoados desde inventario</span>
        </div>
        <div className='stock-genius-registro-products-selected'>
          <ProductsSelectedEntry products={selectedProducts} handleEliminarProducto={handleEliminarProducto} />
        </div>
        <div>
          <div>
          <span >TOTAL :</span>
          <input
                    type='text'
                    className='stock-genius-titles stock-genius-registro-text'
                    placeholder={"Ingresa Total"}
                    name={`total`}
                     value={totalEntrada}
                    onChange={(e) => handleChangeTotal(e)}
                    required


                  />
          </div>
          <Buttons buttonDoneText={"Guardar"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />
        </div>
      </form>
      <GeneralModal isOpen={openModalSupplier} onClose={handleCloseModalSupplier} icon={"product"} 
      title={"Nuevo Proveedor"}
      layout={"Agrega un nuevo proveedor"}
      >
       <ModalAddUsers onClose={handleCloseModalSupplier} onSubmitUser={handleAddSupplier} /> 
      </GeneralModal>
      <GeneralModal isOpen={openModalDetaill} icon={"product"}  onClose={handleCloseModalDetail}
      title={"Metodo de pago"}
       layout={"Valida la información y registra los medios de pago."}>
        <ModalDetailSale  onClose={handleCloseModalDetail}  handleCloseAll={handleCloseAll} data={dataModalDetail} type={"entrada"} atributo = {"proveedor"} />
      </GeneralModal>

    </div>
  )
}

export default RegistroEntrada