import { useMemo, useState } from "react";
import Header from "../../../components/Header/Header"
import Mostrar from "../../../components/Mostrar/Mostrar"
import './Ganancias.css'
import Table from "../../../components/Table/Table";
import FilterDateSeparate from "../../../components/FilterDateSeparete/FilterDateSeparate";
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

    const [data] = useState(initialData)

    const [startDate,setStartDate]= useState(null)
    const [endDate,setEndDate]= useState(null)

  return (

    <div className="stock-genius-general-content">
      <div className="stock-genius-ganancias-header">
        <Header title={"Ganancias"} />
  
     
      </div>
      <div className="stock-genius-ganancias-layoth">
        
      <div className="stock-genius-ganancias-calendarios">
       <span> Fecha Inicial:  </span>
        <FilterDateSeparate date={startDate} setDate ={setStartDate} maxRange={endDate}/>
        <span> Fecha Final:  </span>
        <FilterDateSeparate date={endDate} setDate ={setEndDate} minRange={startDate} />
        {/* Periodo B  <Calendar /> */}
        </div>
        <Mostrar />


      </div>
      <div className="stock-genius-table stock-genius-table-ganancias" >
      <Table data={data}  />

      </div>

      <div className="stock-genius-ganancias-footer">

      </div>
    </div>
    // <Header title={"Ganancias"}/>
  )
}

export default Ganancias