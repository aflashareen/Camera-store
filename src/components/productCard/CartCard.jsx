import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart, updateCart } from "../../services/cartService";

function CartCard({ product }) {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser();

  const removeMutation = useMutation({
    mutationFn: removeFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const handleRemove = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    removeMutation.mutate(product.id);
  };

  const updateMutation = useMutation({
    mutationFn: updateCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const increaseQuantity = (e) => {
    e.preventDefault();

    updateMutation.mutate({
      id: product.id,
      quantity: (product.quantity || 1) + 1
    })
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();

    if ((product.quantity || 1) === 1) return;

    updateMutation.mutate({
      id: product.id,
      quantity: (product.quantity || 1) - 1
    })
  };

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="flex gap-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-4 relative w-300">

        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-lg"
        />

        <div className="flex-1 flex flex-col justify-between">

          <button
            onClick={handleRemove}
            className="absolute top-20 right-10"
          >
            <Trash2 className="text-red-500" size={20} />
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
              onClick={decreaseQuantity}
              className="border rounded-md p-2"
            >
              <Minus size={16} />
            </button>

            <span className="font-semibold text-lg">
              {product.quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="border rounded-md p-2"
            >
              <Plus size={16} />
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default CartCard;