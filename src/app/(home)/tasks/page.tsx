"use client";

import { FloatTaskButton, TaskCard } from "@/components";
import { useTaskStore } from "@/store/task-store";
import { useEffect, useRef } from "react";





export default function TasksPage() {


    const { tasks, fetchTasks } = useTaskStore();
   
    const hasFetched = useRef(false);

    useEffect(() => {
      
        if(!hasFetched.current){
            fetchTasks();
            hasFetched.current = true
        }
    }, [fetchTasks])
    


    return (
        <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                {
                (tasks.length === 0)
                ? <h2>De momento no tienes Tareas</h2>
                : tasks.map((task) => (
                    <TaskCard key={ task.id } task={task} />
                    ))
                }
            </div>
            <FloatTaskButton colorButton="success" icon="create" addModal={"create"} id="" >

            </FloatTaskButton>
        </div>
    )

}
