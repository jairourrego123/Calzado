select d.fecha as "Fecha",
d.orden as "ORDEN",
d.tipo as "Tipo",
rpd.cantidad as "Cantidad Devuelta",
md.nombre as "Motivo",
rpd.descripcion as "Descripcion",
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM rpd.valor_venta_producto::TEXT)) as "Valor producto"
from "DevolucionesApp_devolucion" as d
INNER JOIN "DevolucionesApp_relacionproductodevolucion" as rpd on d.id = rpd.devolucion_id
INNER JOIN "DevolucionesApp_motivodevolucion" AS md on rpd.motivo_id = md.id
where d.tenant_id = $1 and d.fecha BETWEEN $2 and $3
