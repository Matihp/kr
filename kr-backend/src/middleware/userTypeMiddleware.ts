import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Onboarding, UserType } from '../models/onboardingModel';

declare global {
  namespace Express {
    interface Request {
      userType?: string;
    }
  }
}

export const getUserType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const onboardingRepository = AppDataSource.getRepository(Onboarding);
    const onboarding = await onboardingRepository.findOne({
      where: { user: { id: req.userId } }
    });

    if (onboarding) {
      req.userType = onboarding.userType;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const isFreelancer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const onboardingRepository = AppDataSource.getRepository(Onboarding);
    const onboarding = await onboardingRepository.findOne({
      where: { user: { id: req.userId } }
    });

    if (!onboarding || onboarding.userType !== UserType.FREELANCER) {
      return res.status(403).json({ message: 'Only freelancers can perform this action' });
    }

    req.userType = UserType.FREELANCER;
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const isRecruiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const onboardingRepository = AppDataSource.getRepository(Onboarding);
    const onboarding = await onboardingRepository.findOne({
      where: { user: { id: req.userId } }
    });

    if (!onboarding || onboarding.userType !== UserType.RECRUITER) {
      return res.status(403).json({ message: 'Only recruiters can perform this action' });
    }

    req.userType = UserType.RECRUITER;
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};