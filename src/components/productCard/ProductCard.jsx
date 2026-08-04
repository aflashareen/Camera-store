import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addToWishlist, getWishlist, removeFromWishlist } from "../../services/wishlistService";
import { addToCart, getCart } from "../../services/cartService";

function ProductCard({ product }) {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const cartMutation = useMutation({
  mutationFn: addToCart,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  },
});

  const existingItem = wishlist.find(
    (item) => String(item.productId) === String(product.id) &&
    String(item.userId) === String(user?.id)
  );

  const isWishlisted = !!existingItem;

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  const handleWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      removeMutation.mutate(existingItem.id);
    } else {
      addMutation.mutate({
        ...product,
        userId: user.id,
        productId: product.id,
      });
    }
  };

const handleCart = (e) => {
  e.preventDefault();

  if (!user) {
    navigate("/login");
    return;
  }

  const existingCartItem = cart.find(
    (item) => String(item.productId) === String(product.id) &&
    String(item.userId) === String(user?.id)
  );

  if (existingCartItem) {
    alert("Product already in cart");
    return;
  }

  cartMutation.mutate({
    ...product,
    userId: user.id,
    productId: product.id,
    quantity: 1,
  });
};
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
            onClick={handleCart}
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