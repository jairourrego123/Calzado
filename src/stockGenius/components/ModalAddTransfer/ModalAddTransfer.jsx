import React, { useMemo } from 'react'
import GenericForm from '../GeneralForm/GeneralForm';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';

function ModalAddTransfer({onClose}) {
    const optionsPays = useMemo(() => [
        { id: 1, nombre: "Transacción Bancolombia" },
        { id: 2, nombre: "Nequi" },
        { id: 3, nombre: "Daviplata" },
        { id: 4, nombre: "Efectivo" },
      ], []);

    const onSubmit = (data) => {
        console.table(data);
        SweetAlertMessage("¡Éxito!","La transferencia se realizó correctamente.","success")
        onClose()
    };

    const formFields = [
        
       
        {
            name: 'cuenta_origen',
            type: "select",
            options:optionsPays,
            label: 'Mover de*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        {
            name: 'cuenta_destino',
            type: "select",
            options:[...optionsPays,{"id":null,nombre:"Otro"}],
            label: 'Mover a*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
 
        {
            name: 'descripcion',
            type: "textarea",
            label: 'Descripcion*',
            maxLength:80,
            height: "100px",
            rows:"5",
            cols:"10",
            rules: { required: 'Este campo es requerido',min:1 },
        },
      
        {
            name: 'valor',
            type: "text",
            label: 'Valor*',
            maxLength: 20,
            rules: { required: 'Este campo es requerido', min: 1 },
            price: 1
        },

        
       
     
      ];
    
      return (
        <div>
          <GenericForm formFields={formFields}  onSubmit={onSubmit} onClose={onClose} />
        </div>
      );
}

export default ModalAddTransfer