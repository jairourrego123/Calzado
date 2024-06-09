import { useState } from "react";
import { formatPrice } from "../../helpers/formatPrice";
import SectionReturn from "./SectionReturn/SectionReturn";
import './TableDetail.css';
import { ReactComponent as Return } from "../../../assets/icons/return.svg"
import GeneralModal from "../GeneralModal/GeneralModal";
import ModalAddReturn from "../ModalAddReturn/ModalAddReturn";
function TableDetail({ columns, data, subtotal, type, devolucion = [], subtotalDevolucion = 0, selectedTab, setReturnProducts }) {

  const [openModalAddReturn, setOpenModalReturn] = useState(false)
  const [productToReturn, setProductToReturn] = useState([])
  const handleOpenModal = (row) => {

    setProductToReturn(row)
    setOpenModalReturn(true)

  }
  const handleCloseModal = () => {
    setOpenModalReturn(false)
  }

  console.log("devolucion",devolucion);
  return (
    <table className='stock-genius-table-detail'>
      <thead>
        <tr>
          {columns.map((column, index) => <th key={index} scope='col'>{column}</th>)}
          {selectedTab === 2 && <th>Devolver</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td data-label={"Estilo"}  className={'stock-genius-table-row-left'}>{row.estilo} {row.color} x{row.talla}</td>
            <td data-label={"Cantidad"} className={'stock-genius-table-row'}>{row.cantidad}</td>

            <td data-label={"Valor"} className={'stock-genius-table-row'}>{formatPrice(row?.valor_venta_producto)}</td>
            <td data-label={"Total"}  className={'stock-genius-table-row-right'}>{formatPrice(row?.cantidad * row?.valor_venta_producto)}</td>


            {selectedTab === 2 && (
              <>
                <td className="stock-genius-button-return"  >
                  <Return className="stock-genius-click" onClick={() => handleOpenModal(row)} />
                </td>

              </>
            )
            }
          </tr>
        ))}


        <tr>
          <td colSpan="3" className="stock-genius-table-row-left">Subtotal</td>
          <td className="stock-genius-table-row-right">{formatPrice(subtotal)}</td>
        </tr>


        {selectedTab !== 2 && devolucion.length>0 && <SectionReturn devolucion={devolucion} subtotalDevolucion={subtotalDevolucion} type={type} selectedTab={selectedTab} />}

      </tbody>
      <GeneralModal icon={"product"} isOpen={openModalAddReturn} onClose={handleCloseModal}
        title={"Registrar Devolución"}
        layout={"Ingresa la siguiente informacion para completar el registro."}
      >

        <ModalAddReturn onClose={handleCloseModal} product={productToReturn} setReturnProducts={setReturnProducts} />

      </GeneralModal>
    </table>
  );
}

export default TableDetail;
