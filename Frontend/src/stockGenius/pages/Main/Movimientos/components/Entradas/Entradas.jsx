import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as AddIcon } from '../../../../../../assets/icons/add.svg';
import HeaderRegistros from '../HeaderRegistros/HeaderRegistros'
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific'
import { SweetAlertMessage } from '../../../../../components/SweetAlert/SweetAlert';
import GeneralModal from '../../../../../components/GeneralModal/GeneralModal';
import { getSuppliers } from '../../../../../services/entradas/entryService';
const ModalAddUsers = lazy(() => import('../../../../../components/ModalAddUsers/ModalAddUser'));

function Entradas({selectedSupplier,setSelectedSupplier,setNameSupplier,handleCloseAll}) {

      const [supplier, setSupplier] = useState([]);
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

      useEffect(()=>{
         GetListSupplier()
      },[])

      const GetListSupplier = async(params)=>{
        const response = await getSuppliers({params: params });
        setSupplier(response.results);
      }
      const handleGoBack = ()=>{
        setSelectedSupplier('');
      }
  return (
    <>
     <HeaderRegistros handleCloseAll={handleCloseAll} title={"Proveedor"} text={"Selecciona el proveedor del producto."} handleGoBack={handleGoBack} />
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