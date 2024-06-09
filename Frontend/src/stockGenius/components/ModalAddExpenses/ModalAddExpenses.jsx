import React, { useMemo } from 'react'
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import GenericForm from '../GeneralForm/GeneralForm';

function ModalAddExpenses({ onClose}) {
    const optionsPays = useMemo(() => [
      { id: 1, nombre: "Transacción Bancolombia" },
      { id: 2, nombre: "Nequi" },
      { id: 3, nombre: "Daviplata" },
      { id: 4, nombre: "Efectivo" },
    ], []);
    const optionsExpensive = useMemo(() => [
      { id: 1, nombre: "Personal" },
      { id: 2, nombre: "General" },

    ], []);

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
            options:optionsExpensive,
            label: 'Tipo de Gasto*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        {
            name: 'metodo-pago',
            type: "select",
            options:optionsPays,
            label: 'Metodo de Pago*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        {
            name: 'descripcion',
            type: "textarea",
            label: 'Descripcion*',
            maxLength:120,
            height: "100px",
            rows:"10",
            cols:"50",
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