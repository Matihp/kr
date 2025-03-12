import { api } from "./api";

export const createGig = async (gigData: any) => {
  try {
    const response = await api.post('/gigs', gigData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGigs = async () => {
    try {
      const response = await api.get('/gigs');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching gigs');
    }
  };
  
  export const fetchMyGigs = async () => {
    try {
      const response = await api.get('/gigs/my-gigs');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching your gigs');
    }
  };

  export const fetchParticipatingGigs = async () => {
    try {
      const response = await api.get('/gigs/participating');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching gigs');
    }
  }
  
  export const fetchGigById = async (id: string) => {
    try {
      const response = await api.get(`/gigs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching gig details');
    }
  };
  
  export const updateGig = async (id: string, gigData: any) => {
    try {
      const response = await api.put(`/gigs/${id}`, gigData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating gig');
    }
  };
  
  export const deleteGig = async (id: string) => {
    try {
      const response = await api.delete(`/gigs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting gig');
    }
  };
  
  export const updateGigStage = async (gigId: string, stageId: string, data: any) => {
    try {
      const response = await api.patch(`/gigs/${gigId}/stages/${stageId}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Error updating gig stage');
    }
  };