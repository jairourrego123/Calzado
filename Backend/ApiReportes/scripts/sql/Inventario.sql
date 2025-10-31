SELECT p.referencia as "Referencia",p.estilo as "Estilo",p.talla as "Talla",p.color as "Color",p.cantidad as "Cantidad",stock_min as "Stock Minimo",

CASE p.estado 
WHEN TRUE THEN 'Disponible'
ELSE 'Fuera de stock'
END as "Estado" , 
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM p.valor::TEXT)) as "Valor de Venta",  -- Formatear como moneda$1
TRIM(TRAILING '.' FROM TRIM(TRAILING '0' FROM p.valor_compra::TEXT)) as "Valor de Compra"  -- Formatear como moneda$2
from "InventarioApp_producto" as p
where tenant_id = $1
and p.fecha >= $2 and p.fecha <= $3
