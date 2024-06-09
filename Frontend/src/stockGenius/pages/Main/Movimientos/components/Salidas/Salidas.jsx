import React, { Suspense, useCallback, useMemo, useState } from 'react';
import HeaderRegistros from '../HeaderRegistros/HeaderRegistros';
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific';
import { ReactComponent as AddIcon } from "../../../../../../assets/icons/add.svg";
import { SweetAlertMessage } from '../../../../../components/SweetAlert/SweetAlert';

const ModalAddUsers = React.lazy(() => import('../../../../../components/ModalAddUsers/ModalAddUser'));
const GeneralModal = React.lazy(() => import('../../../../../components/GeneralModal/GeneralModal'));

function Salidas({ setSelectedClient, setNameClient, selectedClient, handleCloseAll }) {
    console.log("salidas");
    const initialClients = useMemo(() => [
    { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
    { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
    { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
    { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
    { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }
  ], []);

  const [openModalUser, setOpenModalUser] = useState(false);
  const [clients, setClients] = useState(initialClients);

  const handleSelectClient = useCallback((e) => {
    setSelectedClient(e.target.value);
    setNameClient(e.target[e.target.selectedIndex].text);
  }, [setSelectedClient, setNameClient]);

  const handleSubmitUser = useCallback((e) => {
    setClients((prev) => [...prev, { id: 6, nombre: e.nombre, numero_contacto: e.numero_contacto, lugar: e.lugar }]);
    setNameClient(e.nombre);
    SweetAlertMessage("¡Éxito!", "Usuario creado correctamente.", "success");
    setSelectedClient(6);
    setOpenModalUser(false);
  }, [setClients, setNameClient, setSelectedClient]);

  const handleCloseModalUser = useCallback(() => {
    setOpenModalUser(false);
  }, []);

  return (
    <>
      <HeaderRegistros handleCloseAll={handleCloseAll} title={"Clientes"} text={"Agrega un cliente para facturar"} />
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
