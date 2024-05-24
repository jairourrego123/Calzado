import React, { useCallback, useMemo, useState } from 'react'
import HeaderRegistros from './HeaderRegistros'
import SelectedSpecific from '../../../../../components/SelectedSpecific/SelectedSpecific'

function RegistroDevolucion({handleCloseAll}) {


    const [personWhoReturns,setPersonWhoReturns]=useState('')
    const [state,setState]=useState('')
    const [reasonReturn,setReasonReturn]=useState('')
    const optionsPerson = useMemo(()=>[ 
      {"id":1,"nombre":"cliente A"},
      {"id":2,"nombre":"proveedor A"}
  ]
    
  ,[])  
    const optionsReason = useMemo(()=>[ 
      {"id":1,"nombre":"Cambio de talla"},
      {"id":2,"nombre":"Defectuoso"}
  ]
    
  ,[])  
    const optionsState = useMemo(()=>[ 
      {"id":1,"nombre":"Excelente"},
      {"id":2,"nombre":"Aceptable"},
      {"id":3,"nombre":"Mal estado"}
  ]
    
  ,[])  
  const handleSubmitVenta = useCallback( (e) => {
    e.preventDefault(); //
  })

  const handleSelectPerson = (e)=>{
    setPersonWhoReturns(e.target.value)
  }
  const handleReason = (e)=>{
    setReasonReturn(e.target.value)
  }
  const handleState = (e)=>{
    setState(e.target.value)
  }
  return (
    <div>
        <form className='stock-genius-form-registro'>

        <div className='stock-genius-registro-header'>

     <HeaderRegistros handleCloseAll={handleCloseAll} title={"Devolucion"}  text={"Selecciona el proveedor del producto."}/>
     
     <div className='stock-genius-registro-seleccionable'>
<SelectedSpecific
  id="persona-que-devuelve"
  name="persona-que-devuelve"
  value={personWhoReturns} // Asigna el valor seleccionado
  options={optionsPerson} // Pasa las opciones al componente
  onChange={handleSelectPerson} // Define 
/>

</div>

<div className='stock-genius-registro-seleccionable'>
<SelectedSpecific
  id="estado"
  name="estado"
  value={state} // Asigna el valor seleccionado
  options={optionsState} // Pasa las opciones al componente
  onChange={handleState} // Define 
  label='Estado'
/>
<SelectedSpecific
  id="motivo"
  name="persona-que-devuelve"
  value={reasonReturn} // Asigna el valor seleccionado
  options={optionsReason} // Pasa las opciones al componente
  onChange={handleReason} // Define 
  label='Motivo'
/>

</div>

<div></div>
    <label htmlFor='detalle'>Detalle</label>
<input type='text'  name='detalle' className='stock-genius-registro-input-detail'/>



        </div>
        
        
        
        
        </form>
    
    </div>
  )
}

export default RegistroDevolucion