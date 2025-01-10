import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';
import { handleError } from '../utils/errorUtils';
import bcrypt from 'bcrypt';
import { Role, RoleType } from '../models/roleModel';

const userRepository = AppDataSource.manager.getRepository(User);

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await userRepository.remove(user);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    handleError(error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await AppDataSource.manager.getRepository(Role).findOne({
      where: { type: RoleType.USER }
    });

    if (!role) {
      return res.status(500).json({ message: 'Role configuration error' });
    }

    const user = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await userRepository.save(user);
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    handleError(error, res);
  }
};
