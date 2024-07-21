import React from 'react'
import GenericForm from '../GeneralForm/GeneralForm';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { addFinance } from '../../services/finanzas/financeService';
import { replaceInputPrice } from '../../helpers/formatPrice';

function ModalAddPaymentMethod({onClose,setLoadData}) {


    const onSubmit =async (data) => {
      try {
        data.saldo_actual = replaceInputPrice(data.saldo_actual);
        const response = await addFinance(data)
        setLoadData(e=>!e)
        SweetAlertMessage("¡Éxito!","Se ha creado el método de pago correctamente.","success")
        onClose()
      } catch (error) {
        console.error(error);
      }
        
    };

    const formFields = [
        
       
        {
            name: 'nombre',
            type: "text",
            label: 'Metodo de Pago*',
            rules: { required: 'Este campo es requerido' },
            maxLength: 80,
        },
        {
            name: 'saldo_actual',
            type: "text",
            label: 'Saldo Actual',
            maxLength: 20,
            rules: { required: 'Este campo es requerido', min: 1 },
            price: 1
        },
 
        {
            name: 'comision_banco',
            type: "number",
            label: 'Porcentaje de Descuento*',
            max: 100,
            min: 0,
            rules: { required: 'Este campo es requerido',min:{value:0,message:"Debe ser mayor de 0."},max:{value:100,message:"Debe ser menor de 100."}},
        }
      
     
      ];
    
      return (
        <div>
          <GenericForm formFields={formFields}  onSubmit={onSubmit} onClose={onClose} />
        </div>
      );
}

export default ModalAddPaymentMethod