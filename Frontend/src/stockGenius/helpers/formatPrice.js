export function formatPrice  (price)  {
    console.log("price",price);
    const formatter = new Intl.NumberFormat();
    console.log("formatero",parseFloat(price));
    if(typeof(price)!='number') price = parseFloat(price?.replace(/[^\d.]/g, ''))
    if (isNaN(price)) price = 0;
    return formatter.format(price);
  };
