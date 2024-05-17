import config from '../../const/config.json'
function ButtonsModal({onClose}) {
  return (
    <div className='stock-genius-component-general-form-buttons'>
    <button className='stock-genius-component-general-form-button-cancelar stock-genius-button' type="button" onClick={onClose}>Cancelar</button>
    <button className='stock-genius-component-general-form-button-submit stock-genius-button' type="submit" style={{backgroundColor:config.backgroundButton}}>Guardar</button>
  </div>
  )
}

export default ButtonsModal