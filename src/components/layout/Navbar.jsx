import React from 'react'
import { Link } from 'react-router-dom'
import { Search, UserRound, Heart, ShoppingBag, Dice1 } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const wishlistCount = useSelector(
    (state) => state.wishlist.items.length
  );

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950 shadow-lg border h-15">
      <div className='flex flex-row justify-between p-4 text-white'>


        <div className='font-Helvetica font-bold text-xl tracking-[0.35em] uppercase'>
          <Link to="/hero"><h1>LENSÉ</h1></Link>
        </div>

        <div className='flex gap-4 font-[Helvetica_Neue] tracking-wider font-light uppercase'>
          <Link to="/">Home</Link>{" "}
          <Link to="/shop">Shop</Link>{" "}
          <Link to="/collection">Collection</Link>
          <Link to='/about'>About</Link>
        </div>

        <div className="flex gap-6">
          <Link to="/search"><Search size={20} strokeWidth={1.25} /></Link>{" "}

          <Link to={isAuthenticated ? "/profile" : "/login"}>
            {isAuthenticated ? (
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm font-medium">{user?.fullname?.charAt(0).toUpperCase()}</div>
            ) : (<UserRound size={20} strokeWidth={1.25} />)}
          </Link>{" "}

          <div className='relative'>
          <Link to="/wishlist"><Heart size={20} strokeWidth={1.25} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
            )}
          </Link>{" "}
          </div>
          <Link to="/cart"><ShoppingBag size={20} strokeWidth={1.25} /></Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;