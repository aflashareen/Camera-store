import ProductCard from "../../components/productCard/ProductCard";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../services/wishlistService";
import { ArrowLeft } from "lucide-react";

function Wishlist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const deleteMutation = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (wishlist.length === 0) {
    return (
      <div className="w-screen py-20 text-center">
        <h2 className="text-3xl font-semibold">Your Wishlist Is Empty</h2>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <h1 className="text-4xl font-bold mb-10">Wishlist</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {wishlist.map((product) => (
          <div key={product.id} className="relative">
            <button
              onClick={() => deleteMutation.mutate(product.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8"
            >
              ✕
            </button>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;