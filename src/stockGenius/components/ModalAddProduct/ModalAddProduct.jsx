import GenericForm from "../GeneralForm/GeneralForm";

function ModalAddProduct({onClose}) {
  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
  };
  const formFields = [
    { name: 'referencia',  type : "text", label: 'Referencia*', rules: { required: 'Este campo es requerido' } },
    { name: 'talla', type : "number", label: 'Talla*' ,rules: { required: 'Este campo es requerido', min: 1 } },
    { name: 'color', type : "text",label: 'Color*' ,rules: { required: 'Este campo es requerido', min: 1 } } ,
    { name: 'cantidad',type : "number", label: 'Cantidad*', rules: { required: 'Este campo es requerido', min: 1 } },
    { name: 'stockMinimo', type : "number",label: 'Stock Mínimo*', rules: { required: 'Este campo es requerido', min: 1 } },
    { name: 'valor', type : "number",label: 'Valor*', rules: { required: 'Este campo es requerido', min: 1 } },
  ];

  return (
    <div >
     <GenericForm  formFields={formFields} onSubmit={onSubmit} onClose={onClose}/>
    </div>
  );
};

export default ModalAddProduct;