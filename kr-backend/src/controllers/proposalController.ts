import { Request, Response } from 'express';
import { ProposalService } from '../services/proposalService';
import { UpdateProposalStatusDto } from '../dtos/proposalDto';

export class ProposalController {
  private proposalService = new ProposalService();

  async createProposal(req: Request, res: Response) {
    try {
      const freelancerId = req.userId;
      if (!freelancerId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const proposal = await this.proposalService.createProposal(freelancerId, req.body);
      res.status(201).json(proposal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProposal(req: Request, res: Response) {
    try {
      const { proposalId } = req.params;
      const freelancerId = req.userId;
      if (!freelancerId) {
        return res.status(401).json({ message: 'No autorizado' });
      }    
      const proposal = await this.proposalService.updateProposal(
        proposalId,
        freelancerId,
        req.body
      );
      res.json(proposal);
    } catch (error: any) {
      console.error('Error al actualizar la propuesta:', error);
      res.status(400).json({ message: error.message });
    }
  }
  
  async deleteProposal(req: Request, res: Response) {
    try {
      const { proposalId } = req.params;
      const freelancerId = req.userId;   
      if (!freelancerId) {
        return res.status(401).json({ message: 'No autorizado' });
      }   
      await this.proposalService.deleteProposal(proposalId, freelancerId);   
      res.status(204).send();
    } catch (error: any) {
      console.error('Error al eliminar la propuesta:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async updateProposalStatus(req: Request, res: Response) {
    try {
      const { proposalId } = req.params;
      const updateStatusDto: UpdateProposalStatusDto = {
        status: req.body.status,
        feedback: req.body.feedback,
        freelancerId: req.body.freelancerId,
        gigId: req.body.gigId
      };    
      const proposal = await this.proposalService.updateProposalStatus(
        proposalId,
        updateStatusDto
      );    
      res.json(proposal);
    } catch (error: any) {
      console.error('Error updating proposal status:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getGigProposals(req: Request, res: Response) {
    try {
      const { gigId } = req.params;
      const proposals = await this.proposalService.getGigProposals(gigId);
      res.json(proposals);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getFreelancerProposals(req: Request, res: Response) {
    try {
      const freelancerId = req.userId;
      if (!freelancerId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const proposals = await this.proposalService.getFreelancerProposals(freelancerId);
      res.json(proposals);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProposalById(req: Request, res: Response) {
    try {
      const { proposalId } = req.params;
      const userId = req.userId;
      const userType = req.userType;
      
      const proposal = await this.proposalService.getProposalById(proposalId, userId, userType);
      res.json(proposal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}