import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import ProductsSelectedSale from '../../../../components/ProductsSelectedSale/SelectedProductsSale';
import './Registros.css';
import Buttons from '../../../../components/Buttons/Buttons';
import Totals from '../../../../components/Totals/Totals';
import { sum } from '../../../../helpers/sum';
import Salidas from './Salidas/Salidas';
import Entradas from './Entradas/Entradas';
import { getPayMethods } from '../../../../services/finanzas/financeService';
import { SweetAlertConfirm, SweetAlertMessage } from '../../../../components/SweetAlert/SweetAlert';

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
  const formRef = useRef(null);
  
  const handleCloseModalDetail = useCallback(() => {
    setOpenModalDetail(false);
    setSelectedClient('')
    setNameClient('')
    setSelectedSupplier('')
    setNameSupplier('')
  }, []);

  const GetListPayments =  async()=>{
    try {
      const response = await getPayMethods();
      return response.results  
    } catch (error) {
      console.error(error); 
    }

  }
  const handleOpenDetail = useCallback(async()=>{
    let data ={}
    data.productos = selectedProducts.map((producto) => ({
      id: producto.id,
      estilo: producto.estilo,
      talla: producto.talla,
      color: producto.color,
      cantidad: ventaProductos[producto.id].cantidad,
      valor_ultima_compra: producto.valor_compra,
      valor_venta_producto: ventaProductos[producto.id].valor_venta_producto,
      total: ventaProductos[producto.id].total,
      ganancia:  (ventaProductos[producto.id].total) - (parseFloat(producto.valor_compra)  *parseInt(ventaProductos[producto.id].cantidad))
    }));
    data.metodos_de_pago = await GetListPayments() || []
    data.pagos=[]
    data.devolucion=[]
    if (selectedTab===0) {
      
      data.venta = {
        valor_neto: totalVenta,
        valor_total: totalVenta,
        estado: false
      };
      
      data.cliente = {
        id: selectedClient,
        nombre: nameClient
      };
    }
    if (selectedTab===1){

      data.proveedor = { id: selectedSupplier, nombre: nameSupplier };
      data.entrada = { estado: false, 
        valor_neto:totalVenta,
        valor_total: totalVenta,

       };

    }
    console.log("data enviada",data)
    setDataDetailSale(data);
    setOpenModalDetail(true);
  }, [nameClient, selectedClient, selectedProducts, totalVenta, ventaProductos,nameSupplier,selectedSupplier,selectedTab]);

  const handleSubmitVenta = useCallback(async (e) => {
    e.preventDefault();
    
    if (!selectedClient && !selectedSupplier) {
      if (selectedTab===1) {
        SweetAlertMessage("¡Falta El proveedor!",'Agrega un proveedor para poder continuar.','warning')
        return
      }
      else {
        const result = await SweetAlertConfirm(`¡No deseas asignar ningún ${type[tabs[selectedTab].label]?.["atributo"]}!`);
        if (result.isConfirmed) {
          handleOpenDetail();
        } else if (result.dismiss === 'cancel') {
          return;
        }
      }
    
    } else {
      handleOpenDetail();
    }
  }, [selectedClient, handleOpenDetail,tabs,selectedTab,selectedSupplier,type]);

  const buttonDoneAction = ()=>{
    if (formRef.current) {
      formRef.current.requestSubmit();
  }
  }

  return (
    <div className=''>
      
      <div className='stock-genius-form-registro'>
        <div className='stock-genius-registro-header'>
         { selectedTab ===0  
          ? <Salidas setNameClient={setNameClient} setSelectedClient={setSelectedClient} handleCloseAll={handleCloseAll} selectedClient={selectedClient} />
          :<Entradas selectedProducts={selectedSupplier} setSelectedSupplier={setSelectedSupplier} setNameSupplier={setNameSupplier} handleCloseAll={handleCloseAll} selectedSupplier={selectedSupplier} />
}
          <span className="stock-genius-titles"> Lista de productos</span>
          <span className="stock-genius-layout stock-genius-small-text">Lista de los productos seleccionados desde inventario</span>
        </div>
        <form ref={formRef}  onSubmit={handleSubmitVenta} className='stock-genius-registro-products-selected'>

          <ProductsSelectedSale products={selectedProducts} handleEliminarProducto={handleEliminarProducto} setVentaProductos={setVentaProductos} ventaProductos={ventaProductos} selectedTab={selectedTab}/>
        </form>
        <div>

          <Totals value={totalVenta} />
          <Buttons buttonDoneAction={buttonDoneAction} buttonDoneText={selectedTab===0?"Vender":"Ingresar"} buttonCloseText={"Cerrar"} buttonCloseAction={handleCloseAll} />
        </div>
      </div>
      {openModalDetail && (
          <Suspense >

          <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"} title="Método de Pago" layout={"Valida la información y registra los medios de pago"}>
            <ModalDetailSale onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseAll} type={type[tabs[selectedTab].label]?.["nombre"]} atributo={type[tabs[selectedTab].label]?.["atributo"]} />
          </GeneralModal>
          </Suspense>
   
      )}
    </div>
  );
}
