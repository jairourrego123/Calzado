import React from 'react'
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import GenericForm from '../GeneralForm/GeneralForm';

function ModalAddUsers({ onClose}) {
  

    const onSubmit = (data) => {
        console.table(data);
        SweetAlertMessage("¡Éxito!","Usuario creado  correctamente.","success")
        onClose()
    };
      
      const formFields = [
        
        {
            name: 'nombre',
            type: "text",
            label: 'Nombre*',
            maxLength: 120,
            rules: { required: 'Este campo es requerido' },
          
        },
       
        {
            name: 'lugar',
            type: "text",
            label: 'Lugar*',
            maxLength: 80,
            rules: { required: 'Este campo es requerido' },
          
        },
        {
            name: 'numero_contacto',
            type: "number",
            label: 'Numero de contacto*',
            min:1,
            rules: { required: 'Este campo es requerido', min:1 },
          
        },
       
        
       
     
      ];
    
      return (
        <div>
          <GenericForm formFields={formFields}  onSubmit={onSubmit} onClose={onClose} />
        </div>
      );
}

export default ModalAddUsers