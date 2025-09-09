"use client"
import {  CategoryDetail, useCategoryStore } from "@/store/category-store";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";


type Inputs = {
    name: string;
}

interface Props {
    onClose: () => void;
    category: CategoryDetail
}

export const UpdateCategoryForm = ({  onClose, category }:Props) => {

    const router = useRouter()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({
        defaultValues: {
            name: category.name
        }
    });
    const updateCategory = useCategoryStore((state) => state.updateCategory);

    const onSubmit = async (data: Inputs) => {
        const payload = {
            id: category.id,
            name: data.name
        }
        const updated = await updateCategory(payload)
        if(updated){
            reset();

            router.push('/categories/')
        }
        
    }


  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2>Actualizar categoria</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Nombre
                    </label>
                    <input {...register("name", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
