import { api } from "./api";

export const fetchProposalById = async (id: string) => {
  try {
    const response = await api.get(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching proposal details');
  }
};

export const createProposal = async (gigId: string, proposalData: any) => {
  try {
    const response = await api.post('/proposals', {
      ...proposalData,
      gigId
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating proposal');
  }
};

export const updateProposalStatus = async (proposalId: string, status: string) => {
  try {
    const response = await api.patch(`/proposals/${proposalId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Error updating proposal status');
  }
};

export const fetchGigProposals = async (gigId: string) => {
  try {
    const response = await api.get(`/proposals/gig/${gigId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching proposals for this gig');
  }
};

export const fetchMyProposals = async () => {
  try {
    const response = await api.get('/proposals/my-proposals');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching your proposals');
  }
};

export const deleteProposal = async (id: string) => {
  try {
    const response = await api.delete(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting proposal');
  }
};

export const updateProposal = async (id: string, proposalData: any) => {
  try {
    const response = await api.put(`/proposals/${id}`, proposalData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating proposal');
  }
};