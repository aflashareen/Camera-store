import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
   <Link to={`/product/${product.id}`}>
   <div className='cursor-pointer hover:shadow-lg transition'>
    <img src={product.image} alt={product.name} />

    <div className='p-4 bg-black text-white'>
    <h2>{product.name}</h2>
    <p>₹{product.price.toLocaleString()}</p>
    </div>
   </div>
   </Link>
  )
}

export default ProductCard;