import config from '../../const/config.json'
function ButtonsModal({onClose,disable=false,titleButton=''}) {
  return (
    <div className='stock-genius-component-general-form-buttons'>
    <button  className='stock-genius-component-general-form-button-cancelar stock-genius-button' type="button" onClick={onClose}>Cancelar</button>
    <button  disabled={disable} className={`${disable?"":"stock-genius-component-general-form-button-submit"} stock-genius-button`} type="submit" style={disable ?{}:{backgroundColor:config.backgroundButton }} >{titleButton?titleButton:"Guardar"}</button>
  </div>
  )
}

export default ButtonsModal