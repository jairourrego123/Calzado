import React from 'react'

function Layout() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (

    <>
      <label for="mostrar">Mostrar:</label>
      <select id="mostrar" name="mostrar">
        {
          numbers.map((number, index) => <option key={index} value={number}>{number}</option>)
        }
      </select>
      <select id="opciones" name="opciones">
        <option value="1">Disponible</option>
        <option value="0">Fuera de Stock</option>
      </select>

      <button className='stock-genius-component-layout-eliminar'>
        <img src='/assets/icons/eliminar.svg' alt='icon-eliminar'/>
        Eliminar
      </button>
    </>
  )
}

export default Layout