// SwitchComponent.js
import './SwitchComponent.css'
const SwitchComponent = ({ onChange, selectedSwitch,options }) => {

  const handleOptionChange = (e) => {
    const value = e.target.checked ? options[1] : options[0];
    onChange(value);
    
  };

  return (
    <div className="switch-container">
      <span className="switch-labels">{options[0]}</span>
      <label className="switch">
        <input type="checkbox" checked={selectedSwitch === options[1]} onChange={handleOptionChange} />
        <span className="slider round"></span>
      </label>
      <span className="switch-labels">{options[1]}</span>
    </div>
  );
};

export default SwitchComponent;
