import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

import { UseWishlist } from "../../hooks/UseWishlist";
import { useCart } from "../../hooks/UseCart";

function ProductCard({ product }) {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const { isWishlisted, handleWishlist } = UseWishlist(product);

  const { handleCart } = useCart(product);
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-neutral-850 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <Heart
            fill={isWishlisted ? "red" : "none"}
            color={isWishlisted ? "red" : "black"}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-4 bg-zinc-800 text-white">
          <h2 className="font-semibold text-lg">{product.name}</h2>

          <p className="text-gray-300">{product.brand}</p>

          <p className="font-bold mt-2">
            ₹{product.price.toLocaleString()}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleCart(product);
            }}
            className="mt-4 w-full bg-stone-950 text-white py-2 rounded hover:bg-zinc-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;