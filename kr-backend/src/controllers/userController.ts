import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';
import { handleError } from '../utils/errorUtils';

const userRepository = AppDataSource.manager.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.params.id },
      select: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // ID del usuario autenticado
    const user = await userRepository.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};

