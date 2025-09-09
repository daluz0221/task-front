"use client";

import { Card, FloatButton } from "@/components";
import { CategoryDetail, useCategoryStore } from "@/store/category-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesDetailPage() {

    const { id } = useParams<{ id: string }>();
    const { fetchCategoryById } = useCategoryStore();
    const [category, setCategory] = useState<CategoryDetail>();
    const [loading, setLoading] = useState(true)


    useEffect(() => {
    
        const fetchCategoryData = async() => {
            try {
                const res = await fetchCategoryById( id );
                setCategory(res)
                
            } catch (error) {
                console.log("error con el fetch de la categoria", error);
                
            } finally {
                setLoading(false)
            }
        }

        fetchCategoryData()
      
    }, [fetchCategoryById, id])
    
  const hasTasks = category?.tasks && category.tasks.length > 0 ? true : false;
  
  if(loading) return <p>Cargando</p>

  if (!category) return <p>Categoria no encontrada</p>
    

  return (
     <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
        <h2 className="py-4 text-center text-2xl font-bold capitalize">{ category.name }</h2>
       {
        hasTasks &&  (
            <div className="mb-4 flex-col">
                <h3 className="py-4 text-xl">Tareas asociadas</h3>
                <p>Total tareas de esta categoría: { category.tasks.length }</p>
            </div>
        )
       }
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
        {
            hasTasks
            ? category.tasks.map((task) => (
                <Card  key={task.id} task={task} />
            ))
            : (
                <span>No hay tareas asocidas a la categoría</span>
            )
        }
        </div>
          <FloatButton colorButton="warning" icon="update" addModal={"update"} category={category} ubication="26"/>
      <div className="flex justify-end gap-2">
        <FloatButton colorButton="alert" icon="delete" addModal={"delete"} category={category} />
      </div>
    </div>
  )
}
