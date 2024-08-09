import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import './Ganancias.css'
import Table from "../../../components/Table/Table";
import FilterDate from "../../../components/FilterDate/FilterDate"
import { getGanancias } from "../../../services/data/dataService";
import { formatDate } from "../../../helpers/formatDate";
import { formatPrice } from "../../../helpers/formatPrice";
function Ganancias() {


    const [data,setData] = useState([])
    const columns = ["usuario","fecha_inicio","fecha_fin","ganancias","gastos_individuales","gastos_generales","total"]
    const decimal = ["ganancias","gastos_individuales","gastos_generales","total"]
    
    const GetGanancias = async (params={})=>{
      try {
        const response = await getGanancias({params:params})
        response.datos_generales.fecha_fin = "TOTAL"
       response.datos_individuales.push(
        response.datos_generales
       )
      setData(response)
      return response
      } catch (error) {
        throw new Error('Error al obtener las ganancias');
      }
      
      
    }
    const handleFilterData = async (date) => {
      if (date[0] === null && date[1] === null) return GetGanancias();
      if (date[0] === null || date[1] === null) return;
      GetGanancias({ fecha_inicio: date[0], fecha_fin: date[1] });
    };

    useEffect(() => {
      const fechaInicio = new Date(new Date().getFullYear(), 0, 1); // Primer día del año
      const fechaFin = new Date(); // Fecha act
      GetGanancias({ fecha_inicio: formatDate( fechaInicio), fecha_fin: formatDate(fechaFin) });
    
      
    }, [])
    
    return (

    <div className="stock-genius-general-content">
      <div className="stock-genius-ganancias-header">
        <Header title={"Ganancias"} />
  
     
      </div>
      <div className="stock-genius-ganancias-layoth">
        
      <div className="stock-genius-ganancias-calendarios">
        <FilterDate handleFilterDate={handleFilterData}/>
        </div>
        <Mostrar />


      </div>
      <div className="stock-genius-table stock-genius-table-ganancias" >
      <Table data={data?.datos_individuales}  columns={columns} columns_decimals={decimal}/>
      
      </div>

      <div className="stock-genius-ganancias-footer">
    
      </div>
     </div>
    // <Header title={"Ganancias"}/>
  )
}

export default Ganancias