import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
   <Link to={`/product/${product.id}`}>
   <div className='cursor-pointer hover:shadow-lg transition'>
    <img src={product.image} alt={product.name} />

    <h2>{product.name}</h2>

    <p>₹{product.price}</p>
   </div>
   </Link>
  )
}

export default ProductCard;