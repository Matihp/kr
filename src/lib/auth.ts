import axios from 'axios';
import { ProfileData } from '../../kr-backend/src/types/profileTypes';


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

export const googleLogin = async () => {
  window.location.href = 'http://localhost:4000/auth/google';
};

export const githubLogin = async () => {
  window.location.href = 'http://localhost:4000/auth/github';
};

export const verifyToken = async () => {
  try {
    const response = await axios.get('http://localhost:4000/auth/verify-token', {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    return { isAuthenticated: false, user: null };
  }
};

export const logout = async () => {
  try {
    await axios.post('http://localhost:4000/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Error logging out');
  }
};

export const updateProfile = async (userId: string, profileData: ProfileData) => {
  try {
    const response = await axios.put(`http://localhost:4000/profile/update-profile/${userId}`, profileData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Error updating profile');
  }
};




