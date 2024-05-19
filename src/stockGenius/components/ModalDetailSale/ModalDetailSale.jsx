import { useCallback, useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import './ModalDetailSale.css';
import TableDetail from '../TableDetail/TableDetail';
import TotalsSection from '../TotalsSetion/TotalsSection';
import PaymentForm from '../PaymentForm/PaymentForm';
import ButtonsModal from '../ButtonsModal/ButtonsModal';
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { sum } from '../../helpers/sum';

function ModalDetailSale({ onClose }) {
  const initialData = useMemo(() => [
    { id: 1, nombre: "Transacción Bancolombia" },
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo" },
  ], []);

  const data = useMemo(() => ({
    productos: [
      { estilo: "Clasico", talla: "42", color: "Rojo", cantidad: 10, valor_venta_producto: 100000, total: 1000000 },
      { estilo: "Moderno", talla: "38", color: "Azul", cantidad: 5, valor_venta_producto: 375000, total: 1875000 },
      { estilo: "Deportivo", talla: "44", color: "Negro", cantidad: 8, valor_venta_producto: 120000, total: 960000 },
      { estilo: "Elegante", talla: "40", color: "Blanco", cantidad: 12, valor_venta_producto: 150000, total: 1800000 },
    ],
    transacciones: [
      { id: 1, nombre: "Transacción Bancolombia", valor: 1000000, fecha: "05/05/2024" },
      { id: 2, nombre: "Nequi", valor: 375000, fecha: "06/05/2024" },
      { id: 3, nombre: "Daviplata", valor: 960000, fecha: "07/05/2024" },
      { id: 4, nombre: "Efectivo", valor: 1800000, fecha: "08/05/2024" },
    ],
    salida: {
      valor: 5635000,
      estado: false,
    },
    cliente: {
      id: 6,
      nombre: "Jairo Miller Urrego Garay",
    },
  }), []);

  const [pays, setPays] = useState([]);
  const [paymentMethods] = useState(initialData);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [input, setInput] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  
  const totalPagado = useMemo(() => sum(data.transacciones, "valor"), [data.transacciones]);
  const nuevoPago = useMemo(() => sum(pays, "valor"), [pays]);
  const totalPagadoGeneral = useMemo(() => totalPagado + nuevoPago, [totalPagado, nuevoPago]);

  const handleSelectMethods = useCallback((e) => {
    setSelectedMethod(e.target.value);
  }, []);

  const handleDeletPay = useCallback((id) => {
    SweetAlertConfirm("¡No podrás revertir este pago!")
      .then((result) => {
        if (result.isConfirmed) {
          setPays(prevPays => prevPays.filter(item => item.id !== id));
        } else if (result.dismiss === 'cancel') {
          SweetAlertMessage("Cancelado", "No se ha eliminado el pago", "error");
        }
      });
  }, []);
 
  const addPay = useCallback((e) => {
    alert("enviado")
    e.preventDefault();
    e.stopPropagation();
    const valor = e.target["valor"].value;
    if (valor.length < 5) {
      SweetAlertMessage("Error", "Ingresa un valor a pagar", "error");
      return;
    }
    const newPay = {
      id: `${e.target['metodo_de_pago'].value}-${new Date().toLocaleDateString()}-${valor}`,
      metodo_id: e.target['metodo_de_pago'].value,
      nombre: e.target['metodo_de_pago'][e.target['metodo_de_pago'].value].text,
      valor: parseInt(valor.replace(/[$\.]/g, ''), 10),
      fecha: new Date().toLocaleDateString(),
    };
    setPays(prevPays => [...prevPays, newPay]);
    setSelectedMethod("");
    setInput(0);
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    setIsChecked(e.target.checked);
  }, []);

  const disableButton = useCallback(() => {
    if (data.salida.estado) return true;
    if (totalPagadoGeneral >= data.salida.valor || isChecked) {
      return false;
    }
    return true;
  }, [data.salida.estado, totalPagadoGeneral, data.salida.valor, isChecked]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Formulario 2 enviado");
  };

  if (data.productos.length === 0) return <h3>No se encuentran Productos</h3>;

  const columns = ["Estilo", "Cantidad", "Valor", "Total"];

  return (
    <form onSubmit={handleSave}>
      <div className="stock-genius-detail-salida-container">
        <div>
          {data.salida.estado ? (
            <span className='stock-genius-titles' style={{ color: "green", textTransform: "uppercase" }}>Completado</span>
          ) : (
            <span className='stock-genius-titles' style={{ color: "red", textTransform: "uppercase" }}>Pendiente</span>
          )}
          <span className='stock-genius-sub-titles stock-genius-detail-sailida-label-selected'>{data.cliente.nombre}</span>
        </div>
        <div className='stock-genius-component-table stock-genius-body'>
          <TableDetail columns={columns} data={data.productos} subtotal={data.salida.valor} />
          <hr className="stock-genius-detail-linea-gris" />
        </div>
        <CardPay pays={data.transacciones} handleDeletPay={handleDeletPay} />
        <CardPay pays={pays} handleDeletPay={handleDeletPay} />
        <TotalsSection totalGeneral={data.salida.valor} totalPagado={totalPagadoGeneral} />
        {!data.salida.estado && (
          <>
            {disableButton() && (
              <PaymentForm
                paymentMethods={paymentMethods}
                selectedMethod={selectedMethod}
                input={input}
                handleSelectMethods={handleSelectMethods}
                setInput={setInput}
                addPay={addPay}
              />
            )}
            {(totalPagadoGeneral < data.salida.valor) && (
              <label className='stock-genius-detalle-salida-checkbox'>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Pendiente de pago
              </label>
            )}
          </>
        )}
        <ButtonsModal onClose={onClose} disable={disableButton()} />
      </div>
    </form>
  );
}

export default ModalDetailSale;
