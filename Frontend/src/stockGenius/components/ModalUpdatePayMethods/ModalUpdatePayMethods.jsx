import { formatPrice } from '../../helpers/formatPrice';
import { updateFinance } from '../../services/finanzas/financeService';
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert';
import './ModalUpdatePayMethods.css'
import { useForm, Controller } from 'react-hook-form';

function ModalUpdatePayMethods({pay_methods,onClose,onCloseAll,UpdateAnalisis,setLoadData}) {
    console.log("pay",pay_methods);

    const { handleSubmit, control, reset } = useForm();
    const onSubmit = async (data) => {

        SweetAlertConfirm("¡No podrá revertir esto!").then(async (result) => {
            if (result.isConfirmed) {
              try {
                const formattedData = pay_methods.map((method, index) => ({
                    id: method.id,
                    saldo_actual: parseFloat(data.pay_methods[index].saldo_actual),
                }));
                await updateFinance(formattedData);
                await UpdateAnalisis();
                setLoadData(e=>!e)
                SweetAlertMessage("Confirmado", "Haz aprobado correctamente.", "success");
                onClose();
                onCloseAll();
              } catch (error) {
                console.error(error);
              }
            }
          });
       
        
        
     
      };

      
    return (
    <div>
        
        <form className='stock-genius-modal-update-form' onSubmit={handleSubmit(onSubmit)}>
      {pay_methods.map((method, index) => (
        <div className='stock-genius-modal-update-pay-container' key={method.id}>
          <label>{method.nombre}</label>
          <Controller
            name={`pay_methods[${index}].saldo_actual`}
            control={control}
            defaultValue={method.saldo_actual}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input
                type="text"
                value={formatPrice(value)}
                onChange={(e) => onChange(e.target.value.replace(/[$.]/g, ''))}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </div>
      ))}
      <button type="submit">Guardar</button>
    </form>
    </div>
    // <div>ModalUpdatePayMethods</div>
  )
}

export default ModalUpdatePayMethods