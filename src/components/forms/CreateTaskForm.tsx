"use client"
import { useCategoryStore } from "@/store/category-store";
import { useTaskStore } from "@/store/task-store";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";



type Inputs = {
    title: string;
    description: string;
    deadline: string;
    category_id: string;
}

interface Props {
    onSuccess: () => void;
    onClose: () => void;
}


export const CreateTaskForm = ({ onSuccess, onClose }:Props) => {

   const { register, control, handleSubmit, formState: {errors}, reset } =  useForm<Inputs>();

   const {categories} = useCategoryStore();
   const addTask = useTaskStore((state) => state.addTask)

   const onSubmit = async(data: Inputs) => {
     console.log({data});
     const ok = await addTask(data);
     if (ok == "ya existe"){
        console.log("Tarea ya existe");
        
     } else if (ok){
        reset();

        onSuccess();
     } else {
        console.log("Error al crear la tarea");
        
     }

   }

  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2>Nueva tarea</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="titulo" className="block text-sm font-medium">
                        titulo
                    </label>
                    <input {...register("title", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>
               <div className="mt-4">
                    <label htmlFor="Descripción" className="block text-sm font-medium">
                        Descripción
                    </label>
                    <input {...register("description", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200">Deadline</label>
                    <Controller
                    control={control}
                    name="deadline"
                    rules={{ required: "El deadline es obligatorio" }}
                    render={({ field, fieldState }) => (
                        <>
                        <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) =>
                            field.onChange(date ? date.toISOString() : "")
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="w-full rounded-lg bg-gray-900 text-white p-2 border border-gray-700"
                        placeholderText="Selecciona fecha y hora"
                        />
                         {fieldState.error && (
                             <p className="text-red-500 text-sm mt-1">
                                {fieldState.error.message}
                            </p>
                        )}
                        </>
                    )}
                   
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-200">Categoría</label>
                    <select
                    {...register("category_id", { required: "La categoría es obligatoria" })}
                    className="w-full rounded-lg bg-gray-900 text-white p-2 border border-gray-700"
                    >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.name}
                        </option>
                    ))}
                    </select>
                    {errors.category_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
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
