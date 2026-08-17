import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart, updateCart } from "../../services/cartService";
import { useCart } from "../../hooks/UseCart";

function CartCard({ product }) {

  const { removeItem, updateQuantity, } = useCart();
  const queryClient = useQueryClient();

  const handleRemove = (e) => {
    e.preventDefault();
    removeItem(product.id);
  };

  const handleQuantity = async (e, change) => {
    e.preventDefault();

    const quantity = (product.quantity || 1) + change;

    if (quantity < 1) return;

    await updateQuantity(product.id, quantity);

    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="flex gap-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-4 relative">

        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-lg"
        />

        <div className="flex-1 flex flex-col justify-between">

          <button
            onClick={handleRemove}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-10 lg:top-20"
          >
            <Trash2 className="text-red-600" size={20} />
          </button>

          <div>
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-500">
              {product.brand}
            </p>

            <p className="text-2xl font-bold mt-3">
              ₹{product.price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={(e) => handleQuantity(e, -1)}
              className="border rounded-md p-2"
            >
              <Minus size={12} />
            </button>

            <span className="font-semibold text-lg">
              {product.quantity || 1}
            </span>

            <button
              onClick={(e) => handleQuantity(e, 1)}
              className="border rounded-md p-2"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CartCard;