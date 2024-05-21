import React from 'react'
import TableDetail from '../TableDetail/TableDetail';

function ModalDetailEntry({data}) {

// const initialData = useMemo(() => [
//     { id: 1, nombre: "Transacción Bancolombia" },
//     { id: 2, nombre: "Nequi" },
//     { id: 3, nombre: "Daviplata" },
//     { id: 4, nombre: "Efectivo" },
//     ], []);

//     const [paymentMethods] = useState(initialData);

const columns = ["Estilo", "Cantidad"];

  return (

    <div className="stock-genius-detail-salida-container" >
      
      
      <div>
          {data?.entrada.estado ? (
            <span className='stock-genius-titles' style={{ color: "green", textTransform: "uppercase" }}>Completado</span>
          ) : (
            <span className='stock-genius-titles' style={{ color: "red", textTransform: "uppercase" }}>Pendiente</span>
          )}
          <span className='stock-genius-sub-titles stock-genius-detail-sailida-label-selected'>{data.proveedor.nombre}</span>
        </div>
        <div className='stock-genius-component-table stock-genius-body'>
          <TableDetail columns={columns} data={data.productos} subtotal={data.entrada.total} />
          <hr className="stock-genius-detail-linea-gris" />
        </div>
      
      
      
      
      </div>
  )
}

export default ModalDetailEntry