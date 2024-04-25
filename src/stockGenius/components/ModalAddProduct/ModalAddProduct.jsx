import GenericForm from "../GeneralForm/GeneralForm";
import { SweetAlertMessage } from "../SweetAlert/SweetAlert";

function ModalAddProduct({ onClose, product = [] }) {



  const onSubmit = (data) => {
    console.table(data);
    onClose()
    SweetAlertMessage("¡Éxito!","La operación se realizó correctamente.","success")
  };
  
  const formFields = [
    
    {
      name: 'estilo',
      type: "text",
      label: 'Estilo*',
      rules: { required: 'Este campo es requerido' },
      maxLength: 45,
    },
    
    {
      name: 'color',
      type: "text",
      label: 'Color*',
      rules: { required: 'Este campo es requerido', min: 1 },
      disabled:false,
      maxLength: 45,

    },
    {
      name: 'talla',
      type: "number",
      label: 'Talla*',
      min:0,

      rules: { required: 'Este campo es requerido', min: 1 },
    },
    {
      name: 'cantidad',
      type: "number",
      label: 'Cantidad*',
      min:0,
      rules: { required: 'Este campo es requerido', min: 1 }
    },
    {
      name: 'stock_min',
      type: "number",
      label: 'Stock Mínimo*',
      min:0,
      rules: { required: 'Este campo es requerido', min: 1 }
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
      <GenericForm formFields={formFields} product={product[0]} onSubmit={onSubmit} onClose={onClose} />
    </div>
  );
};

export default ModalAddProduct;