import './Mostrar.css'
function Mostrar() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    
    <>
    <div className='stock-genius-labels'>

      <label htmlFor="mostrar">Mostrar: </label>
      <select className='stock-genius-options ' id="mostrar" name="mostrar">
        {
          numbers.map((number, index) => <option key={index} value={number}>{number}</option>)
        }
      </select>
        </div>

    </>
  )
}

export default Mostrar