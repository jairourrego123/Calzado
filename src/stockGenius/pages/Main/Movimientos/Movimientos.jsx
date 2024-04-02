import { useCallback, useMemo, useState } from "react"
import GeneralSelect from "../../../components/GeneralSelect/GeneralSelect"
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import Search from "../../../components/Search/Search"
import config from '../../../const/config.json'
import './Movimientos.css'
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent"
import Icon from "../../../components/Icon/Icon"
import Table from "../../../components/Table/Table"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import SelectedSpecific from "../../../components/SelectedSpecific/SelectedSpecific"
import TableListProductsSelected from "../../../components/TableListProductsSelected/TableListProductsSelected"
function Movimientos() {
  const initialData = useMemo(() => [
    {
      "id": 1,
      "comprador": "Juan Pérez",
      "cantidad": 5,
      "precio": 100.50,
      "estado": true,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "comprador": "María García",
      "cantidad": 10,
      "precio": 75.25,
      "estado": false,
      "fecha": "2024-03-18"
    },
    {
      "id": 3,
      "comprador": "Pedro Martínez",
      "cantidad": 3,
      "precio": 150.75,
      "estado": true,
      "fecha": "2024-03-19"
    },
    {
      "id": 4,
      "comprador": "Ana López",
      "cantidad": 8,
      "precio": 200.00,
      "estado": false,
      "fecha": "2024-03-21"
    },
    {
      "id": 5,
      "comprador": "Carlos Sánchez",
      "cantidad": 15,
      "precio": 50.00,
      "estado": true,
      "fecha": "2024-03-17"
    },
    {
      "id": 6,
      "comprador": "Laura Rodríguez",
      "cantidad": 2,
      "precio": 300.50,
      "estado": false,
      "fecha": "2024-03-22"
    },
    {
      "id": 7,
      "comprador": "David Fernández",
      "cantidad": 7,
      "precio": 120.75,
      "estado": true,
      "fecha": "2024-03-23"
    },
    {
      "id": 8,
      "comprador": "Sofía Gómez",
      "cantidad": 12,
      "precio": 90.00,
      "estado": false,
      "fecha": "2024-03-19"
    },
    {
      "id": 9,
      "comprador": "Elena Pérez",
      "cantidad": 4,
      "precio": 180.25,
      "estado": true,
      "fecha": "2024-03-25"
    },
    {
      "id": 10,
      "comprador": "Miguel Rodríguez",
      "cantidad": 6,
      "precio": 210.00,
      "estado": false,
      "fecha": "2024-03-24"
    }
  ], []);
  const dataInventario = useMemo(() => [
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
  ], []);

  const initialClients = useMemo(() => [

    { id: 1, nombre: "Juan Pérez", telefono: "123456789", barrio: "Centro" },
    { id: 2, nombre: "María García", telefono: "987654321", barrio: "Laureles" },
    { id: 3, nombre: "Carlos López", telefono: "567891234", barrio: "El Poblado" },
    { id: 4, nombre: "Ana Martínez", telefono: "345678912", barrio: "Envigado" },
    { id: 5, nombre: "Pedro Rodríguez", telefono: "789123456", barrio: "Belén" }


  ], [])
  const [selectedSwitch, setSelectedSwitch] = useState('salidas');
  const [selectedState, setSelectedState] = useState(' ');
  const [selectedClient, setSelectedClient] = useState('')
  const [mostrarRegistroVenta, setMostrarRegistroVenta] = useState(false);
  const [data, setData] = useState(initialData)
  const [clients, setClients] = useState(initialClients)
  const [selectedRows, setSelectedRows] = useState([]);

  const handleIcon = () => {
    setMostrarRegistroVenta((e) => !e)
  }

  const handleChangeSelect = (option) => {
    console.log(option.target.value);
    setSelectedState(option.target.value);
  }
  const handleSwitchChange = (option) => {
    setSelectedSwitch(option);
    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };
  const handleViewMovimineto = (id) => {
    console.log(id);
    alert("Detalles Venta")
  }

  const handleAddProduct = (id) => {
    alert("PRODUCTO AGREGADO:", id)
  }
  const handleCheckboxChange = useCallback((rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter(row => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  }, []);

  const opcionesSeleccionable = [
    { value: " ", label: "Todos" },
    { value: "1", label: "Entregados" },
    { value: "0", label: "Pendientes" }

  ];

  const handleSelectClient = (e) => {
    setSelectedClient(e.target.value)
  }
  return (
    <div className={mostrarRegistroVenta ? "stock-genius-movimientos-container-active" : "stock-genius-movimientos-container-inactive"}>
      <div className="stock-genius-movimientos-container-left">

        <div className="stock-genius-movimientos-left-header" style={{ backgroundColor: config.backgroundPrincipal }}>
          <Header title={"Movimientos"} />
          <Search />
        </div>
        <div className="stock-genius-movimientos-left-layout">
          <Mostrar />
          <GeneralSelect id="estado"
            name="estado"
            value={selectedState} // Asigna el valor seleccionado
            options={opcionesSeleccionable} // Pasa las opciones al componente
            onChange={handleChangeSelect} // Define la función de cambio 
          />
          <div className="switch-wrapper">
            <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} />
          </div>
          <div className="stock-genius-movimientos-buy" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleIcon}>

            <Icon icon={"buy"} />
          </div>
        </div>

        <div className="stock-genius-movimientos-left-table">
          {mostrarRegistroVenta ? <TableWithCheckbox data={dataInventario} handleCheckboxChange={handleCheckboxChange} handleDoubleClick={handleAddProduct} selectedRows={selectedRows} excludedColumns={['id', 'precio']} /> : <Table data={data} handleDoubleClick={handleViewMovimineto} />}



          {/* <TableWithCheckbox data={data} /> */}
        </div>
        <div className="stock-genius-movimientos-left-footer">
          <span>Mostrando 1 a 10 de 100</span>
          <div>
            <button className="stock-genius-movimientos-left-footer-devoluciones">Devoluciones</button>
            <button className="stock-genius-movimientos-left-footer-resumen">Resumen</button>
          </div>
        </div>

      </div>
      <div className={`stock-genius-movimientos-container-right ${mostrarRegistroVenta ? "stock-genius-active" : "stock-genius-inactive"}`}>
        <Icon icon={"arrow-left"} />
        <h1 className="stock-genius-titles" > Clientes</h1>
        <span className="stock-genius-layout" >Agrega un cliente para facturar</span>
        <SelectedSpecific
          id="clientes"
          name="clientes"
          value={selectedClient} // Asigna el valor seleccionado
          options={clients} // Pasa las opciones al componente
          onChange={handleSelectClient} // Define 
        />
        <h1 className="stock-genius-titles" > Lista de Compras</h1>
        <span className="stock-genius-layout" >Lista de los producto seleccinoados desde inventario</span>
        <TableListProductsSelected data={dataInventario}/>
      </div>
    </div>
  )
}

export default Movimientos