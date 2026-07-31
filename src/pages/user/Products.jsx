import Layout from "../../components/layout/Layout";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/WishlistSlice";

function Products() {
  const { id } = useParams();
  
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
  
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;


  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div>
      <div className="w-full p-10 flex flex-row justify-center">
        <div className="w-[50%]">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="w-[50%] pl-8 flex flex-col gap-3 relative">
          <h1 className="font-semibold text-3xl">{product.name}</h1>

          <p className="font-bold">{product.brand}</p>

          <p>MRP (Inclusive of all taxes)</p>
          <p>₹{product.price}</p>

          <p>{product.description}</p>


          <button className="bg-zinc-400 w-50">Add to Cart</button>
          <button
            onClick={(e) => {
              e.preventDefault();

              if (isWishlisted) {
                dispatch(removeFromWishlist(product.id));
              } else {
                dispatch(addToWishlist(product));
              }
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"

          > <Heart
              size={20}
              className={
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }
            /></button>
        </div>
      </div>
    </div>
  );
}

export default Products;