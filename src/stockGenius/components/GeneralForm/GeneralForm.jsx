import { useForm } from 'react-hook-form';
import './GeneralForm.css'
import config from '../../const/config.json'
const GenericForm = ({ formFields, onSubmit,onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='stock-genius-component-general-form-container'>
      {formFields.map((field) => (
        <div key={field.name} className='stock-genius-component-general-form-content'>
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type || 'text'}
            id={field.name}
            {...register(field.name, field.rules)}
            className={errors[field.name] ? 'stock-genius-invalid-field' : 'stock-genius-component-general-form-content-input'}
            value={field?.value}
            disabled={field.disabled}
            onChange={field?.onChange}
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
