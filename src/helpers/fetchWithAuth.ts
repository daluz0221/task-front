import { useAuthStore } from "@/store/auth-store";





export async function fetchWithAuth(input:RequestInfo, init: RequestInit = {}) {


    const authStore = useAuthStore.getState();
    let token = authStore.accessToken;

   

    const finalInit = (accessToken: string | null): RequestInit => ({
        ...init,
        headers: {
            ...init.headers,
            Authorization: accessToken ?  `Bearer ${accessToken}` : "",
            'Content-Type': 'application/json'
        },
    });

    // Hacemos la primera petición con el token actual
    let response = await fetch(input, finalInit(token));

   

    if (response.status === 401) {
        console.log("primer fasha");
        
       const refreshed = await authStore.refreshAccessToken();

       if (!refreshed) {
        authStore.clearAuth();
        throw new Error("Token expirado y no se pudo refrescar");
       };

       token = useAuthStore.getState().accessToken;
        response = await fetch(input, finalInit(token));

        // Si sigue fallando, cerramos sesión
        if (response.status === 401) {
            authStore.clearAuth();
            throw new Error("No autorizado, sesión cerrada");
        }
    };

    return response;
    
}