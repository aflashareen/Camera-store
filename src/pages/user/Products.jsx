import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

import { Heart } from "lucide-react";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../services/wishlistService";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { addToCart, getCart } from "../../services/cartService";

function Products() {
  const { id } = useParams();

  const { data: user } = useCurrentUser();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: product, isLoading, error, } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: getWishlist(user?.id),
    enabled: !!user,
  })
  
  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: getCart(user?.id),
    enabled: !!user,
  });

  const cartMutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

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
      })
    }
  })

  const existingItem = wishlist.find(
    (item) => 
      String(item.productId) === String(product?.id) &&
      String(item.userId) === String(user?.id) 
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

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
  const handleCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const existingCartItem = cart.find(
      (item) => 
        String(item.productId) === String(product.id) &&
        String(item.userId) === String(user.id)
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

          <button
            onClick={handleCart}
            className="mt-10 w-full bg-black text-white py-4 rounded-lg hover:bg-zinc-800 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuynow}
            className="mt-2 w-full bg-black text-white py-4 rounded-lg hover:bg-zinc-800 transition"
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default Products;