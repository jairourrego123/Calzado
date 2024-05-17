import { useEffect, useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import './ModalDetailSale.css'
import TableDetail from '../TableDetail/TableDetail';
import TotalsSection from '../TotalsSetion/TotalsSection';
import PaymentForm from '../PaymentForm/PaymentForm';
import Buttonsmodal from '../ButtonsModal/ButtonsModal';
import { SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { sum } from '../../helpers/sum';

function ModalDetailSale({onClose}) {



  const initialData = useMemo(() => [

    { id: 1, nombre: "Transacción Bancolombia"},
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo"},


  ], [])

  const data = {
    productos: [
      { estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10, valor_venta_producto: 100000,total:1000000},
      { estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_venta_producto: 375000,total:1875000},
      { estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_venta_producto: 120000,total:960000},
      { estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_venta_producto: 150000,total:1800000}
    ],
    transacciones:[
     {"id": 1 , "nombre":"Tarnsaccion Bancolombia","valor":1000000,"fecha":"05/05/2024"},
     {"id": 2 , "nombre":"Nequi","valor":375000,"fecha":"06/05/2024"},
     {"id": 3 , "nombre":"Daviplata","valor":960000,"fecha":"07/05/2024"},
     {"id": 4 , "nombre":"Efectivo","valor":1800000,"fecha":"08/05/2024"},
    ],
    salida: {
      valor: 445000,
      estado: true
    },
    cliente: {
      id: 6,
      nombre: "Jairo Miller Urrego Garay"
    }
  };


  const [pays,setPays]=useState(data?.transacciones)
  const [paymentMethods,setPaymentMethods] =  useState(initialData)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [input,setInput]=useState(0)

  const totalGeneral = useMemo(() => 
    sum(data.productos,"total")
  , [])
  const totalPagado = useMemo(() => 

    sum(pays,"valor")
  , [pays])
  const handleSelectMethods = (e) => {
    setSelectedMethod(e.target.value)
  }


  
  const AddPay = (e)=>{
    e.target["valor"].value.length<5 && SweetAlertMessage("Error","Ingresa un valor a pagar","error")
    e.preventDefault()
    const valor = e.target["valor"].value
    const data = {
      "metodo_id":e.target['metodo_de_pago'].value,
      "nombre":e.target['metodo_de_pago'][e.target['metodo_de_pago'].value].text,
      "valor": parseInt(valor?.replace(/[$\.]/g, '')),
      "fecha": new Date(Date.now()).toLocaleDateString()
    }
    setPays((e)=>[...e,data])
    setSelectedMethod("")
    setInput(0)
    e.target.reset();
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
      <CardPay transacciones={pays} />
      <TotalsSection totalGeneral={totalGeneral} totalPagado={totalPagado}/>
      <PaymentForm paymentMethods={paymentMethods} selectedMethod={selectedMethod} input={input} handleSelectMethods={handleSelectMethods} setInput={setInput}  addPay={AddPay}/>
      <Buttonsmodal onClose={onClose}/>
    </div>


  )
}

export default ModalDetailSale