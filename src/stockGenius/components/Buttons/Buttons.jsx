import React from 'react'
import './Buttons.css'
function Buttons({buttonDoneText,buttonCloseText,buttonCloseAction}) {
  return (
    <div className='stock-genius-button-component'>
        <button className='stock-genius-button stock-genius-button-close' onClick={buttonCloseAction}>{buttonCloseText} </button>
        <input className="stock-genius-button stock-genius-button-done" type="submit" value={buttonDoneText}/>
    </div>
  )
}

export default Buttons