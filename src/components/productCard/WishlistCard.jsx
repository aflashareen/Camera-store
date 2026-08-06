import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeFromWishlist } from "../../services/wishlistService";
import { getCart,addToCart } from "../../services/cartService";

function WishlistCard({ product }) {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser();

  const { data: cart = [] } = useQuery({
  queryKey: ["cart"],
  queryFn: getCart,
  enabled: !!user,
});
  

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
  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

 const handleCart = async (e) => {
  e.preventDefault();

  if (!user) {
    navigate("/login");
    return;
  }

  const existingItem = cart.find(
    (item) =>
      String(item.userId) === String(user.id) &&
      String(item.productId) === String(product.productId)
  );

  if (!existingItem) {
    await cartMutation.mutateAsync({
      ...product,
      userId: user.id,
      productId: product.productId,
      quantity: 1,
    });
  }

  await removeMutation.mutateAsync(product.id);

  queryClient.invalidateQueries({ queryKey: ["cart"] });
  queryClient.invalidateQueries({ queryKey: ["wishlist"] });

  navigate("/cart");
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