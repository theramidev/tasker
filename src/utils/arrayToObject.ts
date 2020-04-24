
/**
 * @description convierte un arreglo en un objeto
 * @param array 
 * @param keyField llave a asignar al objeto en base al arreglo
 */
export const arrayToObject = (array: any[], keyField: string) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
