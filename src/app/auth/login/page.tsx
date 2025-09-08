"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";



type User = {
    email: string;
    first_name?: string;
    last_name?: string;
    id: string;
    username: string;
}

type Inputs = {
  email: string;
  password: string
}

type LoginData = {
    access: string;
    refresh: string;
    user: User
}

const Content = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect") || "/"
  
      
  const { accessToken } = useAuthStore();

  
  
      useEffect(() => {
        if (accessToken){
          router.push('/')
        }
      }, [router, accessToken]);

     const onSubmit = async (data: Inputs) => {
           
        const payload = {
          email: data.email,
          password: data.password
        }
    
            try {
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
    
    
                if (!response.ok) {
                  // Manejar errores del backend (400, 500, etc.)
                  const errorData = await response.json();
                  console.error('❌ Error en el login:', errorData);
                  return;
                }
    
                const responseData: LoginData = await response.json();
                
                const { access, refresh, user  } = responseData;
                
                useAuthStore.getState().setTokensAndUser(access, refresh, user)
                document.cookie = `accessToken=${access}; path=/;`
                router.push(callbackUrl)
                
    
            } catch (error) {
                console.error('❌ Error de red o inesperado:', error);
                
            }
        
          
        }
      
  return (
    <div className="min-h-screen flex items-center justify-center w-100">
        <div className="bg-[var(--borders)] shadow-lg rounded-lg w-full max-w-md p-8">
            <h2>Register form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input {...register("email", {required: "El email es obligatorio", pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex para validar email
                        message: 'Email inválido',
                    }, })} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
               

                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                    Contraseña
                    </label>
                    <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    />
                    {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 mt-8 bg-[var(--second)] text-white rounded hover:bg-[var(--primary)]"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    </div>
  );
}


export default function LoginPage() {
return(
    <Suspense fallback={<div>Cargando...</div>} >
        <Content />
    </Suspense>
)
}