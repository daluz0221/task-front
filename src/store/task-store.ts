import { create } from "zustand";
import { fetchWithAuth } from "@/helpers";



export type Subtasks = {
    id: string;
    title: string;
    description: string | null;
    dificulties: string | null;
    solution: string | null;
    is_completed: false;
    task_id: string;
}

export type TaskStore = {
    id: string;
    title: string;
    description: string | null
    dificulties: string | null
    solution: string | null
    is_completed: false,
    is_deleted: false,
    deadline: string;
    category_id: string;
    progress: number;
    subtasks: Subtasks[]
}

type newTask = {
    title: string;
    description: string;
    deadline: string;
    category_id: string;
}




type TaskState = {
    tasks: TaskStore[];
    task: TaskStore | null;
    fetchTasks: () => Promise<void>;
    addTask: (newTask: newTask) => Promise<boolean|string>
    fetchTaskById: (id: string) => Promise<TaskStore>

}



export const useTaskStore = create<TaskState>((set) => ({


    tasks: [],
    task: null,
    fetchTasks: async ()  => {
        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/list`);
            const data = await res.json();

            set({tasks: data})
        } catch (error) {
            console.error("error al obtener las tareas: ", error)
        }
    },
    fetchTaskById: async(id: string) => {
        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/list/${id}`);
            console.log({res});
            
            if (!res.ok) throw new Error("No se pudo obtener la tarea");
            const data = await res.json();

            set({task: data})
            return data

        } catch (error) {
            console.error("Error al obtener la tarea por el id ", error)
            return null
        }
    },
    addTask: async(task: newTask) => {
        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`, {
                method: "POST",
                body: JSON.stringify(task)
            })
            
            const data = await res.json();
            console.log({data});

            if (data.message == "Tarea creada con éxito"){
            
                useTaskStore.getState().fetchTasks();
                return true
            }
            if (data.error == "Ya existe una tarea con ese título") {
                return "ya existe"
            }

            return false
        } catch (error) {
            console.log("error al crear la tarea", error);
            

            return false
        }
    }

}))