SELECT  e.fecha as "Fecha",
u.first_name || ' ' || last_name as "Registra",
e.orden as "# Orden",
e.cantidad_total as "Cantidad pares",
case e.estado 
WHEN TRUE THEN 'Completada'
ELSE 'Incompleta'
end as "Estado",
p.nombre as "Proveedor",
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM e.valor_total::TEXT)) as "Valor Total Facturado", 
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM e.valor_total_ajustado::TEXT))as "Valor Entrada Total"

from "EntradasApp_entrada"  as e
inner JOIN "EntradasApp_proveedor" as p on e.proveedor_id = p.id
inner JOIN "GestionDeUsuariosApp_usuarios" as u on e.usuario_id = u.id
where e.tenant_id = $1 and e.fecha BETWEEN $2 and $3
