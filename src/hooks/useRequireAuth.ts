
"use client"
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export function useRequiredAuth()  {


    const router = useRouter();

    const { accessToken } = useAuthStore();

    useEffect(() => {
        if (!accessToken) {
            router.push('/auth/login')
        }
    }, [router, accessToken]);


}