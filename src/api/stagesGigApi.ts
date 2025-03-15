import { api } from "./api";

export const fetchGigStages = async (gigId: string) => {
    try {
      const response = await api.get(`/gigs/${gigId}/stages`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching gig stages');
    }
  };
  
  export const fetchGigStage = async (gigId: string, stageId: string) => {
    try {
      const response = await api.get(`/gigs/${gigId}/stages/${stageId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching stage details');
    }
  };
  
  export const createGigStage = async (gigId: string, stageData: any) => {
    try {
      const response = await api.post(`/gigs/${gigId}/stages`, stageData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating stage');
    }
  };
  
  export const updateGigStage = async (gigId: string, stageId: string, stageData: any) => {
    try {
      const response = await api.put(`/gigs/${gigId}/stages/${stageId}`, stageData);
      return response.data;
    } catch (error) {
      console.error('Error in updateGigStage API call:', error);
      throw error;
    }
  };

  export const updateGigStageOrder = async (gigId: string, stagesOrder: { id: string, order: number }[]) => {
    try {
      const response = await api.put(`/gigs/${gigId}/stages-reorder`, { stages: stagesOrder });
      return response.data;
    } catch (error) {
      console.error('Error in updateGigStageOrder API call:', error);
      throw error;
    }
  };
  
  export const deleteGigStage = async (gigId: string, stageId: string) => {
    try {
      const response = await api.delete(`/gigs/${gigId}/stages/${stageId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting stage');
    }
  };