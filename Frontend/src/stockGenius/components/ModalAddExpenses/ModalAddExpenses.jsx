import React, {  useState } from 'react'
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import GenericForm from '../GeneralForm/GeneralForm';
import { useEffect } from 'react';
import { getPayMethods } from '../../services/finanzas/financeService';
import { addExpense } from '../../services/gastos/expenseService';
import { replaceInputPrice } from '../../helpers/formatPrice';

function ModalAddExpenses({ onClose,setLoadData,typeExpensives}) {
    console.log("modal add");
    const [optionsPays,setOptionPays]  = useState([])

    const ListPayMethods = async()=>{
        const response = await getPayMethods()
        setOptionPays(response.results)
    }
    useEffect(()=>{
      ListPayMethods()
    },[])


    const createExpensive =  async(data)=>{
     return  await addExpense(data)
    }
    const onSubmit = async (data) => {
      try {
        const addExpensive = {
          valor : replaceInputPrice(data.valor),
          tipo_gasto : parseInt(data.tipo_gasto),
          descripcion : data.descripcion,
          metodo_de_pago : parseInt(data.metodo_de_pago),
        }

        await createExpensive(addExpensive)
        SweetAlertMessage("¡Éxito!","La operación se realizó correctamente.","success")
        onClose()
        setLoadData(prev=>!prev)
      } catch (error) {
        console.error('Submission error:', error);

      } 
       
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
            name: 'tipo_gasto',
            type: "select",
            options:typeExpensives,
            label: 'Tipo de Gasto*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        {
            name: 'metodo_de_pago',
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