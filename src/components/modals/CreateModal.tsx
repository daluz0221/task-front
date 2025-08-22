
import React from 'react'

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode
}



export const CreateModal = ({ isOpen, children }:ModalProps) => {

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='relative w-96 rounded-2xl bg-while p-6 shadow-lg'>
           
            { children }
        </div>
    </div>
  )
}
