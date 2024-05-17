export function formatPrice  (price)  {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
    
    if(typeof(price)!='number') price = parseInt(price?.replace(/[$\.]/g, ''))
    if (isNaN(price)) price = 0;
    return formatter.format(price);
  };
