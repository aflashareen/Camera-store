import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import CartCard from "../../components/productCard/CartCard";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/UseCurrentUser";

function Cart() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!user,
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-semibold">
          Your Cart Is Empty
        </h2>
      </div>
    );
  }
  const total = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>


      <div className="flex flex-col gap-6">
        {cart.map((product) => (
          <CartCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="mt-14 w-full bg-gray-100 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8">
          Order Summary
        </h2>

        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1}
                </p>
              </div>

              <p className="font-semibold">
                ₹{(item.price * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-2xl font-bold pt-2">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <Link to="/checkout">
          <button className="w-full mt-8 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>

  );
}

export default Cart;