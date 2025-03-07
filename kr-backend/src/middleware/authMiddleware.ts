import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { RoleType } from '../models/roleModel';
import { verifyToken } from '../utils/jwtUtils';
import { Onboarding } from '../models/onboardingModel';

// Add userType to Express Request interface
declare global {
  namespace Express {
    interface Request {
      userType?: string;
    }
  }
}

const userRepository = AppDataSource.manager.getRepository(User);

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.findOne({ where: { id: req.userId }, relations: ['role'] });
    if (!user || user.role.type !== RoleType.ADMIN) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = verifyToken(token);
      req.userId = decodedToken.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

export const checkUserJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = verifyToken(token) as { id: string };
    req.userId = decodedToken.id;

    const user = await userRepository.findOne({ 
      where: { id: decodedToken.id } as any,
      relations: ['role'] 
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// New middleware to get user type
export const getUserType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return next(); // Skip if no userId (will be caught by auth middleware)
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
    // Just continue if there's an error getting user type
    next();
  }
};
