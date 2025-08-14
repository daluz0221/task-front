"use client"

import { useAuthStore } from "@/store/auth-store";
import { useCategoryStore } from "@/store/category-store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";





export default function Home() {

    const router = useRouter();
    
    const { categories, fetchCategories } = useCategoryStore();
    const { accessToken } = useAuthStore();


  //Este ref evita múltiples llamadas al refrescar o re-renderizar
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!accessToken){
        router.push('/auth/login')
        }
    }, [router, accessToken]);

    useEffect(() => {
     if (!hasFetched.current){
        fetchCategories();
        hasFetched.current = true
     }
    }, [fetchCategories])
    




    return (

        <div className="">
            {
                (categories.length === 0)
                    ? <h2>De momento no tienes categorias</h2>
                    : categories.map((category) => (
                        <span key={category.id}>
                            {category.name}
                        </span>
                    ))
            }

        </div>

    )

  
}
