"use client";

import { CategoryDetail, useCategoryStore } from "@/store/category-store";
import { useRouter } from "next/navigation";

interface Props {
    onClose: () => void;
    category: CategoryDetail
}


export const DeleteCategoryForm = ({ onClose, category }:Props) => {
    const router = useRouter();


    const deleteCategory = useCategoryStore((state) => state.deleteCategory)

    const onDelete = async() => {
      const ok = await deleteCategory(category.id);
      if (ok){
        router.push('/categories/')
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2 className="font-semibold text-center text-2xl">¿Desea elimar la categoria?</h2>
            
             <div className="text-center">
                <button
                onClick={onDelete}
                    className=" ml-4 px-4 py-2 mt-8 bg-[var(--warning)] text-white rounded cursor-pointer"
                >
                    Borrar
                </button>
                 <button
                    onClick={onClose}
                    className=" ml-4 px-4 py-2 mt-8 bg-[var(--alert)] text-white rounded cursor-pointer"
                >
                    Cancelar
                </button> 
             </div>
           
        </div>
    </div>
  )
}
