import api from "./api";

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};