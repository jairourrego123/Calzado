select 
p.nombre as "Proveedor", 
SUM(e.cantidad_total) as "Numero Pares",
COUNT(e.cantidad_total) as "Numero Compras",
case p.estado
when TRUE THEN 'Al dia'
else 'Pendiente'
end as "Estado"
from "EntradasApp_entrada"  as e
INNER join "EntradasApp_proveedor" as p on e.proveedor_id = p.id
where e.tenant_id = $1 and e.fecha BETWEEN $2 and $3
GROUP BY p.id
order by 2 desc
