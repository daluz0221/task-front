"use client"
import { useSubTaskStore } from "@/store/subtask-store";
import { useTaskStore } from "@/store/task-store";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";



type Inputs = {
    title: string;
    description: string;
    deadline: string;
    task_id: string;
}

interface Props {
    onSuccess: () => void;
    onClose: () => void;
}


export const CreateSubTaskForm = ({ onSuccess, onClose }:Props) => {

   const { register, control, handleSubmit, formState: {errors}, reset } =  useForm<Inputs>();

   const {tasks} = useTaskStore();
   const addSubTask = useSubTaskStore((state) => state.addSubTask)

   const onSubmit = async(data: Inputs) => {
     
     const ok = await addSubTask(data);
     if (ok == "ya existe"){
        console.log("SubTarea ya existe");
        
     } else if (ok){
        reset();

        onSuccess();
     } else {
        console.log("Error al crear la subtarea");
        
     }

   }

  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            
            <h2>Nueva subtarea</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="titulo" className="block text-sm font-medium mb-2">
                        titulo
                    </label>
                    <input {...register("title", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>
               <div className="mt-4">
                    <label htmlFor="Descripción" className="block text-sm font-medium mb-2">
                        Descripción
                    </label>
                    <input type="text" {...register("description", {required: "El campo es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Deadline</label>
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
                
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Tarea</label>
                    <select
                    {...register("task_id", { required: "La categoría es obligatoria" })}
                    className="w-full rounded-lg bg-gray-900 text-white p-2 border border-gray-700"
                    >
                    <option value="">Selecciona una tarea</option>
                    {tasks.map((task) => (
                        <option key={task.id} value={task.id}>
                        {task.title}
                        </option>
                    ))}
                    </select>
                    {errors.task_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.task_id.message}</p>
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
