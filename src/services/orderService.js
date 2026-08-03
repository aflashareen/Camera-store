import api from "./api";

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const addOrder = async (order) => {
  const { data } = await api.post("/orders", order);
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders?userId=${id}`);
  return data;
};