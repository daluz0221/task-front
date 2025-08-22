import Link from 'next/link';
import React from 'react'

interface Category {
    id: string;
    name: string;
}



export const CategoryCard = ({categoria}: {categoria: Category}) => {

    const { name, id } = categoria;
  return (
    <Link href={`/categories/${id}`} className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] hover:-translate-y-1 hover:shadow-2xl text-center'>
        <div className='px-4 py-5 sm:p-6'>
            <h2 className='mt-1 text-xl font-semibold text-white'>{name} </h2>
        </div>
    </Link>
  )
}
