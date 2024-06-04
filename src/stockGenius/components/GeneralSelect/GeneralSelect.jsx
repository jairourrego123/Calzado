
function GeneralSelect({ options, id, name, value, onChange }) {
  return (
    <div className="stock-genius-labels" >
      <label htmlFor={id}>{name}: </label>
    <select className="stock-genius-options" id={id} name={name} value={value} onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
    </div>
  )
}

export default GeneralSelect