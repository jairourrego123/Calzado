import React, { lazy, Suspense, useEffect, useState } from 'react'
import { ReactComponent as AddIcon } from '../../../../../../assets/icons/add.svg';
import HeaderRegistros from '../HeaderRegistros/HeaderRegistros'
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific'
import { SweetAlertMessage } from '../../../../../components/SweetAlert/SweetAlert';
import GeneralModal from '../../../../../components/GeneralModal/GeneralModal';
import { addSuppliers, getSuppliers } from '../../../../../services/entradas/entryService';
const ModalAddUsers = lazy(() => import('../../../../../components/ModalAddUsers/ModalAddUser'));

function Entradas({selectedSupplier,setSelectedSupplier,setNameSupplier,handleCloseAll}) {

      const [supplier, setSupplier] = useState([]);
      const [openModalSupplier, setOpenModalSupplier] = useState(false);


      const handleSelectedSupplier = (e) => {
        setSelectedSupplier(e.target.value);
        setNameSupplier(e.target[e.target.selectedIndex].text);
      };

      const AddProveedores = async(fromData)=>{
        fromData.estado = true 
        const response = await addSuppliers(fromData)
        return response
      }
      const handleAddSupplier = async(e) => {
        const newSupplier= await AddProveedores(e)
        setSupplier((prev) => [...prev, newSupplier]);
        setNameSupplier(newSupplier.nombre);
        SweetAlertMessage("¡Éxito!", "Proveedor creado correctamente.", "success");
        setSelectedSupplier(newSupplier.id);
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
        setSupplier(response);
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
           <Suspense >
          <GeneralModal
            isOpen={openModalSupplier}
            onClose={handleCloseModalSupplier}
            icon={"product"}
            title={"Nuevo Proveedor"}
            layout={"Agrega un nuevo proveedor"}
          >
            <ModalAddUsers onClose={handleCloseModalSupplier} onSubmitUser={handleAddSupplier} />
          </GeneralModal>
          </Suspense>
        )}
          
    </>
  )
}

export default Entradas