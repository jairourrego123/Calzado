import Header from "../../../components/Header/Header";
import Search from "../../../components/Search/Search";
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox";
import Mostrar from "../../../components/Mostrar/Mostrar";
import Delete from "../../../components/Delete/Delete";
import Icon from "../../../components/Icon/Icon";
import config from '../../../const/config.json'
import "./Inventario.css";
import { useCallback, useMemo, useState } from "react";
import ModalAddProduct from "../../../components/ModalAddProduct/ModalAddProduct";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect";
import Modal from 'react-modal'; // Importa Modal desde react-modal

Modal.setAppElement('#root'); // Define el elemento raíz de tu aplicación

function Inventario() {

  const initialData = useMemo(() => [
    {
      "id": 1,
      "estilo": "Clásico",
      "color": "Rojo",
      "talla": "40",
      "cantidad": 1,
      "stock_min": 3,
      "estado": false,
      "precio": 100.50,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "estilo": "Moderno",
      "color": "Azul",
      "talla": "42",
      "cantidad": 10,
      "stock_min": 5,
      "estado": true,
      "precio": 75.25,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "estilo": "Vintage",
      "color": "Verde",
      "talla": "39",
      "cantidad": 3,
      "stock_min": 4,
      "estado": false,
      "precio": 150.75,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "estilo": "Industrial",
      "color": "Gris",
      "talla": "41",
      "cantidad": 8,
      "stock_min": 4,
      "estado": true,
      "precio": 200.00,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "estilo": "Rústico",
      "color": "Marrón",
      "talla": "38",
      "cantidad": 5,
      "stock_min": 8,
      "estado": false,
      "precio": 50.00,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "estilo": "Minimalista",
      "color": "Blanco",
      "talla": "39",
      "cantidad": 2,
      "stock_min": 1,
      "estado": true,
      "precio": 300.50,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "estilo": "Escandinavo",
      "color": "Negro",
      "talla": "40",
      "cantidad": 2,
      "stock_min": 4,
      "estado": false,
      "precio": 120.75,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "estilo": "Bohemio",
      "color": "Amarillo",
      "talla": "42",
      "cantidad": 12,
      "stock_min": 6,
      "estado": true,
      "precio": 90.00,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "estilo": "Contemporáneo",
      "color": "Azul Marino",
      "talla": "43",
      "cantidad": 4,
      "stock_min": 12,
      "estado": false,
      "precio": 180.25,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "estilo": "Ecléctico",
      "color": "Rosado",
      "talla": "39",
      "cantidad": 6,
      "stock_min": 3,
      "estado": true,
      "precio": 210.00,
      "fecha": "2024-03-24"
    }
  ],[]);

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

  const handleChangeSelect = useCallback((option) => {
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
    if (selectedRows.length===0) return
    const response = data.filter(item => !selectedRows.includes(item.id));
    setProductos(response);
    setSelectedRows([])
  }, [data, selectedRows]);

  const handleSearchProduct = useCallback((text) => {
    const response = data.filter(data => data.estilo.toLowerCase().includes(text));
    setProductos(response);
  }, [data]);

  return (
    <>
      <div className="stock-genius-inventario-container">
        <div className="stock-genius-inventario-header" style={{ backgroundColor: backgroundPrincipal }}>
          <Header title={"Inventario"} />
          <Search onSearch={handleSearchProduct} />
        </div>
        <div className="stock-genius-inventario-layoth" >

          <Mostrar />
          <GeneralSelect
            id="disponibilidad"
            name="disponibilidad"
            value={selectedAvailable} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeSelect} // Define la función de cambio 

          />


          <Delete onDelete={handleDeleteProduct}/>
          <button className="stock-genius-options stock-genius-button-export">Exportar</button>

          <div className="stock-genius-inventario-add" style={{ backgroundColor: backgroundPrincipal }} onClick={handleOpenModal}>

            <Icon icon={"add"} />
          </div>

          <GeneralModal isOpen={openModal} onClose={handleCloseModal} icon={"product"} title={modifyProduct ? "Modificar producto" : "Nuevo Producto"} layout={modifyProduct ? "Modifica el producto" : "Agrega un nuevo producto."}>
            <ModalAddProduct onClose={handleCloseModal} product={modifyProduct && producto} />
          </GeneralModal>


        </div>

        <div className="stock-genius-inventario-table">
          <TableWithCheckbox data={productos} handleDoubleClick={handleModifyProduct} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} excludedColumns={['id']} />
        </div>
        <div className="stock-genius-inventario-total">
          <span>TOTAL DEL INVENTARIO</span>
          <span>$999.999.000</span>
        </div>
      </div>
    </>
  );
}

export default Inventario;
