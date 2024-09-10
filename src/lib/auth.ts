import axios from 'axios';
import Cookies from 'js-cookie';

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', { firstName, lastName, email, password });
    // Guardar el JWT en las cookies
    Cookies.set('token', response.data.token, { expires: 7 }); // Ajusta el tiempo de expiración según sea necesario
    return response.data;
  } catch (error) {
    throw new Error('Error registering');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', 
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error logging in');
  }
};

export const logout = async () => {
  try {
    await axios.post('http://localhost:3000/auth/logout');
    // Eliminar el JWT de las cookies
    Cookies.remove('token');
  } catch (error) {
    throw new Error('Error logging out');
  }
};

