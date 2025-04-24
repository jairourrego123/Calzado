import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { getDetailSpend, getSales } from '../../services/ventas/salesService'
import { getDetailEntry, getEntries } from '../../services/entradas/entryService'
import GeneralModal from '../GeneralModal/GeneralModal'
import ModalDetail from '../ModalDetail/ModalDetail'
import Table from '../Table/Table'
import Paginations from '../Paggination/Paginations'
import GeneralSelect from '../GeneralSelect/GeneralSelect'
function ModalDataUsers({selectedSwitch,selectedClient,loadClients}) {
    const [dataMovimientos,setDataMovimientos]=useState([])
    const [colums,setColumns]=useState([])
    const [decimals,setDecimals] = useState([])
    const [page,setPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)
    const [openModalDetail,setOpenModalDetail] = useState(false)
    const [loadData,setLoadData] = useState(false)
    const [dataDetailSale,setDataDetailSale]= useState([])
    const [selectedState, setSelectedState] = useState(' ');
  
    const opcionesSeleccionableEstado = [
        { value: ' ', label: "Todos" },
        { value: "true", label: "Completos" },
        { value: "false", label: "Pendientes" }
    
      ];
    const GetListVentas = async (params={})=>{
        setColumns(["orden","cliente","cantidad","valor_neto","ganancia","estado","fecha"])
        setDecimals(["valor_neto","ganancia"])
        const response = await getSales({params:params});
        setTotalPages(response.total_pages)
        setDataMovimientos(response.results);
      }
      const GetListEntradas = async (params={})=>{
        const response = await getEntries({params:params});
        setColumns(["orden","proveedor","valor_neto","estado","usuario","fecha"])
        setTotalPages(response.total_pages)
    
        setDecimals(["valor_neto"])
        setDataMovimientos(response.results);
        
      }
      const handleViewSpend = async(venta)=>{
        //console.log("venta",venta);
    
        const dataprev= await getDetailSpend(venta.id)
        //console.log("info",dataprev);
        return dataprev
    
      
    }
    const handleViewEntrry = async(entrada)=>{
      
        //console.log("entrada",entrada);
        const dataprev= await getDetailEntry(entrada.id)
        //console.log("info",dataprev);
        return dataprev
    
      
    }
      const handleViewDetail = async (element_id) => {
        if (selectedSwitch==="Proveedores") {
    
           setDataDetailSale(await handleViewEntrry(element_id))
        }
        else {
          setDataDetailSale(await handleViewSpend(element_id))
        }
        setOpenModalDetail(true)
      }
      const handleCloseModalDetail = ()=>{
        setOpenModalDetail(false)
      }
      const handleCloseAll = ()=>{
        setOpenModalDetail(false)
        setLoadData(e=>!e)
        loadClients(e=>!e)
      }
    
    useEffect(()=>{

        if (selectedSwitch ==="Clientes"){
          
            GetListVentas({cliente:selectedClient})
          }
          else {
            GetListEntradas({proveedor:selectedClient})
          }

    },[loadData,selectedClient,selectedSwitch])

    const handleChangePage = useCallback(async (event,value)=>{

        setPage(value)
        if (selectedSwitch ==="Clientes"){
          
            GetListVentas({cliente:selectedClient,page:value,tipo:selectedState})
          }
          else {
            GetListEntradas({proveedor:selectedClient,page:value,tipo:selectedState})
          }
    
      },[selectedSwitch,selectedClient,selectedState])


    const handleChangeSelect = async (option) => {
        setSelectedState(option.target.value)
      

        if (selectedSwitch ==="Clientes"){
          
            GetListVentas({cliente:selectedClient,page:page,estado:option.target.value})
          }
          else {
            GetListEntradas({proveedor:selectedClient,page:page,estado:option.target.value})
          }
        
    
      }
  return (
    <>
    <GeneralSelect id="estado"
            name={"Estado"}
            value={selectedState} // Asigna el valor seleccionado
            options={opcionesSeleccionableEstado} // Pasa las opciones al componente
            onChange={handleChangeSelect}
          />
    <Table data={dataMovimientos} columns={colums} columns_decimals={decimals} handleDoubleClick={handleViewDetail}/>
    <GeneralModal isOpen={openModalDetail} onClose={handleCloseModalDetail} icon={"product"}
        title="Metodo de Pago.">
        <ModalDetail onClose={handleCloseModalDetail} data={dataDetailSale} handleCloseAll={handleCloseAll} type={selectedSwitch==="Clientes"?"venta":"entrada"} atributo={selectedSwitch==="Clientes"?"cliente":"proveedor"} />
      </GeneralModal>
      <div className="stock-genius-gastos-footer">
        <span>Mostrando {page} de {totalPages}</span>
          {totalPages>1&&<Paginations totalPages={totalPages} currentPage={page} handleChangePage={handleChangePage}/>}

        </div>
    </>
  )
}

export default ModalDataUsers