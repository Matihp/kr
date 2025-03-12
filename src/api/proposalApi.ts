import { api } from "./api";

export const fetchProposalById = async (id: string) => {
  try {
    const response = await api.get(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching proposal details');
  }
}

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
}

export const updatePropStatus = async (proposalId: string, status: string) => {
  try {
    // Propuesta para asegurarnos de tener todos los datos
    const proposal = await fetchProposalById(proposalId);
    
    // Payload más completo con toda la información necesaria
    const payload = {
      status,
      freelancerId: proposal.freelancer.id,
      gigId: proposal.gig.id,
      feedback: status === "accepted" ? "" : undefined
    };
    
    const response = await api.patch(`/proposals/${proposalId}/status`, payload);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de la propuesta:', error);
    throw error;
  }
};

export const fetchGigProposals = async (gigId: string) => {
  try {
    const response = await api.get(`/proposals/gig/${gigId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching proposals for this gig');
  }
}

export const fetchMyProposals = async () => {
  try {
    const response = await api.get('/proposals/my-proposals');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching your proposals');
  }
}

export const deleteProposal = async (id: string) => {
  try {
    const response = await api.delete(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting proposal');
  }
}

export const updateProposal = async (id: string, proposalData: any) => {
  try {
    const response = await api.put(`/proposals/${id}`, proposalData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating proposal');
  }
}