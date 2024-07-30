import React, { useEffect, useMemo, useState } from 'react'
import GenericForm from '../GeneralForm/GeneralForm';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { addTransferencia, getPayMethods } from '../../services/finanzas/financeService';
import { replaceInputPrice } from '../../helpers/formatPrice';

function ModalAddTransfer({onClose,setLoadData}) {
    const [optionsPays,setOptionsPays] = useState([])
    const GetPayMethods = async()=>{
        const result = await getPayMethods()
        
        setOptionsPays(result.results)
        return result.results
    }
    useEffect(() => {
     GetPayMethods();
    }, [])
    
    const onSubmit = async(data) => {
      try {
        data.valor  = replaceInputPrice(data.valor);
        data.cuenta_origen = parseInt(data.cuenta_origen)
        data.destino = parseInt(data.destino)
        console.table(data);
        await addTransferencia(data)
        SweetAlertMessage("¡Éxito!","La transferencia se realizó correctamente.","success")
        setLoadData(e=>!e)
        onClose()
      } catch (error) {
        console.error('Submission error:', error);

      }
        
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
            options:[...optionsPays,{"id":"None",nombre:"Otro"}],
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