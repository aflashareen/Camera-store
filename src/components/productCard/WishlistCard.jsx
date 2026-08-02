import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { addToCart } from "../../redux/slices/CartSlice";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWishlist } from "../../services/wishlistService";

function WishlistCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser();

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
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

  const handleCart = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product.productId,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        rating: product.rating,
        stock: product.stock,
      })
    );
  };

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="relative cursor-pointer hover:shadow-lg transition">

        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <Heart fill="red" color="red" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-4 bg-black text-white">
          <h2 className="font-semibold text-lg">{product.name}</h2>

          <p className="text-gray-300">{product.brand}</p>

          <p className="font-bold mt-2">
            ₹{product.price.toLocaleString()}
          </p>

          <button
            onClick={handleCart}
            className="mt-4 w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default WishlistCard;