import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react';
import { addToCart } from '../../redux/slices/CartSlice';

import { useCurrentUser } from '../../hooks/UseCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWishlist, getWishlist, removeFromWishlist } from '../../services/wishlistService';

function ProductCard({ product }) {
  const queryClient= useQueryClient();
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const {data: user} = useCurrentUser();

  const {data:wishlist=[]} = useQuery({
    queryKey: ["wishlist"],
    queryFn:getWishlist,
  }) 

  const isWishlisted = wishlist.some((item)=>item.id === product.id);

  const addMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey:["wishlist"],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey:["wishlist"],
      });
    },  
});

  const handleWishlist = (e) => {
    e.preventDefault();

    if(!user){
      navigate("/login")
      return;
    }
    if(isWishlisted){
      removeMutation.mutate(product.id)
    }else{
      addMutation.mutate(product)
    }
  }

  const handleCart = (e) =>{
    e.preventDefault();

    if(!user){
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
  }
  return (
    <Link to={`/product/${product.id}`}>
      <div className='relative cursor-pointer hover:shadow-lg transition'>
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <Heart
            size={20}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
        <img src={product.image} alt={product.name} />

        <div className='p-4 bg-black text-white'>
          <h2>{product.name}</h2>
          <p>₹{product.price.toLocaleString()}</p>

          <button onClick={handleCart}
          className="mt-3 w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition">Add to Cart</button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard;