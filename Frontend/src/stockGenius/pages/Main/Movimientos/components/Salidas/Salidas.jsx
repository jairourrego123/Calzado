import React, { Suspense, useCallback, useEffect, useState } from 'react';
import HeaderRegistros from '../HeaderRegistros/HeaderRegistros';
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific';
import { ReactComponent as AddIcon } from "../../../../../../assets/icons/add.svg";
import { SweetAlertMessage } from '../../../../../components/SweetAlert/SweetAlert';
import { addClient, getClients } from '../../../../../services/ventas/salesService';

const ModalAddUsers = React.lazy(() => import('../../../../../components/ModalAddUsers/ModalAddUser'));
const GeneralModal = React.lazy(() => import('../../../../../components/GeneralModal/GeneralModal'));

function Salidas({ setSelectedClient, setNameClient, selectedClient, handleCloseAll }) {
    console.log("salidas");


  const [openModalUser, setOpenModalUser] = useState(false);
  const [clients, setClients] = useState([]);
  
  useEffect(()=>{
    GetListClientes()
  },[])

  const GetListClientes = async(params)=>{
    const response = await getClients({params: params })
    setClients(response.results);
  }
  const AddClientes = async(fromData)=>{
    fromData.estado = true 
    const response = await addClient(fromData)
    return response
  }

  const handleSelectClient = useCallback((e) => {
    setSelectedClient(e.target.value);
    setNameClient(e.target[e.target.selectedIndex].text);
  }, [setSelectedClient, setNameClient]);

  const handleSubmitUser = useCallback(async (e) => {
     const newClient= await AddClientes(e)
     setClients([...clients,newClient]);
    setNameClient(newClient.nombre);
    SweetAlertMessage("¡Éxito!", "Usuario creado correctamente.", "success");
    setSelectedClient(newClient.id);
    setOpenModalUser(false);
  }, [clients,setNameClient, setSelectedClient]);

  const handleCloseModalUser = useCallback(() => {
    setOpenModalUser(false);
  }, []);
  const handleGoBack = ()=>{
    setSelectedClient('')
  }
  return (
    <>
      <HeaderRegistros handleCloseAll={handleCloseAll} title={"Clientes"} text={"Agrega un cliente para facturar"} handleGoBack={handleGoBack} />
      <div className='stock-genius-registro-seleccionable'>
        <SelectedSpecific
          id="clientes"
          name="clientes"
          value={selectedClient}
          options={clients}
          onChange={handleSelectClient}
        />
        <AddIcon className='stock-genius-click' onClick={() => setOpenModalUser(true)} />
      </div>
      {openModalUser && (
        <Suspense fallback={<div>Cargando...</div>}>
          <GeneralModal isOpen={openModalUser} onClose={handleCloseModalUser} icon={"product"} title="Nuevo Usuario" layout="Agrega un nuevo usuario">
            <ModalAddUsers onClose={handleCloseModalUser} onSubmitUser={handleSubmitUser} />
          </GeneralModal>
        </Suspense>
      )}
    </>
  );
}

export default React.memo(Salidas);
