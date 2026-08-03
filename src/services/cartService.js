import api from "./api";

export const getCart = async () => {
  const userId = localStorage.getItem("userId");

  if(!userId) return [];

  const { data } = await api.get(`/cart?userId=${userId}`);
  return data;
};

export const addToCart = async (product) => {
  const { data } = await api.post("/cart", product);
  return data;
};

export const removeFromCart = async (id) => {
  await api.delete(`/cart/${id}`);
};

export const updateCart = async ({ id, quantity }) =>{
  const { data } = await api.patch(`/cart/${id}`,{
    quantity,
  });
  return data;
}