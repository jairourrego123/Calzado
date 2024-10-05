SELECT p.referencia as "Referencia",p.estilo as "Estilo",p.talla as "Talla",p.color as "Color",p.cantidad as "Cantidad",stock_min as "Stock Minimo",

CASE p.estado 
WHEN TRUE THEN 'Disponible'
ELSE 'Fuera de stock'
END as "Estado" , 
TO_CHAR(p.valor, 'FM$999,999,999.00') as "Valor de Venta",  -- Formatear como moneda
TO_CHAR(p.valor_compra, 'FM$999,999,999.00') as "Valor de Compra"  -- Formatear como moneda
from "InventarioApp_producto" as p
where tenant_id = 'cliente'