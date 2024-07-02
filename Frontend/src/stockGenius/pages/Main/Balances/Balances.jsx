import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import Mostrar from "../../../components/Mostrar/Mostrar";
import './Balances.css'
import Table from "../../../components/Table/Table";
import GeneralModal from "../../../components/GeneralModal/GeneralModal";
import ModalAddTransfer from "../../../components/ModalAddTransfer/ModalAddTransfer";
import ModalReport from "../../../components/ModalReport/ModalReport";
import Tabs from "../../../components/Tabs/Tabs";
import ModalAddPaymentMethod from "../../../components/ModalAddPaymentMethod/ModalAddPaymentMethod";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg"
import FilterDate from "../../../components/FilterDate/FilterDate";
import { getCierres, getMovimientos, getPayMethods, getTransferencias } from "../../../services/finanzas/financeService";


function Balances() {
  const initialDataCierres = useMemo(()=>[
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
  ],[]);

  const initialDataTransacciones = useMemo(()=> [
    {
      "id": 1,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Nequi",
      "valor": 5000.75,
      "descripcion": "Transferencia por pago de servicios",
      "fecha": "2024-03-20",
    },
    {
      "id": 2,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Daviplata",
      "valor": 7500.25,
      "descripcion": "Transferencia por compras en línea",
      "fecha": "2024-03-21",
    },
    {
      "id": 3,
      "cuenta_origen": "Efectivo",
      "cuenta_destino": "Bancolombia",
      "valor": 3000.60,
      "descripcion": "Depósito en cuenta bancaria",
      "fecha": "2024-03-22",
    },
    {
      "id": 4,
      "cuenta_origen": "Daviplata",
      "cuenta_destino": "Efectivo",
      "valor": 6000.80,
      "descripcion": "Retiro de efectivo para gastos",
      "fecha": "2024-03-23",
    },
    {
      "id": 5,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Bancolombia",
      "valor": 4500.45,
      "descripcion": "Transferencia para ahorro",
      "fecha": "2024-03-24",
    },
    {
      "id": 6,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Daviplata",
      "valor": 8000.30,
      "descripcion": "Pago de servicios públicos",
      "fecha": "2024-03-25",
    },
    {
      "id": 7,
      "cuenta_origen": "Efectivo",
      "cuenta_destino": "Nequi",
      "valor": 2500.90,
      "descripcion": "Recarga de cuenta para compras",
      "fecha": "2024-03-26",
    },
    {
      "id": 8,
      "cuenta_origen": "Daviplata",
      "cuenta_destino": "Bancolombia",
      "valor": 9000.15,
      "descripcion": "Transferencia de ahorro",
      "fecha": "2024-03-27",
    },
    {
      "id": 9,
      "cuenta_origen": "Nequi",
      "cuenta_destino": "Efectivo",
      "valor": 12000.70,
      "descripcion": "Retiro de efectivo para viaje",
      "fecha": "2024-03-28",
    },
    {
      "id": 10,
      "cuenta_origen": "Bancolombia",
      "cuenta_destino": "Nequi",
      "valor": 1500.85,
      "descripcion": "Transferencia por pago de suscripción",
      "fecha": "2024-03-29",
    }
  ],[]);






  const [data, setData] = useState();
  const [selectedTab, setSelectedTab] = useState(0)
  const [openModalTransfer, setOpenModalTransfer] = useState(false)
  const [openModalReport, setOpenModalReport] = useState(false)
  const [openModalMethod, setOpenModalMethod] = useState(false)
  const [dataReport, setDataReport] = useState([])
  const [columns,setColumns]= useState(["referencia","tipo","valor","metodo_pago","regista","fecha"])
  const [decimals,setDecimals]= useState(["referencia","tipo","valor","metodo_pago","regista","fecha"])
  // const [extractos, setExtractos] = useState(data);
  const [loadData,setLoadData]=useState(false)
  useEffect(()=>{
    handleTabChange(selectedTab)
  },[loadData])
  const handleSearchExtracto = useCallback(async(text) => {

    switch (selectedTab) {
      case 0:
        await GetListMovimientos({search:text})
        break;
      case 1:
       await  GetListCierre({search:text})
        break;
      case 2:
       await GetListMetodosDePago({search:text})
        break;
      case 3:
        await GetListTransferencias({search:text})
        break;
      default:
        break;
    }





  }, [data,selectedTab]);

  const handleTabChange = async(index) => {
    switch (index) {
      case 0:
        await GetListMovimientos()
        break;
      case 1:
       await  GetListCierre()
        break;
      case 2:
       await GetListMetodosDePago()
        break;
      case 3:
        await GetListTransferencias()
        break;
      default:
        break;
    }

    setSelectedTab(index)

    // Aquí puedes realizar otras acciones según la opción seleccionada, como cambiar la visualización de datos, etc.
  };
  const GetListMovimientos = async (params={}) => {
    setColumns(["referencia","tipo","valor","metodo_pago","registra","fecha"])
    setDecimals(["valor"])
    const response = await getMovimientos({params:params})
    setData(response.results);

  };
  const GetListCierre = async (params={}) => {
    setColumns(["valor","ganancia","fecha"])
    setDecimals(["valor","ganancia"])
    const response = await getCierres({params:params})
    setData(response.results);

  };
  const GetListMetodosDePago = async (params={}) => {
    setColumns(["metodo_pago","saldo_actual","ultima_modificacion"])
    setDecimals(["saldo_actual"])
    const response = await getPayMethods({params:params})
    setData(response.results);

  };
  const GetListTransferencias = async (params={}) => {
    setColumns(["cuenta_origen","cuenta_destino","valor","descripcion","fecha"])
    setDecimals(["valor"])
    const response = await getTransferencias({params:params})
    setData(response.results);

  };

  const handleCloseModals = () => {
    setOpenModalTransfer(false)
    setOpenModalReport(false)
    setOpenModalMethod(false)
  }

  const handleOpenModals = () => {

    switch (selectedTab) {

      case 1:
        viewReport()
        break;
      case 2:
        setOpenModalMethod(true)
        break;
      case 3:
        setOpenModalTransfer(true)
        break;
      default:
        break;
    }

  }
  const tabs = [
    { label: "Movimientos" },
    { label: "Cierres" },
    { label: "Metodos de pago " },
    { label: "Transferencias Internas" }

  ];

  const viewReport = (id) => {

    const data =
    {
      "ventas": [
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
      ],
      "abonos":{"valor":200000},
      "gastos":{"valor":500000},

      

      

    }
    setOpenModalReport(true)
    setDataReport(data)
  }
  const handleDoubleClick = () => {
    if (selectedTab === 1) {
      viewReport()
    }
  }

  return (
    // <Header title={"Extractos"}/>
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Balances"} />
        <Search onSearch={handleSearchExtracto} />
      </div>
      <div className="stock-genius-left-layout">
        <Mostrar />
        <FilterDate />

        {
          selectedTab !== 0 &&
          <div className="stock-genius-general-add" >
            <AddIcon className="stock-genius-click" onClick={handleOpenModals} />
          </div>
        }

      </div>
      <div className="stock-genius-tabs-and-table  stock-genius-balances">
        <Tabs tabs={tabs} onTabChange={handleTabChange} />
        <Table data={data} columns={columns} columns_decimals={decimals} handleDoubleClick={handleDoubleClick} />

      </div>
      <div className="stock-genius-gastos-footer">
        <span>Mostrando 1 a 10 de 100</span>

      </div>
      <GeneralModal icon={"product"} isOpen={openModalTransfer} onClose={handleCloseModals}
        title={"Transferencia"} layout={"Realiza  transferencias entre metodos de pago existentes."}>
        <ModalAddTransfer onClose={handleCloseModals} />
      </GeneralModal>
      <GeneralModal icon={"product"} isOpen={openModalReport} onClose={handleCloseModals}
        title={"Informe de Fabricante"} layout={"Resumen de las ventas para el fabricante."}>
        <ModalReport onClose={handleCloseModals} data={dataReport} />
      </GeneralModal>

      <GeneralModal icon={"product"} isOpen={openModalMethod} onClose={handleCloseModals}
        title={"Metodos de Pago."} layout={"Registra los métodos de pago que usaras en tu negocio. "}>
        <ModalAddPaymentMethod onClose={handleCloseModals} />
      </GeneralModal>
    </div>
  )
}

export default Balances