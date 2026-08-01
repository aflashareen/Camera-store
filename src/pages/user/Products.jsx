import Layout from "../../components/layout/Layout";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

import { Heart } from "lucide-react";
import { getWishlist,addToWishlist,removeFromWishlist } from "../../services/wishlistService";
import { useCurrentUser } from "../../hooks/UseCurrentUser";

function Products() {
  const { id } = useParams();

  const { data : user } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const { data:wishlist=[] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  })

  const addMutation = useMutation({
    mutationFn : addToWishlist,

    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey:["wishlist"],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn : removeFromWishlist,

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["wishlist"],
      })
    }
  })

  const isWishlisted = wishlist.some((item) => item.id === product?.id);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  const handleWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      removeMutation.mutate(product.id);
    } else {
      addMutation.mutate(product);
    }
  };

  return (
    <div>
      <div className="w-full p-10 flex flex-row justify-center">
        <div className="w-[50%]">
          <img src={product.image} alt={product.name} />
        </div>

        {/* right */}
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

          <button className="mt-10 w-full bg-black text-white py-4 rounded-lg hover:bg-zinc-800 transition">
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default Products;