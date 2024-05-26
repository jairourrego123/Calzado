import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './GeneralForm.css';
import config from '../../const/config.json';
import { formatPrice}from '../../helpers/formatPrice';

const GenericForm = ({ formFields, onSubmit, onClose, product,cancel=true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues: product });
  useEffect(() => {

    product?.valor&& setValue('valor', formatPrice(product?.valor));
  }, [product, setValue]);

  const formatPrices = (e) => {
    const valor = formatPrice(e.target.value);
    return setValue('valor', valor);
  };

  const descripcion = watch('descripcion', '');


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='stock-genius-component-general-form-container'>
      {formFields.map((field) => (
        <div key={field.name} className='stock-genius-component-general-form-content'>
          <label htmlFor={field.name}>{field.label}:</label>
          {field.type === 'select' 
          
          ? (
            <select
              id={field.name}
              {...register(field.name, field.rules)}
              className={errors[field.name] ? 'stock-genius-invalid-field stock-genius-small-text' : 'stock-genius-component-general-form-content-input'}
              slot='1'
            >
               <option value="">-- Selecciona --</option>
              {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.nombre}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            field.options.map((option) => (
              <div key={option.nombre}>
                <input
                  type='radio'
                  id={`${field.name}-${option.value}`}
                  value={option.nombre}
                  {...register(field.name, field.rules)}
                  className={errors[field.name] ? 'stock-genius-invalid-field stock-genius-small-text' : 'stock-genius-component-general-form-content-input'}
                  slot='1'
                />
                <label htmlFor={`${field.name}-${option.value}`}>{option.label}</label>
              </div>
            ))
          ) : field.type === 'textarea' ? (
            <>
            <textarea
              {...field}
              id={field.name}
              {...register(field.name, field.rules)}
              className={errors[field.name] ? 'stock-genius-invalid-field stock-genius-small-text' : 'stock-genius-component-general-form-content-input'}
              />
            <small>{field.maxLength - descripcion.length} caracteres restantes</small>
              </>
            
          ): (
            <input
              {...field}
              id={field.name}
              {...register(field.name, field.rules)}
              className={errors[field.name] ? 'stock-genius-invalid-field stock-genius-small-text' : 'stock-genius-component-general-form-content-input'}
              slot='1'
              onChange={field.price && formatPrices}
            />
          )
          
          }
          {errors[field.name] && (
            <span className="stock-genius-component-general-form-error-message stock-genius-small-text">{errors[field.name].message}</span>
          )}
        </div>
      ))}

      <div className='stock-genius-component-general-form-buttons'>
        {cancel&&<button className='stock-genius-component-general-form-button-cancelar stock-genius-button' type="button" onClick={onClose}>Cancelar</button>}
        <button className='stock-genius-component-general-form-button-submit stock-genius-button' type="submit" style={{backgroundColor:config.backgroundButton}}>{cancel?"Guardar":"Generar"}</button>
      </div>
    </form>
  );
};

export default GenericForm;

