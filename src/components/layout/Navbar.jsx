import { Link, useNavigate } from 'react-router-dom'
import { Search, UserRound, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from '../../hooks/UseCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../../services/wishlistService';
import { getCart } from '../../services/cartService';
import { setSearch } from '../../redux/slice/searchSlice';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const search = useSelector((state) => state.search.search);

  const { data: user } = useCurrentUser();

  //wishlist
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const wishlistCount = wishlist?.length ?? 0;

  //cart  
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const cartCount = cart?.length ?? 0;

  const handleSearch = (e) => {
    const value = e.target.value;

    dispatch(setSearch(value));

    navigate("/shop");
  };

  return (
    <nav className="relative sticky top-0 z-50 bg-neutral-950 shadow-lg border-b border-white/10">
      <div className="h-16 flex items-center justify-between px-4 lg:px-8 text-white">

        <div className='text-xl tracking-[0.35em] uppercase'>
          <Link to="/hero"><h1>LENSÉ</h1></Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 tracking-[0.2em] uppercase text-sm">

          <div className="group relative">
            <Link
              to="/"
              className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
            >
              Home
            </Link>

            <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </div>

          <div className="group relative">
            <Link
              to="/shop"
              className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
            >
              Shop
            </Link>

            <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </div>

          <div className="group relative">
            <Link
              to="/collection"
              className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
            >
              Collection
            </Link>

            <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </div>

          <div className="group relative">
            <Link
              to="/about"
              className="text-zinc-400 transition-colors duration-300 group-hover:text-white">
              About
            </Link>

            <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search cameras..."
              value={search}
              onChange={handleSearch}
              className="w-64 pl-10 pr-4 py-1 border-gray-200 focus:outline-none focus:ring-2 focus:ring-black rounded"
            />
            {search && (
              <button
                onClick={() => dispatch(setSearch(""))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <Link to={user ? "/profile" : "/login"}>
            {user ? (
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm font-medium">{user?.fullname?.charAt(0).toUpperCase()}</div>
            ) : (<UserRound size={20} strokeWidth={1.25} />)}
          </Link>{" "}

          <div className='relative'>
            <Link to="/wishlist">
              <Heart size={20} strokeWidth={1.25} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>{" "}
          </div>
          <div className='relative'>
            <Link to="/cart">
              <ShoppingBag size={20} strokeWidth={1.25} />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <MobileMenu
          open={menuOpen}
          setMenuOpen={setMenuOpen}
          user={user}
          search={search}
          handleSearch={handleSearch}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />
      </div>
    </nav>
  )
}

export default Navbar;