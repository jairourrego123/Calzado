import { useCallback, useMemo, useState } from 'react';
import CardPay from '../CardPay/CardPay';
import './ModalDetail.css';
import TableDetail from '../TableDetail/TableDetail';
import TotalsSection from '../TotalsSetion/TotalsSection';
import PaymentForm from '../PaymentForm/PaymentForm';
import ButtonsModal from '../ButtonsModal/ButtonsModal';
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { sum } from '../../helpers/sum';
import TabsDetail from '../TabsDetail/TabsDetail';
import TableReturn from '../TableReturn/TableReturn';
import TotalSectionReturn from '../TotalSectionReturn/TotalSectionReturn';

function ModalDetail({ onClose, data, handleCloseAll, type, atributo }) {
  const initialData = useMemo(() => [
    { id: 1, nombre: "Transacción Bancolombia" },
    { id: 2, nombre: "Nequi" },
    { id: 3, nombre: "Daviplata" },
    { id: 4, nombre: "Efectivo" },
  ], []);
  console.log("modal detail");
  const [pays, setPays] = useState([]);
  const [returnProducts, setReturnProducts] = useState([])
  const [paymentMethods] = useState(initialData);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [input, setInput] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const totalPagado = useMemo(() => sum(data?.pagos, "valor"), [data?.pagos]);
  const nuevoPago = useMemo(() => sum(pays, "valor"), [pays]);
  const totalPagadoGeneral = useMemo(() => totalPagado + nuevoPago, [totalPagado, nuevoPago]);
  const totalDevuelto = useMemo(() => sum(data?.devolucion, "total"), [data?.devolucion]);
  const totalNuevaDevolucion = useMemo(() => sum(returnProducts, "total"), [returnProducts]);
  const totalDevueltoGeneral = useMemo(() => totalDevuelto + totalNuevaDevolucion, [totalDevuelto, totalNuevaDevolucion]);
  const handleSelectMethods = (e) => {
    setSelectedMethod(e.target.value);
  }
  const tabs = [
    { label: "Resumen" },
    { label: "Detalles" },
    { label: "Devoluciones" },
  ];

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
      [`${type}_id`]: data?.[type]?.id || null,
      metodo_id: e.target['metodo_de_pago'].value,
      nombre: e.target['metodo_de_pago'][e.target['metodo_de_pago'].value].text,
      valor: parseInt(valor.replace(/[$.]/g, ''), 10),
      fecha: new Date().toLocaleDateString(),
    };
    setPays(prevPays => [...prevPays, newPay]);
    setSelectedMethod("");
    setInput(0);
  }, [type, data]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  }

  const disableButton = useCallback(() => {
    if (data[type].estado) return true;
    if (totalPagadoGeneral >= data[type].valor || isChecked) {
      return false;
    }
    return true;
  }, [totalPagadoGeneral, isChecked, type, data]);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    if (data?.[type]?.id) {
      const dataCrearPago = {
        pagos: pays,
        [type]: { estado: totalPagadoGeneral >= data?.[type].valor }
      };
    } else {
      const dataCrearSalida = {
        [type]: {
          valor: data?.[type]?.valor,
          ganancia_total: sum(data.productos, "ganancia_producto"),
          cantidad_total: sum(data.productos, "cantidad"),
          estado: totalPagadoGeneral >= data?.[type].valor,
          [`${atributo}_id`]: data?.[atributo]?.id
        },
        productos: data?.productos,
        pagos: pays
      };
      console.log("datos de guardado:",dataCrearSalida);
    }
    onClose();
    handleCloseAll();
    SweetAlertMessage("¡Éxito!", "Venta registrada satisfactoriamente.", "success");
  }, [type, data, totalPagadoGeneral, pays, onClose, handleCloseAll, atributo]);

  const handleSaveReturn = useCallback((e)=>{
    e.preventDefault();
    if (returnProducts.length>0){
      const data = {
        devolucion:{
          valor:totalNuevaDevolucion,
          tipo: type.toUpperCase(),
        
        },
        productos:returnProducts
      }
      console.log("Produto devolucion enviada:",data);
    }
    else {SweetAlertMessage("Cancelado", "No has agregado ningún producto", "error");}
    

  },[totalNuevaDevolucion,returnProducts,type])
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  if (!data.productos.length) return <h3>No se encuentran Productos</h3>;
  const columns = ["Estilo", "Cantidad", "Valor", "Total"] 

  return (
    <div className="stock-genius-detail-salida-container">
      <div>
        {data?.[type].estado ? (
          <span className='stock-genius-titles' style={{ color: "green", textTransform: "uppercase" }}>Completado</span>
        ) : (
          <span className='stock-genius-titles' style={{ color: "red", textTransform: "uppercase" }}>Pendiente</span>
        )}
        <span className='stock-genius-sub-titles stock-genius-detail-sailida-label-selected'>{data?.[atributo].nombre}</span>
      </div>
      <TabsDetail tabs={tabs} onTabChange={handleTabChange} />

      {selectedTab !== 2 && (
        <div className='stock-genius-component-table stock-genius-body'>

          <TableDetail type={type} columns={columns} data={data?.productos} subtotal={data?.[type].valor} devolucion={data?.devolucion} subtotalDevolucion={totalDevuelto} />
          <hr className="stock-genius-detail-linea-gris" />
        </div>
      )}

      {selectedTab !== 0 && selectedTab !== 2 && (
        <CardPay pays={data?.pagos} handleDeletPay={handleDeletPay} />
      )
      }

      {selectedTab !== 2 && (
        <>

          <CardPay pays={pays} handleDeletPay={handleDeletPay} />
          <TotalsSection totalGeneral={data?.[type].valor} totalPagado={totalPagadoGeneral} />
        </>
      )}

      {!data?.[type].estado && selectedTab !== 2 && (
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
          {(totalPagadoGeneral < data?.[type].valor) && (
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
      {selectedTab === 2 && (
        
        
        <div className='stock-genius-component-table stock-genius-body'>
        
        <TableDetail type={type} columns={columns} data={data?.productos} subtotal={data?.[type].valor}
           devolucion={data?.devolucion} selectedTab={selectedTab}
           setReturnProducts={setReturnProducts} />
          <hr className="stock-genius-detail-linea-gris" />
          
          <TableReturn returnSaved={data?.devolucion} returnProducts={returnProducts} setReturnProducts={setReturnProducts} />
          <hr className="stock-genius-detail-linea-gris" />
          <TotalSectionReturn totalDevolucion={totalDevueltoGeneral} totalGeneral={data?.[type].valor}/>
          <form onSubmit={handleSaveReturn}>
           <ButtonsModal onClose={onClose} disable={returnProducts.length<1} />

        </form>
           </div>

        //  <ReturnProduct type={type} data={data?.productos}/>
      )}
      {selectedTab !== 2 && (
      <form onSubmit={handleSave}>
        <ButtonsModal onClose={onClose} disable={disableButton()} />
      </form>
      )}

      
    </div>
  );
}

export default ModalDetail;
