/** Преобразование цены к ру-формату. */
export const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(parseFloat(String(price)));
};
