export function sum(objeto,key)  {
  return Object.values(objeto).reduce((valor, item) => valor + item[key], 0)
  };

