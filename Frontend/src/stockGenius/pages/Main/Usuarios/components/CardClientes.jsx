import './CardClientes.css'
import {ReactComponent as Cliente} from '../../../../../assets/icons/cliente.svg'
import {ReactComponent as Proveedor} from '../../../../../assets/icons/proveedor.svg'
import {ReactComponent as Edit } from "../../../../../assets/icons/edit.svg" 
import { useState } from 'react'
import GeneralModal from '../../../../components/GeneralModal/GeneralModal'
import ModalAddUsers from '../../../../components/ModalAddUsers/ModalAddUser'
import { SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert'
function CardClientes({clientes,selected,handleDoubleClick}) {
  const [openModalModify,setOpenModalModify]=useState(false)
  const [dataUser,setDataUser]=useState([])
  const handleModifyUser =(index)=>{
    setOpenModalModify(true)
    setDataUser(clientes[index])

  }
  const updateUser = ()=>{
    SweetAlertMessage("¡Éxito!", "Actualizado correctamente.", "success")  }
  const handleCloseModal = ()=>{
    setOpenModalModify(false)
  }
  return (
   <>
   <div className="stock-genius-card-client-container"> 
    
       
        { clientes.map((cliente,index)=>(
            <div onDoubleClick={()=>handleDoubleClick(cliente.id)} className="stock-genius-card-client-content" key={cliente.id} >
                <div className='stock-genius-card-clients-¡nfo'>
                <span className='stock-genius-card-clients-placeholder'>{cliente.nombre}</span>
                {cliente.estado&&<span className="stock-genius-card-client-debe" >Debe</span>}
                {selected === "Clientes"? <Cliente/>:<Proveedor/>}
                <hr className="lineaNegra" /> {/* Aplica la clase CSS 'lineaNegra' */}
                <span className="stock-genius-card-client-text">{cliente.nombre}</span>
                <span className="stock-genius-card-client-text">{cliente.lugar}</span>
                <span className="stock-genius-card-client-text">{cliente.numero_contacto}</span>
                </div>
                
            <div className='stock-genius-card-clients-edit-container '>
              <div className='stock-genius-card-clients-edit-content stock-genius-click' onClick={()=>handleModifyUser(index)}>
                <span className=''>Editar</span>
                <Edit /> 

              </div>
             
            </div>
            </div>

          

            ))}
   
    </div>
    <GeneralModal title={"Modificar"} layout={"Modificar la información incorrecta"}  icon={"product"} 
    isOpen={openModalModify} onClose={handleCloseModal} >
      <ModalAddUsers onClose={handleCloseModal} user={dataUser} onSubmitUser={updateUser}/>
    </GeneralModal>
    </> 
  )
}

export default CardClientes