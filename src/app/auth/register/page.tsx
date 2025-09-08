"use client"
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


type Inputs = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
}

type User = {
    email: string;
    first_name?: string;
    last_name?: string;
    id: string;
    username: string;
}

type RegisterData = {
    access: string;
    message: string;
    refresh: string;
    user: User
}


export default function RegisterPage() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const password = watch("password", "");

    const router = useRouter();

    const { accessToken } = useAuthStore();


    useEffect(() => {
      if (accessToken){
        router.push('/')
      }
    }, [router, accessToken])
    



    const onSubmit = async (data: Inputs) => {
        const payload = {
            email: data.email,
            username: data.username,
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log({response});
            
            if (!response.ok) {
            // Manejar errores del backend (400, 500, etc.)
            const errorData = await response.json();
            console.error('❌ Error en el registro:', errorData);
            return;
            }

            const responseData: RegisterData = await response.json();
            
            const { access, message, refresh, user  } = responseData;
            alert(message);
            useAuthStore.getState().setTokensAndUser(access, refresh, user)
            router.push('/')
            

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
                    <label htmlFor="email" className="block text-sm font-medium">
                        Username
                    </label>
                    <input {...register("username", {required: "El username es obligatorio" })} className="mt-1 block w-full px-3 py-2 border rounded-md"/>
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Nombres
                    </label>
                    <input {...register("firstName")} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Apellidos
                    </label>
                    <input {...register("lastName")} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                    Contraseña
                    </label>
                    <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                        value: 8,
                        message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                        pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                            'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número',
                        },
                    })}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    />
                    {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="repeatPassword" className="block text-sm font-medium">
                    Repetir contraseña
                    </label>
                    <input
                    type="password"
                    id="repeatPassword"
                    {...register('repeatPassword', {
                        required: 'Por favor, repite la contraseña',
                        validate: (value) =>
                        value === password || 'Las contraseñas no coinciden',
                    })}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    />
                    {errors.repeatPassword && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.repeatPassword.message}
                    </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 mt-8 bg-[var(--second)] text-white rounded hover:bg-[var(--primary)]"
                >
                    Registrarse
                </button>
            </form>
        </div>
    </div>
  );
}