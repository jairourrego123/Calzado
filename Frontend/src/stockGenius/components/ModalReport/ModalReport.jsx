import React, { useState } from 'react';
import './ModalReport.css';
import CardReports from '../CardReports/CardReports';
import { formatPrice } from '../../helpers/formatPrice';
import ButtonsModal from "../ButtonsModal/ButtonsModal";
import { SweetAlertConfirm, SweetAlertMessage } from '../SweetAlert/SweetAlert';
import { updateCierre } from '../../services/finanzas/financeService';
import { ReactComponent as ExpandDown } from '../../../assets/icons/expand-down.svg'
import { formatDateFront } from '../../helpers/formatDate';

function ModalReport({ data, onClose, setLoadData }) {
  const { rol } = JSON.parse(localStorage.getItem("usuario"));
  const [visibleProdVentas, setVisibleProdVentas] = useState(false);
  const [visibleProdEntradas, setVisibleProdEntradas] = useState(false);

  // Estados para cada sección de acordeón
  const [isAbonosVentasOpen, setIsAbonosVentasOpen] = useState(false);
  const [isAbonosEntradasOpen, setIsAbonosEntradasOpen] = useState(false);
  const [isGastosOpen, setIsGastosOpen] = useState(false);
  const [isDevolucionesEntradasOpen, setIsDevolucionesEntradasOpen] = useState(false);
  const [isDevolucionesVentasOpen, setIsDevolucionesVentasOpen] = useState(false);
  const [isTransferenciasOpen, setIsTransferenciasOpen] = useState(false);
  const [isTotalesOpen, setIsTotalesOpen] = useState(false);
  const [isIngresosOpen, setIsIngresosOpen] = useState(false); // Estado para Ingresos
  const [isEgresosOpen, setIsEgresosOpen] = useState(false); // Estado para Egresos

  const UpdateAnalisis = async () => {
    try {
      const response = await updateCierre(data?.id, { estado: true });
      return response;
    } catch (error) {
      throw new Error('Error al traer analisis del dia');
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    SweetAlertConfirm("¡No podrá revertir esto!").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await UpdateAnalisis();
          setLoadData((e) => !e);
          SweetAlertMessage("Confirmado", "Haz aprobado correctamente.", "success");
          onClose();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // Función para renderizar un acordeón
  const renderAccordion = (title, isOpen, setIsOpen, content) => (
    <div className={`stock-genius-modal-report-acordeon ${isOpen ? 'open' : ''}`}>
      <div className='stock-genius-modal-report-header stock-genius-click' onClick={() => setIsOpen(!isOpen)}>
        {title}
        <ExpandDown className={`expand-icon ${isOpen ? 'rotate-icon' : ''}`} />
      </div>
      {isOpen && <div className="stock-genius-modal-report-content">{content}</div>}
    </div>
  );

  return (
    <div className='stock-genius-modal-report-container'>
      <div className='stock-genius-modal-report-content-ventas'>
        <div className="stock-genius-modal-report-left-container">
          <div className='stock-genius-modal-report-header'>
            <span>Resumen del {formatDateFront(data?.fecha)}</span>
          </div>
          <span className='stock-genius-body'>Valor de ventas registradas:</span>
          <CardReports data={data?.ventas?.ventas_por_metodo_pago} atributo2={"ventas"} visible={true} />
        </div>
        <div className="stock-genius-modal-report-right-container">
          {renderAccordion(
            `Total de productos vendidos: ${data?.ventas?.total_productos_vendidos} Und`,
            visibleProdVentas,
            setVisibleProdVentas,
            <CardReports data={data?.ventas?.productos_vendidos} atributo2={"productos"} visible={visibleProdVentas} />
          )}
          {renderAccordion(
            `Total de productos ingresados: ${data?.entradas?.total_productos_ingresados} Und`,
            visibleProdEntradas,
            setVisibleProdEntradas,
            <CardReports data={data?.entradas?.productos_ingresados} atributo2={"productos"} visible={visibleProdEntradas} />
          )}
        </div>
      </div>

      <div className='stock-genius-modal-report-content-abonos-gastos'>
        {renderAccordion(
          `Ingresos ${formatPrice(data?.totales?.total_ingresos)}`,
          isIngresosOpen,
          setIsIngresosOpen,
          <div>
            {renderAccordion(
              `Abonos a ventas: ${formatPrice(data?.abonos?.total_abonos_ventas)}`,
              isAbonosVentasOpen,
              setIsAbonosVentasOpen,
              null // Aquí podrías colocar el detalle específico si lo necesitas
            )}
           

                        {renderAccordion(
              `Devoluciones de entradas: ${formatPrice(data?.devoluciones?.total_devoluciones_entradas)}`,
              isDevolucionesEntradasOpen,
              setIsDevolucionesEntradasOpen,
              null
            )}
          </div>
        )}

        {renderAccordion(
          `Egresos ${formatPrice(data?.totales?.total_egresos)}`,
          isEgresosOpen,
          setIsEgresosOpen,
          <div>
            {renderAccordion(
              `Gastos: ${formatPrice(data?.gastos?.total_gastos)}`,
              isGastosOpen,
              setIsGastosOpen,
              null
            )}
             {renderAccordion(
              `Abonos a entradas: ${formatPrice(data?.abonos?.total_abonos_entradas)}`,
              isAbonosEntradasOpen,
              setIsAbonosEntradasOpen,
              null
            )}

            {renderAccordion(
              `Devoluciones de ventas: ${formatPrice(data?.devoluciones?.total_devoluciones_ventas)}`,
              isDevolucionesVentasOpen,
              setIsDevolucionesVentasOpen,
              null
            )}
                        {renderAccordion(
              `Transferencias externas: ${formatPrice(data?.transferencias?.transferencias_externas)}`,
              isTransferenciasOpen,
              setIsTransferenciasOpen,
              null
            )}
          </div>
        )}

        {/* {renderAccordion(
          `Totales`,
          isTotalesOpen,
          setIsTotalesOpen,
          <div>
            <span className='stock-genius-modal-report-totales-generales'>Total ingresos: </span>
            <span className='stock-genius-modal-report-totales-generales'>Total egresos: </span>
            <span className='stock-genius-modal-report-totales-generales'>Total recibido: {formatPrice((data?.totales?.total_ingresos) - (data?.totales?.total_egresos))}</span>
          </div>
        )} */}
      </div>

      {rol === "Administrador" && !data?.estado && (
        <form onSubmit={handleReport}>
          <ButtonsModal onClose={onClose} titleButton='Aprobar' />
        </form>
      )}
    </div>
  );
}

export default React.memo(ModalReport);
