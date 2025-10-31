select 
c.nombre as "Cliente", 
SUM(v.cantidad_total) as "Numero Pares",
COUNT(v.cantidad_total) as "Numero Ventas",
case c.estado
when TRUE THEN 'Al dia'
else 'Pendiente'
end as "Estado"
from "VentasApp_venta"  as v 
INNER join "VentasApp_cliente" as c on v.cliente_id = c.id
where v.tenant_id = $1 and v.fecha BETWEEN $2 and $3
GROUP BY c.id
order by 2 desc
