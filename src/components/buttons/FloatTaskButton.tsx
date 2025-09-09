"use client";
import { Edit, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { CreateModal } from '../modals';
import { CreateTaskForm } from '../forms';


interface Props {
  colorButton: string;
  icon: string;
  addModal: string;
  id?: string;
}


export const FloatTaskButton = ({ colorButton, icon, addModal,   }:Props) => {

    const [isOpen, setIsOpen] = useState(false);

  

  return (
    <>
        <button
        onClick={()=> setIsOpen(true)}
        className={`fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--${colorButton})] text-white shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:scale-105`}
        >
          {
            (icon === "create")
              ? (
            <Plus size={28} />
          )
          : (
            icon === "update"
            ? (
              <Edit size={28} />
            )
            :(
              <Trash2 size={28} />
            )
          )
          }
        
        </button>
        
            <CreateModal isOpen={isOpen} >
          {
             addModal == "create"
             ? (
               <CreateTaskForm onSuccess={() => setIsOpen(false)} onClose={()=>setIsOpen(false)} />
             )
             : (
              addModal == "update"
              ? (
               <Trash2 size={28} />
              )
              : (
               <Trash2 size={28} />
              )
             )
          }
             
              </CreateModal>
       
            
 

        
    </>
  )
}
