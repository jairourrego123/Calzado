import { useCallback, useEffect, useState } from "react";
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

  const [data, setData] = useState();
  const [selectedTab, setSelectedTab] = useState(0)
  const [openModalTransfer, setOpenModalTransfer] = useState(false)
  const [openModalReport, setOpenModalReport] = useState(false)
  const [openModalMethod, setOpenModalMethod] = useState(false)
  const [dataReport, setDataReport] = useState([])
  const [columns,setColumns]= useState(["referencia","tipo","valor","metodo_pago","regista","fecha"])
  const [decimals,setDecimals]= useState(["valor"])
  // const [extractos, setExtractos] = useState(data);
  const [loadData,setLoadData]=useState(false)
  useEffect(()=>{
    handleTabChange(selectedTab)
    // eslint-disable-next-line
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





  }, [selectedTab]);

  const handleTabChange = async(index,params={}) => {
    setSelectedTab(index)
    switch (index) {
      case 0:
        await GetListMovimientos(params)
        break;
      case 1:
       await  GetListCierre(params)
        break;
      case 2:
       await GetListMetodosDePago(params)
        break;
      case 3:
        await GetListTransferencias(params)
        break;
      default:
        break;
    }


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

  const handleFilterData = async (date) => {
    if (date[0] === null && date[1] === null) return handleTabChange(selectedTab);
    if (date[0] === null || date[1] === null) return;
    handleTabChange(selectedTab,{ fecha_inicio: date[0], fecha_fin: date[1] });
  };

  return (
    // <Header title={"Extractos"}/>
    <div className="stock-genius-general-content">
      <div className="stock-genius-extractos-header">
        <Header title={"Balances"} />
        <Search onSearch={handleSearchExtracto} />
      </div>
      <div className="stock-genius-left-layout">
        <Mostrar />
        <FilterDate handleFilterDate={handleFilterData} />

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
        <ModalAddTransfer onClose={handleCloseModals}setLoadData={setLoadData} />
      </GeneralModal>
      <GeneralModal icon={"product"} isOpen={openModalReport} onClose={handleCloseModals}
        title={"Informe de Fabricante"} layout={"Resumen de las ventas para el fabricante."}>
        <ModalReport onClose={handleCloseModals} data={dataReport} />
      </GeneralModal>

      <GeneralModal icon={"product"} isOpen={openModalMethod} onClose={handleCloseModals}
        title={"Metodos de Pago."} layout={"Registra los métodos de pago que usaras en tu negocio. "}>
        <ModalAddPaymentMethod onClose={handleCloseModals} setLoadData={setLoadData} />
      </GeneralModal>
    </div>
  )
}

export default Balances