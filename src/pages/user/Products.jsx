import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

import { Heart } from "lucide-react";

import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { UseWishlist } from "../../hooks/UseWishlist";
import { useCart } from "../../hooks/UseCart";

function Products() {
  const { id } = useParams();

  const { data: user } = useCurrentUser();
  
  const { data: product, isLoading, error, } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const { isWishlisted,handleWishlist } = UseWishlist(product);

  const { handleCart } = useCart(product);

  const navigate = useNavigate();

  const queryClient = useQueryClient();


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  // if (product.isDeleted) {
  // return (
  //   <div className="flex min-h-screen items-center justify-center">
  //     <div className="text-center">
  //       <h1 className="text-2xl font-semibold">
  //         Product Not Available
  //       </h1>

  //       <p className="mt-2 text-gray-500">
  //         This product is no longer available.
  //       </p>

  //       <button
  //         onClick={() => navigate("/shop")}
  //         className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
  //       >
  //         Back to Shop
  //       </button>
  //     </div>
  //   </div>
  // );
// }

  const handleBuynow = (e) =>{
    e.preventDefault();

    if(!user){
      navigate("/login");
      return;
    }
    navigate("/checkout")
  }

  return (
    <div>
      <div className="w-full p-10 flex flex-row justify-center">
        <div className="w-[50%]">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="w-1/2 pl-10 flex flex-col">

          <p className="text-sm uppercase tracking-widest text-gray-500">
            {product.brand}
          </p>

          <div className="flex items-start justify-between mt-2">
            <h1 className="text-4xl font-semibold text-black">
              {product.name}
            </h1>

            <button
              onClick={handleWishlist}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Heart
                size={22}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }
              />
            </button>
          </div>

          <p className="text-3xl font-bold mt-8">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Inclusive of all taxes
          </p>

          <p className="mt-8 leading-7 text-gray-600">
            {product.description}
          </p>

          <button
            onClick={handleCart}
            className="mt-10 w-full bg-black text-white py-4 rounded-lg hover:bg-zinc-800 transition">
            Add to Cart
          </button>

          <button
            onClick={handleBuynow}
            className="mt-2 w-full bg-black text-white py-4 rounded-lg hover:bg-zinc-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;