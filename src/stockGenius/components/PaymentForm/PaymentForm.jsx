import './PaymentForm.css'
import SelectedSpecific from '../SelectedSpecific/SelectedSpecific'
import FormatPrice from '../Utilities/FormatPrice'
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg"

function PaymentForm({ paymentMethods, selectedMethod, input, handleSelectMethods, setInput, addPay }) {
  return (
    <form onSubmit={addPay} className='stock-genius-form-payment-methods stock-genius-body'>
    <span className='stock-genius-detail-sailida-label'>Seleccione un método de pago</span>
    <div className='stock-genius-form-payment-methods-inputs'>
      <SelectedSpecific
        id="metodos_de_pago"
        name="metodo_de_pago"
        value={selectedMethod}
        options={paymentMethods}
        onChange={handleSelectMethods}
        required
      />
      <label className='stock-genius-detail-sailida-label' htmlFor='valor'>Valor a Pagar</label>
      <input
        className='stock-genius-inputs stock-genius-form-payment-methods-inputs-input-valor'
        type='text'
        name='valor'
        value={FormatPrice(input)}
        onChange={(e) => setInput(e.target.value)}
        required
        
      />
      <button type='submit' className='stock-genius-payment-from-button'>

      <AddIcon  style={{position:'absolute'}}type='submit' width={"2rem"} className='stock-genius-click' />
      </button>
    </div>
  </form>
  )
}

export default PaymentForm