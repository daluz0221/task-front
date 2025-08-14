import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { create } from "zustand";






type Category = {
    id: string;
    name: string;
};


type CategoryState = {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (newCategory: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({

    categories: [],
    fetchCategories: async () => {
        try {
            const res = await fetchWithAuth('https://youragenda.app/api/categories/list');
            const data = await res.json();
            console.log({data});
            
            set({categories: data})
        } catch (error) {
            console.error("Error al obtener las categorias", error)
        }
    },
    addCategory: (newCategory) =>
        set((state) => ({
            categories: [...state.categories, newCategory]
        }))


}));

