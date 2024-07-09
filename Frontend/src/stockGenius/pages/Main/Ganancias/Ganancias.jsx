import { useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import './Ganancias.css'
import Table from "../../../components/Table/Table";
import FilterDate from "../../../components/FilterDate/FilterDate"
import { getGanancias } from "../../../services/data/dataService";
function Ganancias() {
  const initialData = useMemo(() => [
    {
      "id":1,
      "usuario": "Usuario 1",
      "periodo_a":"01/01/2024",
      "periodo_b":"01/01/2024",
      "ganancias":"$20000000",
      "gastos_individuales":"$2000000",
      "gastos_generales":"$2000000",
      "total_neto":"$16000000"
    },
    {
      "id":2,
      "usuario": "Usuario 2",
      "periodo_a":"01/01/2024",
      "periodo_b":"01/01/2024",
      "ganancias":"$20000000",
      "gastos_individuales":"$0",
      "gastos_generales":"$2000000",
      "total_neto":"$18000000"
    },
  ]

    , []);

    const [data,setData] = useState([])

    const [startDate,setStartDate]= useState(null)
    const [endDate,setEndDate]= useState(null)
    const columns = ["usuario","periodo_a","periodo_b","ganancias","gastos_individuales","gastos_generales","total"]
    const decimal = ["ganancias","gastos_individuales","gastos_generales","total"]
    
    const GetGanancias = async (params={})=>{

      const response = await getGanancias({params:params})
      setData(response)
      console.log("respuesta:",response);
      return response
      
    }
    const handleFilterData = async (date) => {
      if (date[0] === null && date[1] === null) return GetGanancias();
      if (date[0] === null || date[1] === null) return;
      GetGanancias({ fecha_inicio: date[0], fecha_fin: date[1] });
    };
    return (

    <div className="stock-genius-general-content">
      <div className="stock-genius-ganancias-header">
        <Header title={"Ganancias"} />
  
     
      </div>
      <div className="stock-genius-ganancias-layoth">
        
      <div className="stock-genius-ganancias-calendarios">
       {/* <span> Fecha Inicial:  </span> */}
        {/* <FilterDateSeparate date={startDate} setDate ={setStartDate} maxRange={endDate}/> */}
        {/* <span> Fecha Final:  </span> */}
        {/* <FilterDateSeparate date={endDate} setDate ={setEndDate} minRange={startDate} /> */}
        {/* Periodo B  <Calendar /> */}
        <FilterDate handleFilterDate={handleFilterData}/>

        </div>
        <Mostrar />


      </div>
      <div className="stock-genius-table stock-genius-table-ganancias" >
      <Table data={data}  columns={columns} columns_decimals={decimal}/>

      </div>

      <div className="stock-genius-ganancias-footer">

      </div>
    </div>
    // <Header title={"Ganancias"}/>
  )
}

export default Ganancias