import React from 'react'

function CategoryCard({ category }) {
  return (
    <div>
        <img src={category.image} alt={category.name} />
        <h3>{category.name}</h3>
    </div>
  )
}

export default CategoryCard;