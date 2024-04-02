import { useMemo, useState } from 'react';
import GenericForm from "../GeneralForm/GeneralForm";

function ModalAddProduct({ onClose, product = [] }) {
  const [codigo, setCodigo] = useState('');
  const data = useMemo(()=>[
    {estilo:"",color:"",talla:""}
  ],[])
  const handleCodeChange = (e) => {
    const { name, value } = e.target;
    data[name] = value.substring(0, 3) 
    console.log(data);
    setCodigo(`${data?.estilo || ''}-${data?.color|| ''}-${data.talla|| ''}`)
   
  };

  const onSubmit = (data) => {
    console.table(data);
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
  };

  const formFields = [
    {
      name: 'codigo',
      value: codigo,
      type: "text",
      label: 'Codigo*',
      rules: { required: 'Este campo es requerido' },
      maxLength: 10
    },
    {
      name: 'estilo',
      value: product[0]?.estilo,
      type: "text",
      label: 'Estilo*',
      rules: { required: 'Este campo es requerido' },
      onChange: handleCodeChange
    },
    
    {
      name: 'color',
      value: product[0]?.color,
      type: "text",
      label: 'Color*',
      rules: { required: 'Este campo es requerido', min: 1 },
      onChange: handleCodeChange
    },
    {
      name: 'talla',
      value: product[0]?.talla,
      type: "number",
      label: 'Talla*',
      rules: { required: 'Este campo es requerido', min: 1 },
      onChange: handleCodeChange
    },
    {
      name: 'cantidad',
      value: product[0]?.cantidad,
      type: "number",
      label: 'Cantidad*',
      rules: { required: 'Este campo es requerido', min: 1 }
    },
    {
      name: 'stock_min',
      value: product[0]?.stock_min,
      type: "number",
      label: 'Stock Mínimo*',
      rules: { required: 'Este campo es requerido', min: 1 }
    },
    {
      name: 'precio',
      value: product[0]?.precio,
      type: "number",
      label: 'Valor*',
      rules: { required: 'Este campo es requerido', min: 1 }
    },
  ];

  return (
    <div>
      <GenericForm formFields={formFields} onSubmit={onSubmit} onClose={onClose} />
    </div>
  );
};

export default ModalAddProduct;
