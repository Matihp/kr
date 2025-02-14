import { Request, Response, NextFunction } from 'express';
import { OnboardingService } from '../services/onboardingService';

const onboardingService = new OnboardingService();

export const checkOnboardingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.path.startsWith('/api/onboarding') || req.path.startsWith('/api/auth')) {
        return next();
      }
  
      const userId = (req.user as any).id;
      if (!userId) {
        return next();
      }
  
      const status = await onboardingService.getOnboardingStatus(userId);
      
      if (!status.isCompleted) {
        return res.status(403).json({
          message: 'Please complete onboarding first',
          currentStep: status.currentStep,
          redirectTo: '/onboarding'
        });
      }
  
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking onboarding status' });
    }
  };