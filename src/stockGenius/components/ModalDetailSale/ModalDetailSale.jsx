import { useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import FormatPrice from '../Utilities/FormatPrice';
import './ModalDetailSale.css'
import SelectedSpecific from '../SelectedSpecific/SelectedSpecific';
import config from '../../const/config.json';

function ModalDetailSale({onClose}) {



  const initialData = useMemo(() => [

    { id: 1, nombre: "Transacción Bancolombia"},
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo"},


  ], [])
  const data = {
    productos: [
      { estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10, valor_fabricacion: 100000 },
      { estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion: 75000 },
      { estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_fabricacion: 120000 },
      { estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_fabricacion: 150000 }
    ],
    salida: {
      valor: 445000,
      estado: true
    },
    cliente: {
      id: 6,
      nombre: "Jairo Miller Urrego Garay "
    }
  };

  const [paymentMethods,setPaymentMethods] =  useState(initialData)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [input,setInput]=useState(0)
  const handleSelectMethods = (e) => {
    setSelectedMethod(e.target.value)
  }
  const AddPay = (e)=>{
    e.preventDefault()
    const valor = e.target["valor"].value
    const data = {
      "metodo_pago":e.target['metodo_de_pago'].value,
      "valor": parseInt(valor?.replace(/[$\.]/g, ''))
    }

  }

  if (Object.keys(data.productos).length === 0) return <h3>No se encuentran Productos </h3>;

  const columns = ["Estilo", "Cantidad", "Valor", "Total"];

  return (

    <div className="stock-genius-detail-salida-container">

      <span>{data.cliente.nombre}</span>
      <div className=' stock-genius-component-table stock-genius-detail-salida-table'>

        <table>
          <thead>
            <tr>
              {columns.map((column, index) => <th key={index} scope='col' >{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.productos.map((row) => (
              <tr key={row.id}>
                <td data-label={"Estilo"} style={{ textAlign: 'left' }} className={'stock-genius-table-row'} >{row.estilo} {row.color} x{row.talla} </td>
                <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>
                <td data-label={"Valor"} className={'stock-genius-table-row'}>{FormatPrice(row.valor_fabricacion)}</td>
                <td data-label={"Total"} style={{ textAlign: 'right' }} className={'stock-genius-table-row'}>{FormatPrice(row.cantidad * row.valor_fabricacion)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='stock-genius-detail-subtotal'>
          <spam>Subtotal</spam>
          <span>{FormatPrice(data.salida.valor)}</span>
        </div>
      </div>
      <hr className="stock-genius-detail-linea-gris" /> {/* Aplica la clase CSS 'lineaNegra' */}
      <CardPay metodo={"Transaccion Bancolombia"} pagos={[{ "id": 1, "valor": 10000 }]} />
      {/* <CardPay metodo={"Transaccion Bancolombia"} pagos={[{"id":1,"valor":10000}]}/> */}

      <div className='stock-genius-detail-salida-totales'>
        <div className='stock-genius-detail-salida-totales-total-general'>
          <span>Total General</span>
          <span>$100.000</span>
        </div>
        <div className='stock-genius-detail-salida-totales-total-pagado'>
          <span>Total Pagado</span>
          <span>$100.000</span>
        </div>
      </div>
      <form onSubmit={AddPay} className='stock-genius-form-payment-methods'>
      <SelectedSpecific
              id="metodos_de_pago"
              name="metodo_de_pago"
              value={selectedMethod}
              options={paymentMethods} // Pasa las opciones al componente
              onChange={handleSelectMethods} // Define 
              require
           />
      <label htmlFor='valor' >Valor a Pagar</label>
      <input  className='stock-genius-small-input' type='text' name='valor' value={FormatPrice(input)} onChange={(e)=>setInput(e.target.value)}/>
      <input className='stock-genius-form-payment-methods-button ' type="submit" value={"Añadir"}  style={{backgroundColor:config.backgroundButton}}/>

      </form>
           <div className='stock-genius-component-general-form-buttons'>
        <button className='stock-genius-component-general-form-button-cancelar stock-genius-button' type="button" onClick={onClose}>Cancelar</button>
        <button className='stock-genius-component-general-form-button-submit stock-genius-button' type="submit" style={{backgroundColor:config.backgroundButton}}>Guardar</button>
      </div>
    </div>


  )
}

export default ModalDetailSale