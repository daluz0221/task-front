"use client";


import { CardSubTask, FloatTaskButton } from "@/components";
import { formatDate } from "@/helpers";
import { TaskStore, useTaskStore } from "@/store/task-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function TaskDetailPage() {

  const { id } = useParams<{ id: string }>();
  const { fetchTaskById } = useTaskStore();
  const [task, setTask] = useState<TaskStore>();
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const res = await fetchTaskById(id);
        setTask(res)
      } catch (error) {
        console.log("error con el fetch de tarea", error);
        
      } finally{
        setLoading(false)
      }
    }

    fetchTaskData()
  }, [id, fetchTaskById])
  
  console.log({task});

  const hasSubTasks = task?.subtasks && task.subtasks.length > 0
  

  if(loading) return <p>Cargando...</p>

  if (!task) return <p>Tarea no encontrada</p>

   
  return (
   <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
          <h2 className="py-4 text-center text-2xl font-bold capitalize">{ task.title }</h2>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] text-center'>
                <div className="flex p-4">
                  <span className="font-bold text-lg pr-2">
                    Descripción: 
                  </span>
                  <p className="pt-1">
                    { task.description }
                  </p>
                </div>
                <div className="flex p-4">
                  <span className="font-bold text-lg pr-2">
                    Dificultades: 
                  </span>
                  <p className="pt-1">
                    { task.dificulties }
                  </p>
                </div>
                <div className="flex p-4">
                  <span className="font-bold text-lg pr-2">
                    Soluciones: 
                  </span>
                  <p className="pt-1">
                    { task.solution }
                  </p>
                </div>
              </div>

              <div className='bg-[#1e1e1e] flex-col backdrop-blur-md overflow-hidden items-center shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] text-center'>
                <div className="flex-col p-4 gap-5">
                  <span className="font-bold text-lg">
                    Fecha límite: 
                  </span>
                  <p>
                    { formatDate(task.deadline) }
                  </p>
                </div>
                <div className="flex-col p-8 md:p-4">
                  <span className="font-bold text-lg">
                    Progreso: 
                  </span>
                 <div className='w-full bg-gray-500 rounded-full h-2 mt-2'>
                  <div
                    className='bg-green-500 h-2 rounded-full transition-all duration-500'
                    style={{width: `${task.progress}%`}}
                  ></div>
                  <p className='text-xs text-gray-400'>
                    {task.progress}% completado
                  </p>
                </div>
                </div>
              </div>
            </div>
            <hr className="m-5" />
            { hasSubTasks && (
              <div className="mb-4 flex-col">
                <h3 className="py-4 text-xl">Subtareas asociadas</h3>
                <p>Total Subtareas de esta tarea: { task.subtasks.length }</p>
            </div>
            ) }
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                    {
                        hasSubTasks
                        ? task.subtasks.map((subtask) => (
                            <CardSubTask  key={subtask.id} task={subtask} />
                        ))
                        : (
                            <span>No hay subtareas asocidas a la tarea</span>
                        )
                    }
                    </div>
          </div>
            {/* <FloatTaskButton addModal="create" colorButton=""/> */}
      </div>
  )
}
