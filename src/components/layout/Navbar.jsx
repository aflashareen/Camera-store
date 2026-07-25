import React from 'react'
import { Link } from 'react-router-dom'
import { Search, UserRound, Heart, ShoppingBag } from "lucide-react";

function Navbar() {
  return (
     <nav>
      <div className='flex flex-row justify-between p-2 border border-[232323] bg-neutral-800 text-white '>

      <div className='font-Helvetica font-bold tracking-[0.35em] uppercase'>
        <Link to="/"><h1>LENSÉ</h1></Link>{" "}
      </div>

      <div className='flex gap-4 font-[Helvetica_Neue] tracking-wider font-light uppercase'>
        <Link to="/shop">Shop</Link>{" "}
        <Link to="/collection">Collection</Link> 
        <Link to='/about'>About</Link>      
      </div>

      <div className="flex gap-6">
        <Link to="/search"><Search size={20} strokeWidth={1.25} /></Link>{" "}
        <Link to='/profile'><UserRound size={20} strokeWidth={1.25} /></Link>{" "}
        <Link to="/wishlist"><Heart size={20} strokeWidth={1.25} /></Link>{" "}
        <Link to="/cart"><ShoppingBag size={20} strokeWidth={1.25} /></Link>
      </div>
      </div>
    </nav>
  )
}

export default Navbar;