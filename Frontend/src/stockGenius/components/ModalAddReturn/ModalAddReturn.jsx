import GenericForm from "../GeneralForm/GeneralForm";
import { SweetAlertMessage } from "../SweetAlert/SweetAlert";
import './ModalAddReturn.css'
import { getTypeReturns } from "../../services/devoluciones/returnService";
import { useEffect } from "react";
import { useState } from "react";
export default function ModalAddReturn( {onClose,product,setReturnProducts}) {
  const [optionsReturn,setOptionsReturn] = useState([])

    const GetOptionsReturn = async (params={})=>{
      const result = await getTypeReturns({params:params})
        
      setOptionsReturn(result.results)
        return result.results
    }
   
    useEffect(() => {
      GetOptionsReturn();
     }, [])
    const onSubmit = (data) => {
        console.log("data return",product)
        setReturnProducts((prev)=>([...prev,{
          "id":product?.id,
          "producto":product?.producto,
          "estilo":product?.estilo,
          "talla":product?.talla,
          "color":product?.color,
          "cantidad":parseInt(data?.cantidad),
          "valor_venta_producto":parseFloat(product?.valor_venta_producto),
          "valor_compra":parseFloat(product?.valor_compra),
          "valor_total":parseInt(data?.cantidad)*parseFloat(product?.valor_venta_producto),
          "motivo_devolucion":optionsReturn.find((prev)=>prev.id===parseInt(data?.motivo_devolucion)).nombre,
          "motivo":parseInt(data?.motivo_devolucion),
          "descripcion":data?.descripcion,
          fecha: new Date().toLocaleDateString(),
          

        }]))
        SweetAlertMessage("¡Éxito!", "Devolucion añadida correctamente.", "success")
        onClose();
      };
    const formFields = [    
        {
            name: 'cantidad',
            type: "number",
            label: 'Cantidad a devolver*',
            max:product?.cantidad,
            min:0,
            rules: { required: 'Este campo es requerido' , max:product?.cantidad},
            autoFocus:true
        },
        {
            name: 'motivo_devolucion',
            type: "select",
            options:optionsReturn,
            label: 'Motivo de devolución*',
            rules: { required: 'Este campo es requerido',min:1 },
        },
        {
            name: 'descripcion',
            type: "textarea",
            label: 'Descipción*',
            maxLength:120,
            height: "100px",
            rows:"10",
            cols:"50",
            rules: { required: 'Este campo es requerido',min:1 },
        },
        
       
     
      ];
    
      return (
        <div>
        <span className="stock-genius-modal-add-return">{product.estilo} {product.color} Tallla {product.talla}</span>
          <GenericForm formFields={formFields} onSubmit={onSubmit} onClose={onClose} />
        </div>
      );
}
