import api from "./api";

export const registerUser = async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
}

export const getUserByEmail = async (email) =>{
    const response = await api.get(`/users?email=${email}`);
    return response.data;
}