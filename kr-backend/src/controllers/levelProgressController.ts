import { Request, Response } from 'express';
import { LevelProgressService } from '../services/levelProgressService';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';

export class LevelProgressController {
  private levelProgressService = new LevelProgressService();
  private userRepository = AppDataSource.getRepository(User);

  async getUserProgress(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const progress = await this.levelProgressService.getOrCreateProgress(userId);
      return res.status(200).json(progress);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateUserProgress(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['skills', 'languages', 'projects', 'certifications'],
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const progress = await this.levelProgressService.updateProfileProgress(userId, user);
      return res.status(200).json(progress);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Método para manejar eliminación de elementos del perfil
  async handleItemRemoval(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const { itemType } = req.body;
      
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['skills', 'languages', 'projects', 'certifications'],
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const progress = await this.levelProgressService.handleItemRemoval(userId, user, itemType);
      return res.status(200).json(progress);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}