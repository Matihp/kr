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

  async getGigStages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stages = await this.gigService.getGigStages(id);
      return res.status(200).json(stages);
    } catch (error) {
      console.error('Error fetching gig stages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async getGigStageById(req: Request, res: Response) {
    try {
      const { id, stageId } = req.params;
      const stage = await this.gigService.getGigStageById(id, stageId);
      return res.status(200).json(stage);
    } catch (error : any) {
      console.error('Error fetching gig stage:', error);
      if (error.message === 'Stage not found') {
        return res.status(404).json({ message: 'Stage not found' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async createGigStage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      
      // Verificar que el gig pertenece al usuario actual
      const gig = await this.gigService.getGigById(id);
      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }
      
      if (gig.recruiter.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to add stages to this gig' });
      }
      
      const stageData = req.body;
      const stage = await this.gigService.createGigStage(id, stageData);
      
      return res.status(201).json(stage);
    } catch (error) {
      console.error('Error creating gig stage:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateGigStage(req: Request, res: Response) {
    try {
      const { id, stageId } = req.params;
      const userId = req.userId;
      
      // Verificar que el gig pertenece al usuario actual
      const gig = await this.gigService.getGigById(id);
      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }
      
      if (gig.recruiter.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update stages for this gig' });
      }
      
      const stageData = req.body;
      
      if (!stageData || Object.keys(stageData).length === 0) {
        return res.status(400).json({ message: 'No data provided for update' });
      }
      
      const stage = await this.gigService.updateGigStage(id, stageId, stageData);
      
      return res.status(200).json(stage);
    } catch (error : any) {
      console.error('Error updating gig stage:', error);
      if (error.message === 'Stage not found') {
        return res.status(404).json({ message: 'Stage not found' });
      }
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
  async deleteGigStage(req: Request, res: Response) {
    try {
      const { id, stageId } = req.params;
      const userId = req.userId;
      
      // Verificar que el gig pertenece al usuario actual
      const gig = await this.gigService.getGigById(id);
      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }
      
      if (gig.recruiter.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete stages for this gig' });
      }
      
      const result = await this.gigService.deleteGigStage(id, stageId);
      
      return res.status(200).json({ message: 'Stage deleted successfully' });
    } catch (error : any) {
      console.error('Error deleting gig stage:', error);
      if (error.message === 'Stage not found') {
        return res.status(404).json({ message: 'Stage not found' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async reorderGigStages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { stages } = req.body;
      const userId = req.userId;
      // Verificar que hay datos para actualizar
      if (!stages || !Array.isArray(stages) || stages.length === 0) {
        return res.status(400).json({ message: 'No valid stages data provided for update' });
      }
      
      // Verificar que el gig pertenece al usuario actual
      const gig = await this.gigService.getGigById(id);
      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }
      
      if (gig.recruiter.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to reorder stages for this gig' });
      }
      
      await this.gigService.reorderGigStages(id, stages);
      
      return res.status(200).json({ message: 'Stages reordered successfully' });
    } catch (error) {
      console.error('Error reordering gig stages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}