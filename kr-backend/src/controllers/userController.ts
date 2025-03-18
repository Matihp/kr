import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { plainToInstance } from 'class-transformer';
import { NotFoundError, handleError } from '../utils/errorUtils';
import { UpdateUserDto } from '../dtos/userDto';
import { z } from 'zod';
import { UserType } from '../models/onboardingModel';

const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 18)),
  skillName: z.string().optional(),
  userType: z.nativeEnum(UserType).optional(),
});

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const validationResult = paginationSchema.safeParse(req.query);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
      }

      const { page, limit, skillName, userType } = validationResult.data;
      const { users, total, pages } = await this.userService.findAll(page, limit, skillName, userType);

      res.json({
        users,
        total,
        page,
        limit,
        pages,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findById(req.params.id);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.userId; // ID del usuario autenticado
      const dto = plainToInstance(UpdateUserDto, req.body);

      if (req.params.id !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const user = await this.userService.update(req.params.id, dto);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };
}