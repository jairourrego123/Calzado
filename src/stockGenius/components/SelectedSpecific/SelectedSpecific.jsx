import './SelectedSpecific.css'
function SelectedSpecific({ options, id, name, value, onChange,label="" }) {
    return (
      <div className='stock-genius-selected-container' >
      {label&&<label>{label}</label>}
      <select className="stock-genius-options stock-genius-selected-specific stock-genius-body " title='Selecciona una opción' id={id} name={name} value={value} onChange={onChange} required>
        <option value="">-- Selecciona --</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.nombre}</option>
      ))}
    </select>
      </div>
    )
  }
  
  export default SelectedSpecific