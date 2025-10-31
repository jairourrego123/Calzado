select 
p.estilo as "Estilo", 
COUNT(rpv.cantidad) as "Cantidad",
p.talla  as "Talla" ,
p.color as "Color"
from "VentasApp_venta"  as v 
INNER join "VentasApp_relacionproductoventa" as rpv ON v.id = rpv.venta_id
INNER join "InventarioApp_producto" as p on rpv.producto_id = p.id
where v.tenant_id = $1 and v.fecha BETWEEN $2 and $3 
GROUP BY p.id
order by 2 desc
