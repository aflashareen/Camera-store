import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { getWishlist } from "../../services/wishlistService";
import { ArrowLeft } from "lucide-react";
import WishlistCard from "../../components/productCard/WishlistCard";
import { useCurrentUser } from "../../hooks/UseCurrentUser";

function Wishlist() {

  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: !!user,
  });

  if (isLoading) return <h2>Loading...</h2>;

  const userWishlist = wishlist.filter(
    (item) => String(item.userId) === String(user?.id)
  );

if (userWishlist.length === 0) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] flex items-center justify-center px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-12 text-center max-w-lg w-full">
        <h2 className="text-3xl font-bold text-white">
          Your Wishlist Is Empty
        </h2>

        <p className="mt-4 text-gray-400">
          Save your favorite cameras to view them later.
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
      <h1 className="text-4xl font-bold mb-10">Wishlist</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userWishlist.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
    </div>

  );
}

export default Wishlist;