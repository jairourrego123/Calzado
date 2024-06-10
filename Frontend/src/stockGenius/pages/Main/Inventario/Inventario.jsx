import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Delete from "../../../components/Delete/Delete";
import config from '../../../const/config.json'
import "./Inventario.css";
import { useCallback, useMemo, useState } from "react";
import ModalAddProduct from "../../../components/ModalAddProduct/ModalAddProduct";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Modal from 'react-modal'; // Importa Modal desde react-modal
import { SweetAlertConfirm, SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import {ReactComponent as AddIcon} from "../../../../assets/icons/add.svg"
import FilterDate from "../../../components/FilterDate/FilterDate";

Modal.setAppElement('#root'); // Define el elemento raíz de tu aplicación

function Inventario() {

  const initialData = useMemo(() => [
    {
      "id": 1,
      "estilo": "Clásico de lo mas clasico que hay en el mundo es por eso que es tan clasico ",
      "color": "Rojo",
      "talla": "40",
      "cantidad": 1,
      "stock_min": 3,
      "estado": false,
      "valor": 100050,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "estilo": "Moderno",
      "color": "Negro",
      "talla": "38",
      "cantidad": 3,
      "stock_min": 5,
      "estado": true,
      "valor": 750000,
      "fecha": "2024-03-21"
    },
    {
      "id": 3,
      "estilo": "Deportivo",
      "color": "Azul",
      "talla": "42",
      "cantidad": 5,
      "stock_min": 8,
      "estado": true,
      "valor": 120075,
      "fecha": "2024-03-22"
    },
    {
      "id": 4,
      "estilo": "Urbano",
      "color": "Amarillo",
      "talla": "36",
      "cantidad": 2,
      "stock_min": 4,
      "estado": false,
      "valor": 90000,
      "fecha": "2024-03-23"
    },
    {
      "id": 5,
      "estilo": "Elegante",
      "color": "Negro",
      "talla": "44",
      "cantidad": 4,
      "stock_min": 6,
      "estado": true,
      "valor": 150000,
      "fecha": "2024-03-24"
    },
    {
      "id": 6,
      "estilo": "Casual",
      "color": "Gris",
      "talla": "38",
      "cantidad": 3,
      "stock_min": 5,
      "estado": false,
      "valor": 85050,
      "fecha": "2024-03-25"
    },
    {
      "id": 7,
      "estilo": "Deportivo",
      "color": "Rojo",
      "talla": "42",
      "cantidad": 2,
      "stock_min": 4,
      "estado": true,
      "valor": 110000,
      "fecha": "2024-03-26"
    },
    {
      "id": 8,
      "estilo": "Urbano",
      "color": "Negro",
      "talla": "36",
      "cantidad": 1,
      "stock_min": 3,
      "estado": false,
      "valor": 95075,
      "fecha": "2024-03-27"
    },
    {
      "id": 9,
      "estilo": "Clásico",
      "color": "Blanco",
      "talla": "40",
      "cantidad": 5,
      "stock_min": 7,
      "estado": true,
      "valor": 130025,
      "fecha": "2024-03-28"
    },
    {
      "id": 10,
      "estilo": "Elegante",
      "color": "Rojo",
      "talla": "44",
      "cantidad": 2,
      "stock_min": 4,
      "estado": false,
      "valor": 140050,
      "fecha": "2024-03-29"
    }
  ]
  ,[]);

  const [openModal, setOpenModal] = useState(false);
  const [modifyProduct, setModifyProduct] = useState(false);
  const [producto, setProducto] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState(' ');
  const [selectedRows, setSelectedRows] = useState([]);
  const [data] = useState(initialData);
  const [productos, setProductos] = useState(data)

  const { backgroundPrincipal } = config; // Obtiene backgroundPrincipal de config

  const opcionesSeleccionable = useMemo(() => [
    { value: " ", label: "Todos" },
    { value: true, label: "Disponibles" },
    { value: false, label: "Fuera de Stock" }
  ], []);

  

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
      setProductos(data);
    } else {
      const available = option.target.value === 'true';
      const response = data.filter(dato => dato.estado === available);
      setProductos(response);
    }
  }, [data]);

  const handleCheckboxChange = useCallback((rowIndex) => {
    console.log(rowIndex);
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
        const response = data.filter(item => !selectedRows.includes(item));
        console.log("productos eliminados ",response);
        setProductos(response);
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

    
  }, [data, selectedRows]);

  const handleSearchProduct = useCallback((text) => {
    const response = data.filter(data => data.estilo.toLowerCase().includes(text));
    setProductos(response);
  }, [data]);

  return (
    <>
      <div className="stock-genius-general-content">
        <div className="stock-genius-inventario-header" style={{ backgroundColor: backgroundPrincipal }}>
          <Header title={"Inventario"} />
          <Search onSearch={handleSearchProduct} />
        </div>
        <div className="stock-genius-left-layout" >

          <Mostrar />
          <FilterDate/>
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
            <ModalAddProduct onClose={handleCloseModal} product={modifyProduct && producto} />
          </GeneralModal>
        </div>
        <div className="stock-genius-inventario-table">
          <TableWithCheckbox data={productos} handleDoubleClick={handleModifyProduct} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} excludedColumns={['id']} />
        </div>
        <div className="stock-genius-inventario-total stock-genius-sub-titles">
          <span>TOTAL DEL INVENTARIO</span>
          <span>$999.999.000</span>
        </div>
      </div>
    </>
  );
}

export default Inventario;