import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import CartCard from "../../components/productCard/CartCard";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { calculateTotal } from "../../cart";

function Cart() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!user,
  });

  if (isLoading) return <h2>Loading...</h2>;

  const userCart = cart.filter(
    (item) => String(item.userId) === String(user?.id)
  );

  if (userCart.length === 0) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-12 text-center max-w-lg w-full">
          <h2 className="text-3xl font-bold text-white">
            Your Cart Is Empty
          </h2>

          <p className="mt-4 text-gray-400">
            Add premium cameras to your cart and continue shopping.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }
  const total = calculateTotal(cart);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

          <div className="flex flex-col gap-6">
            {userCart.map((product) => (
              <CartCard
                key={product.id}
                product={product}
              />
            ))}
          </div>


          <div className="sticky top-24 h-fit rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-8">
            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">
              {userCart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <p>
                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-6 border-white/10" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="w-full mt-8 rounded-xl bg-white py-4 font-semibold text-black hover:bg-gray-200">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;