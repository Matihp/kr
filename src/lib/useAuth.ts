import { create } from 'zustand';
import { 
  verifyToken, 
  login as authLogin, 
  logout as authLogout, 
  googleLogin as authGoogleLogin,
  githubLogin as authGithubLogin,
  updateProfile as authUpdateProfile 
} from './auth';
import { User } from '../../kr-backend/src/models/userModel';
import { ProfileData } from '../../kr-backend/src/types/profileTypes';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isAuthenticatingWithGoogle: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  googleLogin: () => Promise<void>;
  githubLogin: () => Promise<void>;
  updateProfile: (userId: string, profileData: ProfileData) => Promise<void>;
  clearAuthState: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isAuthenticatingWithGoogle: false,

      login: async (email, password) => {
        try {
          set({ isLoading: true });
          await authLogin(email, password);
          const { isAuthenticated, user } = await verifyToken();
          set({ isAuthenticated, user, isLoading: false });
          return true;
        } catch (error) {
          console.error('Error en el login:', error);
          set({ isAuthenticated: false, user: null, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await authLogout();
          set({ 
            isAuthenticated: false, 
            user: null, 
            isLoading: false,
            isAuthenticatingWithGoogle: false 
          });
          localStorage.removeItem('auth-storage');
        } catch (error) {
          console.error('Error en el logout:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          // No verificar si estamos en proceso de autenticación con Google
          if (get().isAuthenticatingWithGoogle) {
            return;
          }

          set({ isLoading: true });
          const { isAuthenticated, user } = await verifyToken();
          set({ isAuthenticated, user, isLoading: false });
        } catch (error) {
          console.error('Error al verificar autenticación:', error);
          set({ isAuthenticated: false, user: null, isLoading: false });
        }
      },

      googleLogin: async () => {
        try {
          // Limpiar el estado antes de iniciar el login con Google
          set({ 
            isAuthenticatingWithGoogle: true, 
            isAuthenticated: false, 
            user: null,
            isLoading: true 
          });
          localStorage.removeItem('auth-storage');
          
          await authGoogleLogin();
        } catch (error) {
          console.error('Error en Google login:', error);
          set({ 
            isAuthenticatingWithGoogle: false,
            isLoading: false 
          });
          throw error;
        }
      },

      githubLogin: async () => {
        try {
          set({ 
            isAuthenticatingWithGoogle: true, 
            isAuthenticated: false, 
            user: null,
            isLoading: true 
          });
          localStorage.removeItem('auth-storage');
          
          await authGithubLogin();
        } catch (error) {
          console.error('Error en GitHub login:', error);
          set({ 
            isAuthenticatingWithGoogle: false,
            isLoading: false 
          });
          throw error;
        }
      },

      updateProfile: async (userId: string, profileData: ProfileData) => {
        try {
          set({ isLoading: true });
          await authUpdateProfile(userId, profileData);
          const { isAuthenticated, user } = await verifyToken();
          set({ isAuthenticated, user, isLoading: false });
        } catch (error) {
          console.error('Error actualizando perfil:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      clearAuthState: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          isLoading: false,
          isAuthenticatingWithGoogle: false 
        });
        localStorage.removeItem('auth-storage');
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticatingWithGoogle: state.isAuthenticatingWithGoogle
      })
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useAuth.getState().clearAuthState();
  });
}



