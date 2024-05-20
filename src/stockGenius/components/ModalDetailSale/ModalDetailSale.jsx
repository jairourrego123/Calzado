import { useCallback, useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import './ModalDetailSale.css';
import TableDetail from '../TableDetail/TableDetail';
import TotalsSection from '../TotalsSetion/TotalsSection';
import PaymentForm from '../PaymentForm/PaymentForm';
import ButtonsModal from '../ButtonsModal/ButtonsModal';
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { sum } from '../../helpers/sum';
function ModalDetailSale({ onClose,data,handleCloseAll }) {
  const initialData = useMemo(() => [
    { id: 1, nombre: "Transacción Bancolombia" },
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo" },
  ], []);



  const [pays, setPays] = useState([]);
  const [paymentMethods] = useState(initialData);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [input, setInput] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const totalPagado = useMemo(() => sum(data?.pagos, "valor"), [data?.pagos]);
  const nuevoPago = useMemo(() => sum(pays, "valor"), [pays]);
  const totalPagadoGeneral = useMemo(() => totalPagado + nuevoPago, [totalPagado, nuevoPago]);

  const handleSelectMethods = (e) => {
    setSelectedMethod(e.target.value);
  }

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
    e.preventDefault();
    const valor = e.target["valor"].value;
    if (valor.length < 4) {
      SweetAlertMessage("Error", "Ingresa un valor a pagar", "error");
      return;
    }
    const newPay = {
      id: `${e.target['metodo_de_pago'].value}-${new Date().toLocaleDateString()}-${valor}`,
      salida_id: data?.salida?.id || null,
      metodo_id: e.target['metodo_de_pago'].value,
      nombre: e.target['metodo_de_pago'][e.target['metodo_de_pago'].value].text,
      valor: parseInt(valor.replace(/[$.]/g, ''), 10),
      fecha: new Date().toLocaleDateString(),
    };
    setPays(prevPays => [...prevPays, newPay]);
    setSelectedMethod("");
    setInput(0);
  }, [data?.salida?.id]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  }

  const disableButton = useCallback(() => {
    if (data.salida.estado) return true;
    if (totalPagadoGeneral >= data.salida.valor || isChecked) {
      return false;
    }
    return true;
  }, [data.salida.estado, totalPagadoGeneral, data.salida.valor, isChecked]);

  const handleSave = useCallback((e)=>{
    
    e.preventDefault()
    if (data?.salida?.id){
      const dataCrearPago={
        pagos:pays,
        salida:{estado:totalPagadoGeneral >= data.salida.valor}
      }
      console.log(dataCrearPago);
    }
    else {
      const dataCrearSalida = {
        salida:{

            valor:data?.salida?.valor,
            ganancia_total:sum(data.productos,"ganancia_producto"),
            cantidad_total:sum(data.productos,"cantidad"),
            estado:totalPagadoGeneral >= data.salida.valor,
            cliente_id:data?.cliente?.id
          },
        productos:data?.productos,
        pagos:pays
      }
      console.log(dataCrearSalida);
    }
    onClose()
    handleCloseAll()
    SweetAlertMessage("¡Éxito!","Venta registrada satisfactoriamente.","success")
  },[data,totalPagadoGeneral,pays,onClose,handleCloseAll])

  if (!data.productos.length) return <h3>No se encuentran Productos</h3>;

  const columns = ["Estilo", "Cantidad", "Valor", "Total"];

  return (
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

        <CardPay pays={data.pagos} handleDeletPay={handleDeletPay} />
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
        <form onSubmit={handleSave}>
        <ButtonsModal onClose={onClose} disable={disableButton()} />
        </form>
      </div>
  );
}

export default ModalDetailSale;
