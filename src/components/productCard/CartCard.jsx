import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../../services/cartService";

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

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="relative cursor-pointer hover:shadow-lg transition">

        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
        >
          <Trash2 color="red" size={18} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-4 bg-black text-white">
          <h2 className="font-semibold text-lg">
            {product.name}
          </h2>

          <p>{product.brand}</p>

          <p className="font-bold mt-2">
            ₹{product?.price?.toLocaleString?.()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CartCard;