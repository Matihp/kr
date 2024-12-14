import { create } from 'zustand';
import { verifyToken, login as authLogin, logout as authLogout, googleLogin as authGoogleLogin, githubLogin as authGithubLogin, updateProfile as authUpdateProfile } from './auth';
import axios from 'axios';
import { User } from '../../kr-backend/src/models/userModel';
import { ProfileData } from '../../kr-backend/src/types/profileTypes';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  googleLogin: () => Promise<void>;
  githubLogin: () => Promise<void>;
  updateProfile: (userId: string, profileData: ProfileData) => Promise<void>;
  verifyToken: () => Promise<{ isAuthenticated: boolean; user: User | null }>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      await authLogin(email, password);
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
  },
  googleLogin: async () => {
    await authGoogleLogin();
  },
  githubLogin: async () => {
    await authGithubLogin();
  },
  updateProfile: async (userId: string, profileData: ProfileData) => {
    try {
      await authUpdateProfile(userId, profileData);
      const { isAuthenticated, user } = await verifyToken();
      set({ isAuthenticated, user });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  },
  verifyToken: async () => {
    try {
      const response = await axios.get('http://localhost:4000/auth/verify-token', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying token:', error);
      return { isAuthenticated: false, user: null };
    }
  },
}));



