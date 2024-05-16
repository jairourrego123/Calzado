import { useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import './ModalDetailSale.css'
import TableDetail from '../TableDetail/TableDetail';
import TotalsSection from '../TotalsSetion/TotalsSection';
import PaymentForm from '../PaymentForm/PaymentForm';
import Buttonsmodal from '../ButtonsModal/ButtonsModal';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';

function ModalDetailSale({onClose}) {



  const initialData = useMemo(() => [

    { id: 1, nombre: "Transacción Bancolombia"},
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo"},


  ], [])
  const data = {
    productos: [
      { estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10, valor_fabricacion: 100000},
      { estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_fabricacion: 75000},
      { estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_fabricacion: 120000},
      { estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_fabricacion: 150000}
    ],
    transacciones:[
     {"id": 1 , "nombre":"Tarnsaccion Bancolombia","valor":1000000,"fecha":"05/05/2024"},
     {"id": 2 , "nombre":"Nequi","valor":375000,"fecha":"06/05/2024"},
     {"id": 3 , "nombre":"Daviplata","valor":960000,"fecha":"07/05/2024"},
     {"id": 4 , "nombre":"Efectivo","valor":1800000,"fecha":"08/05/2024"},
     {"id": 4 , "nombre":"Efectivo","valor":1800000,"fecha":"08/05/2024"},
     {"id": 4 , "nombre":"Efectivo","valor":1800000,"fecha":"08/05/2024"},
     {"id": 4 , "nombre":"Efectivo","valor":1800000,"fecha":"08/05/2024"},
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
    e.target["valor"].value.length<5 && SweetAlertMessage("Error","Ingresa un valor a pagar","error")
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

    <div className="stock-genius-detail-salida-container ">
      <span  className='stock-genius-sub-titles stock-genius-detail-sailida-label-selected '>{data.cliente.nombre}</span>
      <div className=' stock-genius-component-table stock-genius-body'>
        <TableDetail columns={columns} data={data?.productos} subtotal={data?.salida?.valor}/>
      <hr className="stock-genius-detail-linea-gris" /> {/* Aplica la clase CSS 'lineaNegra' */}
      </div>
      <div className='stock-genius-card-pay-container'>
      <CardPay transacciones={data?.transacciones} />
      </div>
      <TotalsSection totalGeneral={data?.salida?.valor}/>
      <PaymentForm paymentMethods={paymentMethods} selectedMethod={selectedMethod} input={input} handleSelectMethods={handleSelectMethods} setInput={setInput}  addPay={AddPay}/>
      <Buttonsmodal onClose={onClose}/>
    </div>


  )
}

export default ModalDetailSale