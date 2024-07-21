import GenericForm from "../GeneralForm/GeneralForm";
import { SweetAlertMessage } from "../SweetAlert/SweetAlert";
import { replaceInputPrice } from "../../helpers/formatPrice";
import { addItem, updateItem } from "../../services/inventario/inventoryService";

function ModalAddProduct({ onClose, product = [] ,setLoadData}) {

  const createProduct= async (data)=>{
    const response = await addItem(data)
    return response;
  }

  const updateProduct= async (data)=>{
    const response = await updateItem(data.id,data)
    return response;
  }
  const permisoModifyProducto = true

  const onSubmit = async (data) => {
    try {
      if (product?.length>0) {
        const product = {
          id:data.id,
          estilo:data.estilo,
          talla:data.talla,
          color:data.color,
          stock_min:data.stock_min,

        }
        await updateProduct(product)
      }
      else{
        data.valor = replaceInputPrice(data.valor);
        data.valor_compra = replaceInputPrice(data.valor_compra);
        await createProduct(data);
       
      }
      setLoadData((prev) => !prev);
      SweetAlertMessage("¡Éxito!", "La operación se realizó correctamente.", "success");
      onClose();
      
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const formFields = [
    
    {
      autoFocus:"autoFocus",
      name: 'referencia',
      type: "text",
      label: 'Referencia*',
      maxLength: 50,
    },
    {
      name: 'estilo',
      type: "text",
      label: 'Estilo*',
      rules: { required: 'Este campo es requerido' },
      maxLength: 80,
    },
    
    {
      name: 'color',
      type: "text",
      label: 'Color*',
      rules: { required: 'Este campo es requerido' },
      maxLength: 20

    },
    {
      name: 'talla',
      type: "number",
      label: 'Talla*',
      min:0,

      rules: { required: 'Este campo es requerido', 
        min: {value:1,message:"El valor minimo es 0"} ,
        max:{value:100,message:"El valor máximo es 100"}},
    },
    {
      name: 'cantidad',
      type: "number",
      label: 'Cantidad*',
      min:0,
      disabled:!permisoModifyProducto,
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
      name: 'valor_compra',
      type: "text",
      label: 'Valor Compra*',
      maxLength: 20,
      rules: { required: 'Este campo es requerido', min: 0 },
      price: 1,
      disabled:!permisoModifyProducto

    },
    {
      name: 'valor',
      type: "text",
      label: 'Valor Venta*',
      maxLength: 20,
      rules: { required: 'Este campo es requerido', min: 1 },
      price: 1,
      disabled:!permisoModifyProducto

    },
  ];
  return (
    <div>
      <GenericForm formFields={formFields} defaultValues={product[0]} onSubmit={onSubmit} onClose={onClose} inputsPrice={["valor","valor_compra"]} />
    </div>
  );
};

export default ModalAddProduct;