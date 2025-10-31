import { useEffect } from "react";
import GenericForm from "../../../components/GeneralForm/GeneralForm"
import Header from "../../../components/Header/Header"
import { SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import { listarReportesDisponible,generarReporteExcel } from "../../../services/reportes/reportesService";
import './Informes.css'
import { useState } from "react";



function Informes() {
  const [reports,setReports] = useState([]);

  const onSubmit = async (body) => {
    console.table(body);
    const data = await generarReporteExcel(body);
    if(data?.length === 0 ) {
      return SweetAlertMessage("¡Sin Información!" ,"No se encontrado información en el rango de fecha seleccioado.","warning")
    }
    SweetAlertMessage("¡Excelente!" ,"Informe generado  correctamente.","success")

  };
const getReports = async () => {
  listarReportesDisponible().then(data => {
    setReports(data);
  }).catch(error => {
    console.error("Error al obtener reportes:", error);
  });
}

useEffect(() => {
  getReports()
}, []);
  const formFields = [
        
    {
        name: 'fecha_inicio',
        type: "date",
        label: 'Fecha Inicio*',
        rules: { required: 'Este campo es requerido' },
      
    },
   
    {
      name: 'fecha_fin',
      type: "date",
      label: 'Fecha Fin*',
      rules: { required: 'Este campo es requerido' },
    
  },
  
   
  {
    name: 'tipo_reporte',
    type: "select",
    options:reports,
    label: 'Reporte*',
    rules: { required: 'Este campo es requerido',min:1 },
},
   
 
  ];


  return (
    <div className="stock-genius-informes-container">
      <div className="stock-genius-informes-header">

        <Header title={"Informes"} />
      </div>
      <div className="stock-genius-informe-content">

      <div className="stock-genius-informes-left">
        <img src="/stock/assets/icons/reportes.svg" alt="Icono Reportes" />
      </div>

      <div className="stock-genius-informes-right">
        <div className="stock-genius-informes-right-content">

        <div className="stock-genius-informes-right-header">
        <img src="/stock/assets/icons/database.svg" alt="icono-informes-right" className="stock-genius-informes-right-icon"/>
        <h1 className="">Generar Informes</h1>

        </div>
   

        <GenericForm formFields={formFields}  onSubmit={onSubmit} cancel={false}/>
        </div>
 
    
      </div>
      </div>

    </div>
  )
}

export default Informes