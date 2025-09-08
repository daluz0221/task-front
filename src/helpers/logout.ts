import { useAuthStore } from "@/store/auth-store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";



const logoutFromServer = async(refreshToken: string, accessToken: string|null) => {

    
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json",  Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({refresh: refreshToken})
        });
    } catch (error) {
        console.error("❌ Error al cerrar sesión en el servidor:", error);
    }
}


export const Logout = async (router: AppRouterInstance) => {

    const { refreshToken, clearAuth, accessToken } = useAuthStore.getState();

    if (refreshToken){
        await logoutFromServer(refreshToken, accessToken)
    };



    clearAuth();
    

    router.push('/auth/login')

}