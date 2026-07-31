import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/productCard/ProductCard";
import { removeFromWishlist } from "../../redux/slices/WishlistSlice";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Your Wishlist Is Empty</h2>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">Wishlist</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="relative">
            <button
              onClick={() => dispatch(removeFromWishlist(product.id))}
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