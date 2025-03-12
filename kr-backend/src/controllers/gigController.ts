import { Request, Response } from 'express';
import { GigService } from '../services/gigService';

export class GigController {
  private gigService = new GigService();

  async createGig(req: Request, res: Response) {
    try {
      const recruiterId = req.userId;
      if (!recruiterId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const gig = await this.gigService.createGig(recruiterId, req.body);
      res.status(201).json(gig);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getGigs(req: Request, res: Response) {
    try {
      const filters = req.query;
      const gigs = await this.gigService.getGigs(filters);
      
      res.json(gigs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getRecruiterGigs(req: Request, res: Response) {
    try {
      const recruiterId = req.userId;
      if (!recruiterId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const gigs = await this.gigService.getRecruiterGigs(recruiterId);
      res.json(gigs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getParticipatingGigs(req: Request, res: Response) {
    try {
      const freelancerId = req.userId;
      if (!freelancerId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const gigs = await this.gigService.getParticipatingGigs(freelancerId);
      res.json(gigs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getGigById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gig = await this.gigService.getGigById(id);
      
      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }
      
      res.json(gig);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateGig(req: Request, res: Response) {
    try {
      const recruiterId = req.userId;
      const { id } = req.params;
      
      if (!recruiterId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const updatedGig = await this.gigService.updateGig(id, recruiterId, req.body);
      res.json(updatedGig);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteGig(req: Request, res: Response) {
    try {
      const recruiterId = req.userId;
      const { id } = req.params;
      
      if (!recruiterId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      await this.gigService.deleteGig(id, recruiterId);
      res.json({ message: 'Gig deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateGigStage(req: Request, res: Response) {
    try {
      const { gigId, stageId } = req.params;
      const { completed } = req.body;
      
      const stage = await this.gigService.updateGigStage(gigId, stageId, completed);
      
      res.json(stage);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}