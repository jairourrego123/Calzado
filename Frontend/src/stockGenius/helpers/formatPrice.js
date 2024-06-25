export function formatPrice  (price)  {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
    
  });
  if (typeof(price)!=='number'){
    price = parseFloat(String(price)?.replace(/[$,]/g, ''))
  }
  if (isNaN(price)) price = 0;
  return formatter.format(price);
};

export function replaceInputPrice(value) {
  return value.replace(/[$.]/g, '')
}
  // if(typeof(price)!='number') price = parseFloat(price?.replace(/[^\d.]/g, ''))