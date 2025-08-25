import { useCategoryStore } from "@/store/category-store";

import { useForm } from "react-hook-form";


type Inputs = {
    name: string;
}

interface Props {
    onSuccess: () => void;
    onClose: () => void;
}

export const CreateCategoryForm = ({ onSuccess, onClose }:Props) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>();
    const addCategory = useCategoryStore((state) => state.addCategory)

    const onSubmit = async (data: Inputs) => {
    
        const ok = await addCategory(data.name);
        console.log(ok == "ya existe");
        
        if (ok == "ya existe"){
            //TODO: crear modales de alerta para avisar del error
            console.log("Categoria ya existe");
        } else if(ok) {
   
            reset();
            
            onSuccess();
            
        } else {
            
            console.log("no se pudo crear la categoria");
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2>Nueva categoria</h2>
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
                    className="px-4 py-2 mt-8 bg-[var(--success)] text-white rounded "
                >
                    Crear
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
