import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addToWishlist, removeFromWishlist } from '../../redux/slices/WishlistSlice';
import { Heart } from 'lucide-react';
import { addToCart } from '../../redux/slices/CartSlice';

function ProductCard({ product }) {
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state)=> state.wishlist.items);
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);

  const isWishlisted = wishlist.some((item)=>item.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault();

    if(!isAuthenticated){
      navigate("/login")
      return;
    }
    if(isWishlisted){
      dispatch(removeFromWishlist(product.id));
    }else{
      dispatch(addToWishlist(product));
    }
  }

  const handleCart = (e) =>{
    e.preventDefault();

    if(!isAuthenticated){
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