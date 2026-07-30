import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../../services/categoryService'
import CategoryCard from './CategoryCard';

function Categories() {
    const { data:categories, isLoading, error }= useQuery({
        queryKey:["categories"],
        queryFn: getCategories,
    });

    if(isLoading)return <p>Loading...</p>;
    if(error)return <p>Something went wrong.</p>;

  return (
    <section className='bg-netural-950 py-24'>
        <div className='mx-auto max-w-7xl px-6'>
            <div className='mb-14 text-center'>
                <p className='text-sm uppercase tracking-[0.35em] text-zinc-500'>Top Picks</p>

                <h2 className='mt-3 text-4xl font-light text-white'>Shop by category</h2>
            </div>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                {categories.map((category)=>(
                    <CategoryCard 
                    key={category.id}
                    category={category}
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default Categories