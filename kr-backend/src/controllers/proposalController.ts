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

  async updateProposalStatus(req: Request, res: Response) {
    try {
      const { proposalId } = req.params;
      const updateStatusDto: UpdateProposalStatusDto = req.body;   
      const proposal = await this.proposalService.updateProposalStatus(
        proposalId,
        updateStatusDto
      );    
      res.json(proposal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getGigProposals(req: Request, res: Response) {
    try {
      const { gigId } = req.params;
      const proposals = await this.proposalService.getProposalById(gigId);     
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
      const freelancerId = req.userId;     
      const proposal = await this.proposalService.getProposalById(proposalId, freelancerId);
      res.json(proposal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}