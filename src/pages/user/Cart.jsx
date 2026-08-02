import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import CartCard from "../../components/productCard/CartCard";

function Cart() {
  const navigate = useNavigate();

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
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

      <div className="grid md:grid-cols-3 gap-10">
        {cart.map((product) => (
          <CartCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;