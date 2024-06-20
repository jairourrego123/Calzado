export function sum(objeto,key)  {
  return Object.values(objeto).reduce((valor, item) => parseFloat(valor) + parseFloat(item[key]), 0)
  };

