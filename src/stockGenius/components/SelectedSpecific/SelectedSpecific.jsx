import './SelectedSpecific.css'
function SelectedSpecific({ options, id, name, value, onChange }) {
    return (

      <select className="stock-genius-options stock-genius-selected-specific " id={id} name={name} value={value} onChange={onChange} required>
        <option value="">-- Selecciona --</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.nombre}</option>
      ))}
    </select>
    )
  }
  
  export default SelectedSpecific