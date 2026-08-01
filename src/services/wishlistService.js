import api from "./api";

export const getWishlist = async () =>{
    const { data }= await api.get("/wishlist");
    return data;
}
export const addToWishlist = async (product) =>{
    const { data }= await api.post("/wishlist",product);
    return data;
}
export const removeFromWishlist = async (id) =>{
    await api.delete(`/wishlist/${id}`);
}