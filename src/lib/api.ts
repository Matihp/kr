import axios from 'axios';
import { ProtectedDataResponse } from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Asegúrate de que las cookies se envíen con las solicitudes
});

export const getProtectedData = async (): Promise<ProtectedDataResponse> => {
  try {
    const response = await api.get<ProtectedDataResponse>('/protected');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching protected data');
  }
};


