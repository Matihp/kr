import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/register', { firstName, lastName, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw new Error('Error registering');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/login', 
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error logging in');
  }
};

export const verifyToken = async (): Promise<{ isAuthenticated: boolean; user: User | null }> => {
  try {
    // const token = Cookies.get('jwt');
    // console.log(token)
    // if (!token) {
    //   return { isAuthenticated: false, user: null };
    // }
    const response = await axios.post('http://localhost:4000/auth/verify-token', {}, 
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    return { isAuthenticated: false, user: null };
  }
};

export const logout = async () => {
  try {
    await axios.post('http://localhost:4000/auth/logout', {}, { withCredentials: true });
    Cookies.remove('token');
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Error logging out');
  }
};


