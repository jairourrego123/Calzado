import GenericForm from "../../../components/GeneralForm/GeneralForm"
import Header from "../../../components/Header/Header"
import { SweetAlertMessage } from "../../../components/SweetAlert/SweetAlert";
import './Informes.css'
function Informes() {
  const onSubmit = (data) => {
    console.table(data);
    SweetAlertMessage("¡Excelente!" ,"Informe generado  correctamente.","success")
};
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
    options:[{value:0,label:"Seleccione...."},{value:1,label:"Productos"},{value:2,label:"Movimientos"}],
    label: 'Tipo de Gasto*',
    rules: { required: 'Este campo es requerido',min:1 },
},
   
 
  ];
  return (
    <div className="stock-genius-informes-container">
      <div className="stock-genius-informes-header">

        <Header title={"Informes"} />
      </div>
      <div className="stock-genius-informes-left">
        <img src="../../assets/icons/reportes.svg" alt="Icono Reportes" />
      </div>

      <div className="stock-genius-informes-right">
        <div className="stock-genius-informes-right-content">

        <div className="stock-genius-informes-right-header">
        <img src="../../assets/icons/database.svg" alt="icono-informes-right" className="stock-genius-informes-right-icon"/>
        <h1 className="">Crear Reportes</h1>

        </div>
   

        <GenericForm formFields={formFields}  onSubmit={onSubmit} cancel={false}/>
        </div>
 
    
      </div>

    </div>
  )
}

export default Informes