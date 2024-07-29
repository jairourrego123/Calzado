import './PaymentForm.css';
import SelectedSpecific from '../SelectedSpecific/SelectedSpecific';
import { formatPrice } from '../../helpers/formatPrice';
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { useState } from 'react';
function PaymentForm({ paymentMethods=[],totalGeneral, selectedMethod, handleSelectMethods, addPay }) {
  const [input, setInput] = useState("$0");

  const submit = (e)=>{
    addPay(e)
    setInput("$0")
  }

  return (
    <form onSubmit={submit} className='stock-genius-form-payment-methods stock-genius-body'>
      <span className='stock-genius-detail-sailida-label'>Añadir Pago:</span> <br/>
      <div className='stock-genius-form-payment-methods-inputs '>
        <div className='stock-genius-payment-form-container-inputs'>

      <span className='stock-genius-detail-sailida-label'>Método de pago</span>
        <SelectedSpecific
          id="metodos_de_pago"
          name="metodo_de_pago"
          value={selectedMethod}
          options={paymentMethods}
          onChange={handleSelectMethods}
          required
          />
          </div>
        <div className='stock-genius-payment-form-container-inputs stock-genius-body'>

        <span className='stock-genius-detail-sailida-label' htmlFor='valor'>Valor a Pagar</span>
        <input
          className='stock-genius-inputs  stock-genius-form-payment-methods-inputs-input-valor'
          type='text'
          name='valor'
          value={formatPrice(input.replace(/[$.]/g, ''))}
          onChange={(e) => setInput(e.target.value)}
          required
          />

          </div>
        <button type='submit' className='stock-genius-payment-from-button'>
          <AddIcon style={{ position: 'absolute' }} width={"2rem"} className='stock-genius-click' />

        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
