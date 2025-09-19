"use client";
import { Edit, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { CreateModal } from '../modals';
import { CreateSubTaskForm, UpdateSubTaskForm } from '../forms';
import { SubTaskStore } from '@/store/subtask-store';


interface Props {
  colorButton: string;
  icon: string;
  addModal: string;
  subTask?: SubTaskStore;
  task_id?: string;
}


export const FloatSubTaskButton = ({ colorButton, icon, addModal, subTask, task_id }:Props) => {

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
               <CreateSubTaskForm onSuccess={() => setIsOpen(false)} onClose={()=>setIsOpen(false)} task_id={task_id} />
             )
             : (
              addModal == "update"
              ? (
                <UpdateSubTaskForm onClose={()=>setIsOpen(false)} subTask={subTask!} />
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
