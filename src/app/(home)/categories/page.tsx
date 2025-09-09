"use client";


import { CategoryCard, FloatButton } from "@/components";
import { useCategoryStore } from "@/store/category-store";
import { useEffect, useRef } from "react";


export default function CategoriesPage() {

    

    const { categories, fetchCategories } = useCategoryStore();
   

    //Este ref evita múltiples llamadas al refrescar o re-renderizar
    const hasFetched = useRef(false);

  

    useEffect(() => {
        if (!hasFetched.current) {
            fetchCategories();
            hasFetched.current = true
        }
    }, [fetchCategories])


    return (


        <div className="max-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                 {
                (categories.length === 0)
                ? <h2>De momento no tienes categorias</h2>
                : categories.map((category) => (
                    <CategoryCard key={ category.id } categoria={category} />
                    ))
                }
           </div>
           <FloatButton colorButton="success" icon="create" addModal={"create"} >

           </FloatButton>
        </div>
    )

}
