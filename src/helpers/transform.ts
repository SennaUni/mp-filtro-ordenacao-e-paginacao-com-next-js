const formatPrice = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const convertPrice = (price: number) => {
  return formatPrice.format(price);
};
