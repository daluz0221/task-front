"use client";



import { SubTaskStore, useSubTaskStore } from "@/store/subtask-store";
import { TaskStore, useTaskStore } from "@/store/task-store";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SubTaskDetailPage() {

  const { id } = useParams<{ id: string }>();
  const { fetchTaskById } = useTaskStore();
  const { subtasks } = useSubTaskStore();
  const [task, setTask] = useState<TaskStore>();
  const [subTask, setSubTask] = useState<SubTaskStore>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        subtasks.filter(async(task) => {
          if (task.id === id) {
            const res = await fetchTaskById(task.task_id);
            setTask(res)
            return setSubTask(task)
          }
        });
      } catch (error) {
        console.log("error con la subtarea pedida", error);

      } finally {
        setLoading(false)
      }
    }

    fetchTaskData()
  }, [id, subtasks, fetchTaskById])

  console.log({ subTask });




  if (loading) return <p>Cargando...</p>

  if (!subTask) return <p>Tarea no encontrada</p>


  return (
    <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
      <h3 className="py-4">Tarea padre: <Link href={`/tasks/${task?.id}`}>{ task?.title }</Link></h3>
      <h2 className="py-4 text-center text-2xl font-bold">{subTask.title}</h2>
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] text-center'>
            
            
              <div className="flex p-4">
                <span className="font-bold text-lg pr-2">
                  Descripción:
                </span>
                <p className="pt-1">
                  {subTask.description}
                </p>
              </div>
               </div>

            <div className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border duration-300 transition ease border-[#1f1f1f] text-center'>


              <div className="flex p-4">
                <span className="font-bold text-lg pr-2">
                  Dificultades:
                </span>
                <p className="pt-1">
                  {subTask.dificulties}
                </p>
              </div>

              <div className="flex p-4">
                <span className="font-bold text-lg pr-2">
                  Soluciones:
                </span>
                <p className="pt-1">
                  {subTask.solution}
                </p>
              </div>
            </div>

       

        </div>



      </div>
    </div>
  )
}
