import { truncateByWords } from '@/helpers';
import Link from 'next/link';
import React from 'react'

interface Task {
    id: string;
    title: string;
    description: string|null;
}



export const SubTaskCard = ({task}: {task: Task}) => {

    const { title, id, description = ''} = task;
    
  return (
    <Link href={`/subtasks/${id}`} className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] hover:-translate-y-1 hover:shadow-2xl text-center'>
        <div className='px-4 py-5 sm:p-6 text-center space-y-3'>
            <h2 className='mt-1 text-xl font-semibold text-white'>{title} </h2>

            <p className='text-sm text-[var(--secondText)]'>
             <span className='font-bold'>Descripción:</span> {truncateByWords(description, 100)}
            </p>

            
        </div>
    </Link>
  )
}
