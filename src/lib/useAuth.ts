import { create } from 'zustand'
import { verifyToken, login as authLogin, logout as authLogout } from './auth';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      await authLogin(email, password);
      // await new Promise(resolve => setTimeout(resolve, 1000));   
      const { isAuthenticated, user } = await verifyToken();
      set({ isAuthenticated, user });
      return true;
    } catch (error) {
      console.error('Fallo en el login:', error);
      set({ isAuthenticated: false, user: null });
      return false;
    }
  },
  logout: async () => {
    try {
      await authLogout();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Fallo en el logout:', error);
    }
  },
  checkAuth: async () => {
    try {
      const { isAuthenticated, user } = await verifyToken();
      set({ isAuthenticated, user });
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      set({ isAuthenticated: false, user: null });
    }
  }
}));