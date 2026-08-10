import api from "./api";

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
export const updateUser = async (id, data) => {
  const { data: updateUser } = await api.patch(`/users/${id}`, data);
  return updateUser;
}