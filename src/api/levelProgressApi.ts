import { api } from '@/api/api';
import { LevelProgress } from '@/types/levelProgress';

// Función para obtener el progreso del nivel de un usuario
export const fetchLevelProgress = async (userId: string): Promise<LevelProgress> => {
  try {
    const response = await api.get(`/level-progress/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el progreso de nivel:', error);
    throw new Error('Error al obtener datos de progreso de nivel');
  }
};

// Función para manejar la eliminación de elementos y actualizar el progreso
export const handleItemRemoval = async (userId: string, itemType: string): Promise<LevelProgress> => {
  try {
    const response = await api.post(`/level-progress/${userId}/remove-item`, { itemType });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el progreso tras eliminar un elemento:', error);
    throw new Error('Error al actualizar el progreso');
  }
};