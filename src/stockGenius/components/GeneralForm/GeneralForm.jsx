import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './GeneralForm.css';
import config from '../../const/config.json';
import FormatPrice from '../Utilities/FormatPrice';

const GenericForm = ({ formFields, onSubmit, onClose, product,cancel=true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: product });

  useEffect(() => {

    product?.valor&& setValue('valor', FormatPrice(product?.valor));
  }, [product, setValue]);

  const formatPrice = (e) => {
    const valor = FormatPrice(e.target.value);
    return setValue('valor', valor);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='stock-genius-component-general-form-container'>
      {formFields.map((field) => (
        <div key={field.name} className='stock-genius-component-general-form-content'>
          <label htmlFor={field.name}>{field.label}:</label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              {...register(field.name, field.rules)}
              className={errors[field.name] ? 'stock-genius-invalid-field' : 'stock-genius-component-general-form-content-input'}
              slot='1'
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            field.options.map((option) => (
              <div key={option.value}>
                <input
                  type='radio'
                  id={`${field.name}-${option.value}`}
                  value={option.value}
                  {...register(field.name, field.rules)}
                  className={errors[field.name] ? 'stock-genius-invalid-field' : 'stock-genius-component-general-form-content-input'}
                  slot='1'
                />
                <label htmlFor={`${field.name}-${option.value}`}>{option.label}</label>
              </div>
            ))
          ) : (
            <input
              {...field}
              id={field.name}
              {...register(field.name, field.rules)}
              className={errors[field.name] ? 'stock-genius-invalid-field' : 'stock-genius-component-general-form-content-input'}
              slot='1'
              onChange={field.price && formatPrice}
            />
          )}
          {errors[field.name] && (
            <span className="stock-genius-component-general-form-error-message">{errors[field.name].message}</span>
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

