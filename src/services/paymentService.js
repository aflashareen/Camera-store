import axios from "axios";

export const createRazorpayOrder = async (amount) => {
  const response = await axios.post(
    "http://localhost:5000/create-order",
    {
      amount,
    }
  );

  return response.data;
};