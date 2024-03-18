
function GeneralSelect({ options, id, name, value, onChange }) {
  return (
    <select className="stock-genius-options" id={id} name={name} value={value} onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
  )
}

export default GeneralSelect