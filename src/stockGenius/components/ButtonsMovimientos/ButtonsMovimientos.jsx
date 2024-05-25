import React from 'react'
import './ButtonsMovimientos.css'
function ButtonsMovimientos({selectedSwitch,onChange}) {
  return (
    <div className='stock-genius-movimientos-buttons-movimientos'  >
        <button className={`stock-genius-button ${selectedSwitch==="Entradas"?"stock-genius-buttons-active":"stock-genius-desactive"}`} value={"Entradas"} onClick={(e)=>onChange(e.target.value)}>Entradas</button>
        <button className={`stock-genius-button ${selectedSwitch==="Salidas"?"stock-genius-buttons-active":"stock-genius-desactive"}`} value={"Salidas"} onClick={(e)=>onChange(e.target.value)}>Ventas</button>
        <button className={`stock-genius-button ${selectedSwitch==="Devoluciones"?"stock-genius-buttons-active":"stock-genius-desactive"}`} value={"Devoluciones"} onClick={(e)=>onChange(e.target.value)}>Devoluciones</button>
    </div>
  )
}

export default ButtonsMovimientos