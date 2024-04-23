import React from 'react'
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import GenericForm from '../GeneralForm/GeneralForm';

function ModalAddExpenses({ onClose}) {
  

    const onSubmit = (data) => {
        console.table(data);
        SweetAlertMessage("¡Éxito!","La operación se realizó correctamente.","success")
        onClose()
    };
      
      const formFields = [
        
        {
            name: 'valor',
            type: "text",
            label: 'Valor*',
            maxLength: 20,
            rules: { required: 'Este campo es requerido', min: 1 },
            price: 1
        },
        {
            name: 'tipo-gasto',
            type: "select",
            options:[{value:0,label:"Seleccione...."},{value:1,label:"Personal"},{value:2,label:"General"}],
            label: 'Tipo de Gasto*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        
       
     
      ];
    
      return (
        <div>
          <GenericForm formFields={formFields}  onSubmit={onSubmit} onClose={onClose} />
        </div>
      );
}

export default ModalAddExpenses