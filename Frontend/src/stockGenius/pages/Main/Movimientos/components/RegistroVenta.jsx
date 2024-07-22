import React, { Suspense, useCallback, useMemo, useState } from 'react';
import ProductsSelectedSale from '../../../../components/ProductsSelectedSale/SelectedProductsSale';
import './Registros.css';
import Buttons from '../../../../components/Buttons/Buttons';
import Totals from '../../../../components/Totals/Totals';
import { sum } from '../../../../helpers/sum';
import Salidas from './Salidas/Salidas';
import Entradas from './Entradas/Entradas';
import { getPayMethods } from '../../../../services/finanzas/financeService';

const GeneralModal = React.lazy(() => import('../../../../components/GeneralModal/GeneralModal'));
const ModalDetailSale = React.lazy(() => import('../../../../components/ModalDetail/ModalDetail'));

export default function RegistroVenta({ selectedProducts, handleEliminarProducto, handleCloseAll, ventaProductos, setVentaProductos,selectedTab,type,tabs }) {
  
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataDetailSale, setDataDetailSale] = useState({});
  const [selectedClient, setSelectedClient] = useState('');
  const [nameClient, setNameClient] = useState('');
  const [nameSupplier, setNameSupplier] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  // const [dataModalDetail, setDataModalDetail] = useState({});
 
  const totalVenta = useMemo(() => sum(ventaProductos, "total"), [ventaProductos]);
  const handleCloseModalDetail = useCallback(() => {
    setOpenModalDetail(false);
  }, []);

  const GetListPayments =  async()=>{
    try {
      const response = await getPayMethods()
      return response.results  
    } catch (error) {
      console.error(error); 
    }

  }
  const handleSubmitVenta = useCallback(async (e) => {
    e.preventDefault();

    let data ={}
    data.productos = selectedProducts.map((producto) => ({
      id: producto.id,
      estilo: producto.estilo,
      talla: producto.talla,
      color: producto.color,
      cantidad: ventaProductos[producto.id].cantidad,
      valor_compra: producto.valor_compra,
      valor_venta_producto: ventaProductos[producto.id].valor_venta_producto,
      total: ventaProductos[producto.id].total,
      ganancia: (producto.valor_compra * ventaProductos[producto.id].cantidad) - (ventaProductos[producto.id].total)
    }));
    data.metodos_de_pago = await GetListPayments() || []
    data.pagos=[]
    data.devolucion=[]
    if (selectedTab===0) {
      
      data.venta = {
        valor_neto: totalVenta,
        estado: false
      };
      
      data.cliente = {
        id: selectedClient,
        nombre: nameClient
      };
    }
    if (selectedTab===1){

      data.proveedor = { id: selectedSupplier, nombre: nameSupplier };
      data.entrada = { estado: false, valor_neto:totalVenta };

    }
    console.log(data)
    setDataDetailSale(data);
    setOpenModalDetail(true);
  }, [nameClient, selectedClient, selectedProducts, totalVenta, ventaProductos,nameSupplier,selectedSupplier,selectedTab]);

  return (
    <div>
      <form onSubmit={handleSubmitVenta} className='stock-genius-form-registro'>
        <div className='stock-genius-registro-header'>
         { selectedTab ===0  
          ? <Salidas setNameClient={setNameClient} setSelectedClient={setSelectedClient} handleCloseAll={handleCloseAll} selectedClient={selectedClient} />
          :<Entradas selectedProducts={selectedSupplier} setSelectedSupplier={setSelectedSupplier} setNameSupplier={setNameSupplier} handleCloseAll={handleCloseAll} />
}
          <span className="stock-genius-titles"> Lista de productos</span>
          <span className="stock-genius-layout stock-genius-small-text">Lista de los productos seleccionados desde inventario</span>
        </div>
        <div className='stock-genius-registro-products-selected'>
          <ProductsSelectedSale products={selectedProducts} handleEliminarProducto={handleEliminarProducto} setVentaProductos={setVentaProductos} ventaProductos={ventaProductos} />
        </div>
        <div>
          <Totals value={totalVenta} />
          <Buttons buttonDoneText={selectedTab===0?"Vender":"Ingresar"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />
        </div>
      </form>
      {openModalDetail && (
        <Suspense fallback={<div>Cargando...</div>}>
          <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"} title="Método de Pago" layout={"Valida la información y registra los medios de pago"}>
            <ModalDetailSale onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseAll} type={type[tabs[selectedTab].label]?.["nombre"]} atributo={type[tabs[selectedTab].label]?.["atributo"]} />
          </GeneralModal>
        </Suspense>
      )}
    </div>
  );
}
