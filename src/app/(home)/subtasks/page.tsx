"use client";

import { FloatSubTaskButton, SubTaskCard } from "@/components";
import { useSubTaskStore } from "@/store/subtask-store";
import { useEffect, useRef } from "react";





export default function SubTasksPage() {


    const { subtasks, fetchSubTasks } = useSubTaskStore();
   
    const hasFetched = useRef(false);

    useEffect(() => {
      
        if(!hasFetched.current){
            fetchSubTasks();
            hasFetched.current = true
        }
    }, [fetchSubTasks])
    


    return (
        <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                {
                (subtasks.length === 0)
                ? <h2>De momento no tienes Sub tareas</h2>
                : subtasks.map((subtask) => (
                    <SubTaskCard key={ subtask.id } task={subtask} />
                    ))
                }
            </div>
            <FloatSubTaskButton colorButton="success" icon="create" addModal={"create"} id="" >

            </FloatSubTaskButton>
        </div>
    )

}
