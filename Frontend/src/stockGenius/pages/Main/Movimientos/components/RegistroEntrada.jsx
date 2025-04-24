import {useState, lazy, Suspense } from 'react';
import ProductsSelectedEntry from '../../../../components/ProductsSelectedEntry/ProductsSelectedEntry';
import Buttons from '../../../../components/Buttons/Buttons';
import { formatPrice } from '../../../../helpers/formatPrice';
import Entradas from './Entradas/Entradas';

// Lazy load components
const GeneralModal = lazy(() => import('../../../../components/GeneralModal/GeneralModal'));
const ModalDetailSale = lazy(() => import('../../../../components/ModalDetail/ModalDetail'));

function RegistroEntrada({ selectedProducts, handleCloseAll, handleEliminarProducto, totalEntrada, setTotalEntrada }) {


  const [nameSupplier, setNameSupplier] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataModalDetail, setDataModalDetail] = useState({});




  const handleSubmitEntrada = (e) => {
    e.preventDefault();
    const productos = selectedProducts.map(producto => ({
      id: producto.id,
      estilo: producto.estilo,
      talla: producto.talla,
      color: producto.color,
      cantidad: e.target[`cantidad-${producto.id}`].value
    }));

    const valor = parseInt(e.target["total"].value.replace(/[$.]/g, ''));
    const entrada = { estado: false, valor };
    const proveedor = { id: selectedSupplier, nombre: nameSupplier };
    const data = { productos, pagos: [], entrada, proveedor };
    //console.log(data);
    setDataModalDetail(data);
    setOpenModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const handleChangeTotal = (e) => {
    setTotalEntrada(formatPrice(e.target.value));
  };

  return (
    <div>
      <form onSubmit={handleSubmitEntrada} className='stock-genius-form-registro'>
        <div className='stock-genius-registro-header'>
          <Entradas selectedProducts={selectedSupplier} setSelectedSupplier={setSelectedSupplier} setNameSupplier={setNameSupplier} handleCloseAll={handleCloseAll} />
          <span className="stock-genius-titles"> Lista de productos</span>
          <span className="stock-genius-layout stock-genius-small-text">Lista de los productos seleccionados desde inventario</span>
        </div>
        <div className='stock-genius-registro-products-selected'>
          <ProductsSelectedEntry products={selectedProducts} handleEliminarProducto={handleEliminarProducto} />
        </div>
        <div>
          <div>
            <span>TOTAL :</span>
            <input
              type='text'
              className='stock-genius-titles stock-genius-registro-text'
              placeholder={"Ingresa Total"}
              name={`total`}
              value={totalEntrada}
              onChange={(e) => handleChangeTotal(e)}
              required
            />
          </div>
          <Buttons buttonDoneText={"Guardar"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />
        </div>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
       
        {openModalDetail && (
          <GeneralModal
            isOpen={openModalDetail}
            icon={"product"}
            onClose={handleCloseModalDetail}
            title={"Metodo de pago"}
            layout={"Valida la información y registra los medios de pago."}
          >
            <ModalDetailSale onClose={handleCloseModalDetail} handleCloseAll={handleCloseAll} data={dataModalDetail} type={"entrada"} atributo={"proveedor"} />
          </GeneralModal>
        )}
      </Suspense>
    </div>
  );
}

export default RegistroEntrada;
