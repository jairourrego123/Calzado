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
import { addPaySale, addSale } from '../../services/ventas/salesService';
import { addReturn } from '../../services/devoluciones/returnService';
import { addEntry, addPayEntry } from '../../services/entradas/entryService';

function ModalDetail({ onClose, data, handleCloseAll, type, atributo,handleUpdateData }) {
  const [pays, setPays] = useState([]);
  const [returnProducts, setReturnProducts] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const paymentMethods = useMemo(() => data?.metodos_de_pago, [data]);
  const totalPagado = useMemo(() => sum(data?.pagos, "valor"), [data?.pagos]);
  const nuevoPago = useMemo(() => sum(pays, "valor"), [pays]);
  const totalPagadoGeneral = useMemo(() => totalPagado + nuevoPago, [totalPagado, nuevoPago]);
  const totalDevuelto = useMemo(() => sum(data?.devolucion, "valor_total"), [data?.devolucion]);
  const totalNuevaDevolucion = useMemo(() => sum(returnProducts, "valor_total"), [returnProducts]);
  const totalDevueltoGeneral = useMemo(() => totalDevuelto + totalNuevaDevolucion, [totalDevuelto, totalNuevaDevolucion]);
  const tabs = useMemo(()=>[
    { label: "Resumen" },
    { label: "Detalles" },
    { label: "Devoluciones" },
  ],[]);
  const handleSelectMethods = (e) => setSelectedMethod(e.target.value);
  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);

  const handleDeletPay = useCallback((id) => {
    SweetAlertConfirm("¡No podrás revertir este pago!").then((result) => {
      if (result.isConfirmed) {
        setPays((prevPays) => prevPays.filter((item) => item.id !== id));
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
      [`${type}`]: data?.[type]?.id || null,
      metodo_id: e.target['metodo_de_pago'].value,
      metodo_de_pago: e.target['metodo_de_pago'].value,
      metodo_pago: e.target['metodo_de_pago'].options[e.target['metodo_de_pago'].selectedIndex].text,
      valor: parseFloat(valor.replace(/[$.]/g, '')),
      fecha: new Date().toLocaleDateString(),
    };
    setPays((prevPays) => [...prevPays, newPay]);
    setSelectedMethod("");
  }, [type, data]);

  const disableButton = useCallback(() => {
    if (data?.[type].estado) return true;
    if (parseFloat(totalPagadoGeneral) >= parseFloat(data?.[type].valor_neto) || isChecked) {
      return false;
    }
    return true;
  }, [totalPagadoGeneral, isChecked, type, data]);

  const handleAddPaySale = async (data) => {
    try {
      await addPaySale(data);
    } catch (error) {
      throw new Error('Error al añadir el pago de la venta');
    }
  };

  const handleAddPayEntry = async (data) => {
    try {
      await addPayEntry(data);
    } catch (error) {
      throw new Error('Error al añadir el pago de la entrada');
    }
  };

  const handleAddSale = async (data) => {
    try {
      await addSale(data);
    } catch (error) {
      throw new Error('Error al añadir la venta');
    }
  };

  const handleAddEntry = async (data) => {
    try {
      await addEntry(data);
    } catch (error) {
      throw new Error('Error al añadir la venta');
    }
  };
  const handleSave = useCallback(async (e) => {
    e.preventDefault();


    try {
      const createData = () => {
        if (data?.[type]?.id) {
         
          return {
            pagos: pays,
            [type]: {
              id: data[type].id,
              estado: parseFloat(totalPagadoGeneral) >= parseFloat(data[type].valor_neto),
            },
          };
        } else {
          return {
            [type]: {
              valor: data[type].valor_neto,
              ganancia_total: sum(data.productos, "ganancia"),
              cantidad_total: sum(data.productos, "cantidad"),
              estado: parseFloat(totalPagadoGeneral) >= parseFloat(data[type].valor_neto),
              [`${atributo}_id`]: parseInt(data[atributo].id),
            },
            productos: data.productos,
            pagos: pays,  
          };
        }
      };
      const dataCrearPago = createData();
        //console.log(JSON.stringify(dataCrearPago));
        //console.log(type);
      if (data?.[type]?.id) {
        //console.log("datos de pago")
        //console.log(JSON.stringify(dataCrearPago));
        if (type==="entrada") {
          await handleAddPayEntry(dataCrearPago)

        }

        if (type==="venta") {
          await handleAddPaySale(dataCrearPago);

        }
        SweetAlertMessage("¡Éxito!", "Pago registrado satisfactoriamente.", "success");
      } else {

        if (type==="entrada") {
          await handleAddEntry(dataCrearPago)
          SweetAlertMessage("¡Éxito!", "Entrada registrada satisfactoriamente.", "success");
        }

        if (type==="venta") {
                await handleAddSale(dataCrearPago);
                SweetAlertMessage("¡Éxito!", "Venta registrada satisfactoriamente.", "success");

        }
      }
    
      onClose();
      handleCloseAll();
      handleUpdateData();
      
      
    } catch (error) {
      console.error(error.message);

    }
  }, [type, data, totalPagadoGeneral, pays, onClose, handleCloseAll, atributo,handleUpdateData]);

  const handleAddReturn = async (data) => {
    try {
      await addReturn(data);
    } catch (error) {
      throw new Error('Error al añadir la devolución');
    }
  };

  const handleSaveReturn = useCallback(async (e) => {
    e.preventDefault();
    if (returnProducts.length > 0) {
      const dataReturn = {
        devolucion: {
          valor_total: totalNuevaDevolucion,
          tipo: type.toUpperCase(),
          referencia: data[type]?.orden,
        },
        productos: returnProducts,
      };
      try {
        //console.log("datareturn",JSON.stringify(dataReturn));
        await handleAddReturn(dataReturn);
        onClose();
        handleCloseAll();
        SweetAlertMessage("¡Éxito!", "Devolución registrada satisfactoriamente.", "success");
      } catch (error) {
        SweetAlertMessage("¡Error!", error.message, "error");
      }
    } else {
      SweetAlertMessage("Cancelado", "No has agregado ningún producto", "error");
    }
  }, [totalNuevaDevolucion, returnProducts, type, onClose, handleCloseAll,data]);

  const handleTabChange = (index) => setSelectedTab(index);

  if (!data.productos.length) return <h3>No se encuentran Productos</h3>;
  const columns = ["Estilo", "Cantidad", "Valor", "Total"];

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
          <TableDetail type={type} columns={columns} data={data?.productos} subtotal={data?.[type].valor_total} devolucion={data?.devolucion} subtotalDevolucion={totalDevuelto} />
          <hr className="stock-genius-detail-linea-gris" />
        </div>
      )}

      {selectedTab !== 0 && selectedTab !== 2 && (
        <CardPay pays={data?.pagos} handleDeletPay={handleDeletPay} />
      )}

      {selectedTab !== 2 && (
        <>
          <CardPay pays={pays} handleDeletPay={handleDeletPay} />
          <TotalsSection totalGeneral={data?.[type].valor_neto} totalPagado={totalPagadoGeneral} />
        </>
      )}

      {!data?.[type].estado && selectedTab !== 2 && (
        <>
          {disableButton() && (
            <PaymentForm
              paymentMethods={paymentMethods}
              selectedMethod={selectedMethod}
              handleSelectMethods={handleSelectMethods}
              addPay={addPay}
              totalGeneral = {parseFloat(data?.[type].valor_neto)}
            />
          )}
          {(totalPagadoGeneral < data?.[type]?.valor_neto) && (
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
          <TableDetail type={type} columns={columns} data={data?.productos} subtotal={data?.[type].valor_neto}
            devolucion={data?.devolucion} selectedTab={selectedTab}
            setReturnProducts={setReturnProducts} />
          <hr className="stock-genius-detail-linea-gris" />
          <TableReturn returnSaved={data?.devolucion} returnProducts={returnProducts} setReturnProducts={setReturnProducts} />
          <hr className="stock-genius-detail-linea-gris" />
          <TotalSectionReturn totalDevolucion={totalDevueltoGeneral} totalGeneral={data?.[type].valor_neto} />
          <form onSubmit={handleSaveReturn}>
            <ButtonsModal onClose={onClose} disable={returnProducts.length < 1} />
          </form>
        </div>
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
