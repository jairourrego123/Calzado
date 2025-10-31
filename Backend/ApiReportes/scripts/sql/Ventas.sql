SELECT  v.fecha as "Fecha",
u.first_name || ' ' || last_name as "Registra",
v.orden as "Orden",
v.cantidad_total as "Cantidad pares",
case v.estado 
WHEN TRUE THEN 'Completada'
ELSE 'Incompleta'
end as "Estado",
c.nombre as "Ciente",
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM v.valor_total::TEXT)) as "Venta Facturada", 
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM v.valor_total_ajustado::TEXT))as "Venta Total",
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM v.ganancia_total::TEXT)) as "Ganancia Facturada" ,
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM v.ganancia_total_ajustada::TEXT)) as "Ganancia Total"

from "VentasApp_venta"  as v
inner JOIN "VentasApp_cliente" as c on v.cliente_id = c.id
inner JOIN "GestionDeUsuariosApp_usuarios" as u on v.usuario_id = u.id
where v.tenant_id = $1 and v.fecha BETWEEN $2 and $3