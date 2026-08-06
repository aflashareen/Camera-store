import React from 'react'
import CategoryCard from './CategoryCard';

import mirrorless from '../../assets/images/categories/mirrorless.webp';
import dslr from "../../assets/images/categories/dslr.webp";
import cinema from "../../assets/images/categories/cinema.webp";
import vlogging from "../../assets/images/categories/vlogging.webp";
import lens from "../../assets/images/categories/lens.webp";
import accessories from "../../assets/images/categories/accessories.webp";

export const categories = [
  {
    id: 1,
    name: "Mirrorless",
    image: mirrorless,
  },
  {
    id: 2,
    name: "DSLR",
    image: dslr,
  },
  {
    id: 3,
    name: "Cinema",
    image: cinema,
  },
  {
    id: 4,
    name: "Vlogging",
    image: vlogging,
  },
  {
    id: 5,
    name: "Lenses",
    image: lens,
  },
  {
    id: 6,
    name: "Accessories",
    image: accessories,
  },
];

function Categories() {
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