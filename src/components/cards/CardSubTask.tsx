import { truncateByWords } from '@/helpers';
import { Subtasks } from '@/store/task-store';
import Link from 'next/link'
import React from 'react'

export const CardSubTask = ({task}: {task: Subtasks}) => {

    const { id, title, description } = task;

    

  return (
    <Link href={`/subtasks/${id}`} className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] hover:-translate-y-1 hover:shadow-2xl'>
        <div className='px-4 py-5 sm:p-6'>
            <h2 className='my-1 py-2 text-xl font-semibold text-white text-center'> { title } </h2>
            <p>{ 
              truncateByWords(description, 15)            
            }</p>
        </div>
    </Link>
  )
}
