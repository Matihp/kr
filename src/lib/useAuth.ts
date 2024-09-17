import { useState, useEffect, useCallback } from 'react';
import { verifyToken, login as authLogin, logout as authLogout } from './auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuth = useCallback(async () => {
    try {
      const { isAuthenticated, user } = await verifyToken();
      setAuthState({ isAuthenticated, user, loading: false });
    } catch (error) {
      console.error('Error checking auth:', error);
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);
      await checkAuth(); // Verifica el token inmediatamente después del login
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState({ isAuthenticated: false, user: null, loading: false });
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