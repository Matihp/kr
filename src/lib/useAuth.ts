import { useState, useEffect } from 'react';
import { verifyToken, login as authLogin, logout as authLogout } from './auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated, user } = await verifyToken();
      setAuthState({ isAuthenticated, user, loading: false });
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);
      const { isAuthenticated, user } = await verifyToken();
      setAuthState({ isAuthenticated, user, loading: false });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { ...authState, login, logout };
};