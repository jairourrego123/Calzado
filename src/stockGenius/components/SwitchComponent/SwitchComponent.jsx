// SwitchComponent.js
import './SwitchComponent.css'
const SwitchComponent = ({ onChange, selectedSwitch }) => {
  const handleOptionChange = (e) => {
    const value = e.target.checked ? 'salidas' : 'entradas';
    onChange(value);
  };

  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" checked={selectedSwitch === 'salidas'} onChange={handleOptionChange} />
        <span className="slider round"></span>
      </label>
      <span className="switch-labels">{selectedSwitch === 'salidas' ? 'Salidas' : 'Entradas'}</span>
    </div>
  );
};

export default SwitchComponent;
