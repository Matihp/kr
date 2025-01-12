import axios from 'axios';
import { ProtectedDataResponse } from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

export const getProtectedData = async (): Promise<ProtectedDataResponse> => {
  try {
    const response = await api.get<ProtectedDataResponse>('/protected');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching protected data');
  }
};

export const fetchSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching skills data');
  }
};


