import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Delete from "../../../components/Delete/Delete";
import config from '../../../const/config.json'
import "./Inventario.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import ModalAddProduct from "../../../components/ModalAddProduct/ModalAddProduct";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Modal from 'react-modal'; // Importa Modal desde react-modal
import { SweetAlertConfirm, SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"
import FilterDate from "../../../components/FilterDate/FilterDate";
import { deleteItem, deleteItems, getInventory, getSumInventory } from "../../../services/inventario/inventoryService";
import { formatPrice } from "../../../helpers/formatPrice";

Modal.setAppElement('#root'); // Define el elemento raíz de tu aplicación

function Inventario() {



  const [openModal, setOpenModal] = useState(false);
  const [modifyProduct, setModifyProduct] = useState(false);
  const [producto, setProducto] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState(' ');
  const [selectedRows, setSelectedRows] = useState([]);
  const [data] = useState([]);
  const [loadData,setLoadData]=useState(false)
  const [productos, setProductos] = useState([])
  const [totalProducts,setTotalProducts]=useState(0)
  const [page,setPage]=useState(1)
  const { backgroundPrincipal } = config; // Obtiene backgroundPrincipal de config
  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: true, label: "Disponibles" },
    { value: false, label: "Fuera de Stock" }
  ], []);
  useEffect(() => {
    console.log("ejecutando efecto home");
    GetListDataProducts();
    GetTotalInventario()
  }, [loadData]);

  const GetListDataProducts = async (params) => {
    const response = await getInventory({params: params })
    setProductos(response.results);

  };
  const GetTotalInventario = async () => {
    const response = await getSumInventory()
    setTotalProducts(response?.suma_total||0);

  };
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setModifyProduct(false);
  }, []);

  const handleChangeAvailability = useCallback((option) => {
    setSelectedAvailable(option.target.value);
    if (option.target.value === " ") {
      GetListDataProducts();
    } else {
      const available = option.target.value === 'true';
      console.log("available",option.target.value);
      GetListDataProducts({estado:available})
  
    }
  }, [data]);

  const handleCheckboxChange = useCallback((rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter(row => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
      
    });
  }, []);

  const handleModifyProduct = useCallback((id) => {
    const response = productos.filter((item) => item.id === id);
    setProducto(response);
    setOpenModal(true);
    setModifyProduct(true);
  }, [productos]);

  const handleDeleteProduct = useCallback(() => {
    if (selectedRows.length===0) return  SweetAlertMessage("¡No has seleccionado ningun producto!","Selecciona un producto.","warning")
      SweetAlertConfirm("¡No podrá revertir esto!")
    .then((result)=>{
      
      
      if (result.isConfirmed) {
        console.log("selectedRowsDelete",selectedRows);
        if (selectedRows.length>1) {
          const selectedRowsDelete = selectedRows.map((row)=>row.id)
           deleteItems(selectedRowsDelete)
        }
        else{
          deleteItem(selectedRows[0]?.id)
        }
       
        setLoadData(e=>!e)
        setSelectedRows([])
          SweetAlertMessage("Eliminado","Se ha eliminado correctamente.","success")
      }
      else if (
          /* Read more about handling dismissals below */
          result.dismiss === 'cancel'
        ) {
          SweetAlertMessage("Cancelado","Se ha cancelado correctamente","error")
         
  }
      
  })

    
  }, [selectedRows]);

  const handleSearchProduct = useCallback((text) => {
    GetListDataProducts({search:text})
  }, []);


  const columns=["referencia","estilo","color","talla","cantidad","stock_min","estado","valor","fecha"]
  return (
    <>
      <div className="stock-genius-general-content">
        <div className="stock-genius-inventario-header" style={{ backgroundColor: backgroundPrincipal }}>
          <Header title={"Inventario"} />
          <Search onSearch={handleSearchProduct} />
        </div>
        <div className="stock-genius-left-layout" >

          <Mostrar />
          {/* <FilterDate/> */}
          <GeneralSelect
            id="disponibilidad"
            name="Disponibilidad"
            value={selectedAvailable} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeAvailability} // Define la función de cambio 

          />
          <Delete onDelete={handleDeleteProduct}/>
          {/* <button className="stock-genius-options stock-genius-button-export">Exportar</button> */}

          <div className="stock-genius-general-add" style={{ backgroundColor: backgroundPrincipal }} >

          <AddIcon className="stock-genius-click" onClick={handleOpenModal}/>
          </div>

          <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} 
          title={modifyProduct 
            ? "Modificar producto" 
            : "Nuevo Producto"}
            layout={modifyProduct 
            ? "Modifica el producto" 
            : "Agrega un nuevo producto."}>
            <ModalAddProduct onClose={handleCloseModal} product={modifyProduct && producto} setLoadData={setLoadData} />
          </GeneralModal>
        </div>
        <div className="stock-genius-inventario-table">
          <TableWithCheckbox columns={columns} columns_decimals={["valor"]} data={productos} handleDoubleClick={handleModifyProduct} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} excludedColumns={['id']} />
        </div>
        <div className="stock-genius-inventario-total stock-genius-sub-titles">
          <span>TOTAL DEL INVENTARIO</span>
          <span>{formatPrice(totalProducts)}</span>
        </div>
      </div>
    </>
  );
}

export default Inventario;
