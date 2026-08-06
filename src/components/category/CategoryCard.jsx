import React from 'react'
import { useNavigate } from 'react-router-dom';

function CategoryCard({ category }) {
    const navigate = useNavigate();
    
  return (
    <div onClick={()=> navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
    className='cursor-pointer group overflow-hidden rounded-xl '
    >
        <img 
        src={category.image}
        alt={category.name} 
        className='w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105'/>

        <div className='flex justify-between items-center mt-3'>
            <h3 className='text-lg font-medium'>{category.name}</h3>

            <span className='opacity-0 group-hover:opacity-100 transition'>Explore →</span>
        </div>
    </div>
  )
}

export default CategoryCard;