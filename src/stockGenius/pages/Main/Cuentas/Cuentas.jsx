import { useCallback, useState } from "react";
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import Mostrar from "../../../components/Mostrar/Mostrar";
import config from "../../../const/config.json"
import Icon from "../../../components/Icon/Icon";
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";
import './Cuentas.css'
import Table from "../../../components/Table/Table";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddTransfer from "../../../components/ModalAddTransfer/ModalAddTransfer";
import ModalReport from "../../../components/ModalReport/ModalReport";


function Cuentas() {
  const initialDataCierres = [
    {
      "id": 1,
      "valor": 5000.75,
      "ganancia": 1000.50,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "valor": 7500.25,
      "ganancia": 1500.75,
      "fecha": "2024-03-21"
    },
    {
      "id": 3,
      "valor": 3000.60,
      "ganancia": 800.25,
      "fecha": "2024-03-22"
    },
    {
      "id": 4,
      "valor": 6000.80,
      "ganancia": 1200.00,
      "fecha": "2024-03-23"
    },
    {
      "id": 5,
      "valor": 4500.45,
      "ganancia": 900.50,
      "fecha": "2024-03-24"
    },
    {
      "id": 6,
      "valor": 8000.30,
      "ganancia": 2000.00,
      "fecha": "2024-03-25"
    },
    {
      "id": 7,
      "valor": 2500.90,
      "ganancia": 600.00,
      "fecha": "2024-03-26"
    },
    {
      "id": 8,
      "valor": 9000.15,
      "ganancia": 2500.75,
      "fecha": "2024-03-27"
    },
    {
      "id": 9,
      "valor": 12000.70,
      "ganancia": 3000.40,
      "fecha": "2024-03-28"
    },
    {
      "id": 10,
      "valor": 1500.85,
      "ganancia": 400.00,
      "fecha": "2024-03-29"
    }
  ];

  const initialDataTransacciones = [
    {
      "id": 1,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Nequi",
      "valor": 5000.75,
      "fecha": "2024-03-20"
    },
    {
      "id": 2,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Daviplata",
      "valor": 7500.25,
      "fecha": "2024-03-21"
    },
    {
      "id": 3,
      "cuenta_origen": "Efectivo",
      "cuenta_destino": "Bancolombia",
      "valor": 3000.60,
      "fecha": "2024-03-22"
    },
    {
      "id": 4,
      "cuenta_origen": "Daviplata",
      "cuenta_destino": "Efectivo",
      "valor": 6000.80,
      "fecha": "2024-03-23"
    },
    {
      "id": 5,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Bancolombia",
      "valor": 4500.45,
      "fecha": "2024-03-24"
    },
    {
      "id": 6,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Daviplata",
      "valor": 8000.30,
      "fecha": "2024-03-25"
    },
    {
      "id": 7,
      "cuenta_origen": "Efectivo",
      "cuenta_destino": "Nequi",
      "valor": 2500.90,
      "fecha": "2024-03-26"
    },
    {
      "id": 8,
      "cuenta_origen": "Daviplata",
      "cuenta_destino": "Bancolombia",
      "valor": 9000.15,
      "fecha": "2024-03-27"
    },
    {
      "id": 9,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Efectivo",
      "valor": 12000.70,
      "fecha": "2024-03-28"
    },
    {
      "id": 10,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Nequi",
      "valor": 1500.85,
      "fecha": "2024-03-29"
    }
  ]
  
  const [data,setData] = useState(initialDataCierres);
  const [selectedSwitch, setSelectedSwitch] = useState('salidas');
  const [openModalTransfer,setOpenModalTransfer]=useState(false)
  const [openModalReport,setOpenModalReport]=useState(false)
  const [dataReport,setDataReport]=useState([])
  // const [extractos, setExtractos] = useState(data);


  const handleSearchExtracto = useCallback((text) => {

    if (text==='') {
      selectedSwitch==="Transferencias"?setData(initialDataTransacciones):setData(initialDataCierres);
    }
    if(selectedSwitch==="Transferencias"){

      const response = data.filter(data => data.cuenta_origen.toLowerCase().includes(text) || data.cuenta_destino.toLowerCase().includes(text) );
      setData(response);
    }


    

  }, [data]);

  const handleSwitchChange = (option) => {
    if(option==="Transferencias"){
      setData(initialDataTransacciones)
    }
    else {
      setData(initialDataCierres)
    }
    setSelectedSwitch(option);

    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };

  const handleCloseModals = ()=>{
    setOpenModalTransfer(false)
    setOpenModalReport(false)
  }

  const handleOpenModals = ()=>{
    if(selectedSwitch==="Transferencias"){
      setOpenModalTransfer(true)
    }
    else{
      setOpenModalReport(true)
    }
  }

  const handleViewReport = (id)=>{
    if(selectedSwitch!=="Transferencias"){
    const data = 
      {
          "movimientos": [
            {
              "nombre": "Transacción Bancolombia",
              "valor": 1500000
            },
            {
              "nombre": "Nequi",
              "valor": 1200000
            },
            {
              "nombre": "Daviplata",
              "valor": 1800000
            },
            {
              "nombre": "Efectivo",
              "valor": 2000000
            },
            {
              "nombre": "Tarjeta Credito",
              "valor": 2500000
            }
          ],
          "productos": [
            {
              "nombre": "Deportivo Negro x42",
              "cantidad": 10
            },
            {
              "nombre": "Formal Marrón x40",
              "cantidad": 5
            },
            {
              "nombre": "Casual Blanco x38",
              "cantidad": 7
            },
            {
              "nombre": "Invierno Gris x44",
              "cantidad": 4
            },
            {
              "nombre": "Elegante Rojo x37",
              "cantidad": 6
            },
            {
              "nombre": "Casual Azul x41",
              "cantidad": 8
            },
            {
              "nombre": "Casual Negro x39",
              "cantidad": 12
            },
            {
              "nombre": "Trabajo Amarillo x43",
              "cantidad": 3
            },
            {
              "nombre": "Deportivo Verde x40",
              "cantidad": 9
            },
            {
              "nombre": "Aventura Marrón x45",
              "cantidad": 2
            }
          ]
        }
    setOpenModalReport(true)    
    setDataReport(data)
  }
  }
  return (
    // <Header title={"Extractos"}/>
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Cuentas"}/>
        <Search onSearch={handleSearchExtracto}/>
      </div>
      <div className="stock-genius-extractos-layoth">
          <Mostrar />
          <div className="switch-wrapper">
            <SwitchComponent onChange={handleSwitchChange} selectedSwitch={selectedSwitch} options={["Cierres de Caja","Transferencias"]}/>
          </div>
          <div className="stock-genius-general-add" style={{ backgroundColor: config.backgroundPrincipal }} onClick={handleOpenModals} >
            <Icon  icon={"add"}   />
          </div>

        </div>

        <div className="stock-genius-table">
        <Table data={data} handleDoubleClick={handleViewReport}  />
        
        </div>
        <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>
          
        </div>
        <GeneralModal icon={"product"} isOpen={openModalTransfer} onClose={handleCloseModals} 
        title={"Transferencia"}  layout={"Realiza  transferencias entre metodos de pago existentes."}>
          <ModalAddTransfer onClose={handleCloseModals}/>
        </GeneralModal>
        <GeneralModal icon={"product"} isOpen={openModalReport} onClose={handleCloseModals} 
        title={"Informe de Fabricante"}  layout={"Resumen de las ventas para el fabricante."}>
          <ModalReport onClose={handleCloseModals} data={dataReport}/>
        </GeneralModal>
    </div>
  )
}

export default Cuentas