import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { create } from "zustand";



export type Task = {
    id: string;
    title: string;
    description: string | null
    dificulties: string | null
    solution: string | null
    is_completed: false,
    is_deleted: false,
    deadline: string;
    category_id: string
    progress: number
}


type Category = {
    id: string;
    name: string;
};

export type CategoryDetail = {
    id: string;
    name: string;
    user_id: string;
    is_deleted: boolean;
    created_at: string;
    last_updated: string;
    tasks: Task[]
}


type CategoryState = {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (name: string) => Promise<boolean|string>;
    fetchCategoryById: (id: string) => Promise<CategoryDetail>;
    updateCategory: ({id, name}: {id: string, name: string}) => Promise<boolean|string>;
    deleteCategory: (id: string) => Promise<boolean|string>;
}

export const useCategoryStore = create<CategoryState>((set) => ({

    categories: [],
    fetchCategories: async () => {
        try {
            const res = await fetchWithAuth('https://api.youragenda.app/api/categories/list');
            const data = await res.json();
            
            
            set({categories: data})
        } catch (error) {
            console.error("Error al obtener las categorias", error)
        }
    },
    addCategory: async (name) => {
        try {
            const res = await fetchWithAuth('https://api.youragenda.app/api/categories/', {
                method: "POST", 
                body: JSON.stringify({
                    name
                })
            })
            const data = await res.json();
            
            

            if (data.id) {
               set((state) => ({
                categories: [...state.categories, data]
               }))
               return true
            }
            if (data.error == "Ya existe una categoría con ese nombre.") {
                console.log("entro aqui");
                
                return "ya existe"
            }
            return false
        } catch (error) {
            console.log("error al crear categoria", error);
            
            return false
        }
    },
    fetchCategoryById: async(id: string)=>{
        try {
            const res = await fetchWithAuth(`https://api.youragenda.app/api/categories/category/${ id }`);
            if (!res.ok) throw new Error("No se pudo obtener la categoría");
            const data = await res.json();

            return data

        } catch (error) {
            console.error("Error al obtener la categoría por id", error);
            return null
        }

    },
    deleteCategory: async (id: string) => {
        try {
            const res = await fetchWithAuth(`https://api.youragenda.app/api/categories/delete/${id}`, {
                method: "PUT"
            })
            const data = await res.json()

            console.log({data});
            
            return true

        } catch (error) {
            console.log(error);
            
            return false
        }
    },
    updateCategory: async({id, name}: {id: string, name: string}) => {
        
        try {
            const res = await fetchWithAuth(`https://api.youragenda.app/api/categories/update/${id}`, {
                method: "PUT",
                body: JSON.stringify({name})
            });
            const data = await res.json();
            console.log(data);
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }


}));

