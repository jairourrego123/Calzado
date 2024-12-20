import React from 'react'

function Icon({icon,handleIcon}) {
  return (
   <img src={`/stock/assets/icons/${icon}.svg`} alt='icons' onClick={handleIcon ? handleIcon : undefined} className="stock-genius-click"/>
  )
}

export default Icon