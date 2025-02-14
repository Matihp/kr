import { Request, Response } from 'express';
import { InitializeOnboardingDto, UpdateOnboardingDto } from '../dtos/onboardingDto';
import { OnboardingService } from '../services/onboardingService';

export class OnboardingController {
    private onboardingService: OnboardingService;
  
    constructor() {
      this.onboardingService = new OnboardingService();
    }

    async initializeOnboarding(req: Request, res: Response) {
      try {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const userId = (req.user as any).id;
        const onboarding = await this.onboardingService.initializeOnboarding(userId);
        res.json(onboarding);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    async updateOnboarding(req: Request, res: Response) {
      try {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const userId = (req.user as any).id;
        const step = parseInt(req.params.step);
        const dto: UpdateOnboardingDto = req.body;
        const onboarding = await this.onboardingService.updateOnboardingStep(userId, step, dto);
        res.json(onboarding);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    async getOnboardingStatus(req: Request, res: Response) {
      try {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const userId = (req.user as any).id;
        const status = await this.onboardingService.getOnboardingStatus(userId);
        res.json(status);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
}
