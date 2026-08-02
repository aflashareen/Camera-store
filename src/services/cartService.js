import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addToCart = async (product) => {
  const { data } = await api.post("/cart", product);
  return data;
};

export const removeFromCart = async (id) => {
  await api.delete(`/cart/${id}`);
};