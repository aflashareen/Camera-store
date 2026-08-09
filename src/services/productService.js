import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

//for admin product details
export const updateProduct = async ({ id, data }) => {
  const res = await api.patch(`/products/${id}`, data);
  return res.data;
};
export const addProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};

//soft delete and hard delete

export const softDeleteProduct = async (id) => {
  const res = await api.patch(`/products/${id}`, {
    isDeleted: true,
  });
  return res.data;
};

export const hardDeleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const restoreProduct = async (id) => {
  const res = await api.patch(`/products/${id}`, {
    isDeleted: false,
  });

  return res.data;
};