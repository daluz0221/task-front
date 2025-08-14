import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
};


type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokensAndUser: (access: string, refresh: string, user: User) => void;
  clearAuth: () => void;
  refreshAccessToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,

            setTokensAndUser: ( access, refresh, user) =>
                set({ accessToken: access, refreshToken: refresh, user }),

            clearAuth: () =>
                set({ accessToken: null, refreshToken: null, user: null }),

            refreshAccessToken: async () => {
                const refresh = get().refreshToken;
                if (!refresh) return false;

                try {
                    const response = await fetch('https://youragenda.app/api/auth/refresh/', {
                        method: 'POST',
                        headers:{ 'Content-Type': 'application/json' },
                        body: JSON.stringify({refresh})
                    });

                    if(!response.ok) throw new Error('Failed to refresh');

                    const data = await response.json();

                    set({
                        accessToken: data.access,
                        refreshToken: data.refresh,
                        user: data.user ?? get().user
                    })                    

                    return true
                } catch (error) {
                    console.error('🔁 Error refrescando token:', error);
                    get().clearAuth();
                    return false;
                }
            },
        }), {
            name: "auth-storage"
        }
    )
)

function isAccessTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000); // segundos
    return exp < now;
  } catch (e) {
    console.error('❌ Error decodificando token:', e);
    return true;
  }
}
