"use client"
import { SubTaskStore, useSubTaskStore } from '@/store/subtask-store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';


type Inputs = {
    title: string;
    description: string;
    is_completed: boolean;
}

interface Props {
    onClose: () => void;
    subTask: SubTaskStore
}


export const UpdateSubTaskForm = ({onClose, subTask}:Props) => {

    const router = useRouter()
    
        const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({
            defaultValues: {
                title: subTask.title,
                description: subTask.description,
                is_completed: subTask.is_completed
            }
        });
        const updateSubTask = useSubTaskStore((state) => state.updateSubTask);
    
        const onSubmit = async (data: Inputs) => {
            const payload = {
                id: subTask.id,
                title: data.title,
                description: data.description,
                is_completed: data.is_completed,
                task_id: subTask.task_id

            }
            const updated = await updateSubTask(payload)
            if(updated){
                reset();
    
                router.push('/subtasks/')
            }
            
        }

  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2>Actualizar Sub tarea</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-md font-medium">
                        Título
                    </label>
                    <input {...register("title", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                 <div className="mt-4">
                    <label htmlFor="email" className="block text-md font-medium">
                        Descripción
                    </label>
                    <input {...register("description", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                
                 <div className="mt-4 flex gap-5">
                    <label htmlFor="email" className="block text-md font-medium">
                        sub tarea completada
                    </label>
                    <input type='checkbox' {...register("is_completed")} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {errors.is_completed && (
                        <p className="text-red-500 text-sm mt-1">{errors.is_completed.message}</p>
                    )}
                </div>
               


                <button
                    type="submit"
                    className="px-4 py-2 mt-8 bg-[var(--warning)] text-white rounded "
                >
                    Actualizar
                </button>
                <button
                    onClick={onClose}
                    className=" ml-4 px-4 py-2 mt-8 bg-[var(--alert)] text-white rounded"
                >
                    Cancelar
                </button>
            </form>
        </div>
    </div>
  )
}
