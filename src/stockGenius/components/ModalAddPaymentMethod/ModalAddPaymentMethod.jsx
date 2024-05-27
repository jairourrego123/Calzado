import React from 'react'
import GenericForm from '../GeneralForm/GeneralForm';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';

function ModalAddPaymentMethod({onClose}) {


    const onSubmit = (data) => {
        console.table(data);
        SweetAlertMessage("¡Éxito!","Se ha creado el método de pago correctamente.","success")
        onClose()
    };

    const formFields = [
        
       
        {
            name: 'metodo_de_pago',
            type: "text",
            label: 'Metodo de Pago*',
            rules: { required: 'Este campo es requerido' },
            maxLength: 80,
        },
        {
            name: 'valor',
            type: "text",
            label: 'Saldo Actual',
            maxLength: 20,
            rules: { required: 'Este campo es requerido', min: 1 },
            price: 1
        },
 
        {
            name: 'descuento',
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