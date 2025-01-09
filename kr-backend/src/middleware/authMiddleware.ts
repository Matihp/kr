// middleware/authMiddleware.ts
import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../models/roleModel';

const userRepository = AppDataSource.manager.getRepository(User);

export const checkRole = (requiredRole: RoleType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await userRepository.findOne({
            where: { id: String(req.userId) },
            relations: ['role']
        });

        if (!user || user.role.type !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};