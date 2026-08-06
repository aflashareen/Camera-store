export const calculateTotal = (cart) =>
  cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );