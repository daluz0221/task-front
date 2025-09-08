import { fetchWithAuth } from "@/helpers";
import { create } from "zustand";


type newSubTask = {
    title: string; 
    description: string; 
    deadline: string; 
    task_id: string;
}

export type SubTaskStore = {
    id: string; 
    title: string; 
    description: string; 
    dificulties: string; 
    solution: string; 
    is_completed: boolean;
    task_id: string;
}


type SubTaskState = {
    subtasks: SubTaskStore[];
    fetchSubTasks: () => Promise<void>;
    addSubTask: (newSubtask: newSubTask) => Promise<boolean|string>
}


export const useSubTaskStore = create<SubTaskState>((set) => ({

    subtasks: [],
    fetchSubTasks: async () => {
        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/subtasks/list`);
            const data = await res.json();

            set({subtasks: data})
        } catch (error) {
            console.error("Error al obtener las subtareas", error);
        }
    },
    addSubTask: async (newSubtask: newSubTask) => {
            try {
                const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/subtasks/`, {
                    method: "POST",
                    body: JSON.stringify(newSubtask)
                })
                
                const data = await res.json();
              

                if (data.message == "Sub tarea creada con éxito"){
                
                    useSubTaskStore.getState().fetchSubTasks();
                    return true
                }
                if (data.error == "Ya existe una subtarea con ese título") {
                    return "ya existe"
                }

                return false
            } catch (error) {
                console.log("error al crear la tarea", error);
                

                return false
            }
    }


}))