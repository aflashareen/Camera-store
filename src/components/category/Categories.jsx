import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../../services/categoryService'
import CategoryCard from './CategoryCard';

function Categories() {
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <section className='bg-neutral-950 py-24 text-white'>
            <div className='mx-auto max-w-7xl px-6'>
                <div className='mb-14 text-center'>
                    <p className='text-lg uppercase tracking-[0.35em] text-zinc-500'>
                        Featured Collections
                    </p>

                    <h2 className='mt-3 text-3xl font-bold uppercase'>
                        Explore Categories
                    </h2>
                </div>
                <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-zinc-300'>
                    {categories.map((category) => (
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

export default Categories;