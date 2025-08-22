import { Task } from '@/store/category-store'
import Link from 'next/link'
import React from 'react'

export const Card = ({task}: {task: Task}) => {

    const { id, title, description } = task;

  return (
    <Link href={`/tasks/${id}`} className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] hover:-translate-y-1 hover:shadow-2xl'>
        <div className='px-4 py-5 sm:p-6'>
            <h2 className='my-1 py-2 text-xl font-semibold text-white text-center'> { title } </h2>
            <p>{ description }</p>
        </div>
    </Link>
  )
}
