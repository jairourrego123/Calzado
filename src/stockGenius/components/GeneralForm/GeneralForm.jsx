import { useForm } from 'react-hook-form';
import './GeneralForm.css'
import config from '../../const/config.json'
import { useEffect } from 'react';
import FormatPrice from '../Utilities/FormatPrice';
const GenericForm = ({ formFields, onSubmit, onClose, product }) => {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Agrega setValue para actualizar valores del formulario
  } = useForm({ defaultValues: product });

  // Actualiza el valor del campo en el formulario cuando cambia el producto editado
  useEffect(() => {
    // product!==undefined&&(product.precio=FormatPrice(product?.precio))

    setValue('estilo', product?.estilo);
    setValue('color', product?.color);
    setValue('talla', product?.talla);
    setValue('cantidad', product?.cantidad);
    setValue('stock_min', product?.stock_min);
    setValue('precio', FormatPrice(product?.precio));
  }, [product, setValue]); 
  
  const formatPrice = (e) => {
    const price = FormatPrice(e.target.value)
    return setValue("precio",price)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='stock-genius-component-general-form-container'>
      {formFields.map((field) => (
        <div key={field.name} className='stock-genius-component-general-form-content'>
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            {...field}
            id={field.name}
            {...register(field.name, field.rules)}
            className={errors[field.name] ? 'stock-genius-invalid-field' : 'stock-genius-component-general-form-content-input'}
            slot='1'

            onChange={ field.price && formatPrice }
          />
          {errors[field.name] && (
            <span className="stock-genius-component-general-form-error-message">{errors[field.name].message}</span>
          )}
        </div>
      ))}

      <div className='stock-genius-component-general-form-buttons'>
      <button className='stock-genius-component-general-form-button-cancelar stock-genius-button' type="button" onClick={onClose}>Cancelar</button>
      <button className='stock-genius-component-general-form-button-submit stock-genius-button' type="submit" style={{backgroundColor:config.backgroundButton}}>Guardar</button>
      </div>
    </form>
  );
};

export default GenericForm;
