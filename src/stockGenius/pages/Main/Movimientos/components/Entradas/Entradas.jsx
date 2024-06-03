import React, { lazy, useMemo, useState } from 'react'
import { ReactComponent as AddIcon } from '../../../../../../assets/icons/add.svg';
import HeaderRegistros from '../HeaderRegistros/HeaderRegistros'
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific'
import { SweetAlertMessage } from '../../../../../components/SweetAlert/SweetAlert';
import GeneralModal from '../../../../../components/GeneralModal/GeneralModal';
const ModalAddUsers = lazy(() => import('../../../../../components/ModalAddUsers/ModalAddUser'));

function Entradas({selectedSupplier,setSelectedSupplier,setNameSupplier,handleCloseAll}) {
    const initialSupplier = useMemo(() =>
        [
          { "id": 1, "nombre": "Proveedor A", "barrio": "Barrio 1", "telefono": "123-456-789" },
          { "id": 2, "nombre": "Proveedor B", "barrio": "Barrio 2", "telefono": "987-654-321" },
          { "id": 3, "nombre": "Proveedor C", "barrio": "Barrio 3", "telefono": "555-555-555" },
          { "id": 4, "nombre": "Proveedor D", "barrio": "Barrio 4", "telefono": "444-444-444" },
          { "id": 5, "nombre": "Proveedor E", "barrio": "Barrio 5", "telefono": "333-333-333" }
        ], []
      );
      const [supplier, setSupplier] = useState(initialSupplier);
      const [openModalSupplier, setOpenModalSupplier] = useState(false);

      const handleSelectedSupplier = (e) => {
        setSelectedSupplier(e.target.value);
        setNameSupplier(e.target[e.target.selectedIndex].text);
      };

      const handleAddSupplier = (e) => {
        setSupplier((prev) => [...prev, { id: 6, nombre: e.nombre, numero_contacto: e.numero_contacto, lugar: e.lugar }]);
        setNameSupplier(e.nombre);
        SweetAlertMessage("¡Éxito!", "Proveedor creado correctamente.", "success");
        setSelectedSupplier(6);
        setOpenModalSupplier(false);
      };
      const handleCloseModalSupplier = () => {
        setOpenModalSupplier(false);
      };
    
  return (
    <>
     <HeaderRegistros handleCloseAll={handleCloseAll} title={"Proveedor"} text={"Selecciona el proveedor del producto."} />
          <div className='stock-genius-registro-seleccionable'>
            <SelectedSpecific
              id="supplier"
              name="supplier"
              value={selectedSupplier}
              options={supplier}
              onChange={handleSelectedSupplier}
            />
            <AddIcon className='stock-genius-click' onClick={() => setOpenModalSupplier(true)} />
          </div>
          {openModalSupplier && (
          <GeneralModal
            isOpen={openModalSupplier}
            onClose={handleCloseModalSupplier}
            icon={"product"}
            title={"Nuevo Proveedor"}
            layout={"Agrega un nuevo proveedor"}
          >
            <ModalAddUsers onClose={handleCloseModalSupplier} onSubmitUser={handleAddSupplier} />
          </GeneralModal>
        )}
          
    </>
  )
}

export default Entradas