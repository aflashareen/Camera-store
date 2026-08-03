import api from "./api";

export const getWishlist = async () =>{
    const userId = localStorage.getItem("userId");

    if(!userId) return [];

    const { data }= await api.get(`/wishlist?userId=${userId}`);
    return data;
}
export const addToWishlist = async (product) =>{
    const { data }= await api.post("/wishlist",product);
    return data;
}
export const removeFromWishlist = async (id) =>{
    await api.delete(`/wishlist/${id}`);
}