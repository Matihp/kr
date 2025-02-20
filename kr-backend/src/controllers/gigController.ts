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