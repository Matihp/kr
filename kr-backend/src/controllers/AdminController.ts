import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { NotFoundError, handleError } from '../utils/errorUtils';
import { CreateUserDto } from '../dtos/userDto';
import { AdminService } from '../services/adminService';

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public deleteUser = async (req: Request, res: Response) => {
    try {
      await this.adminService.delete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const dto = plainToInstance(CreateUserDto, req.body);
      const user = await this.adminService.create(dto);
      res.json({ message: 'User created successfully', user });
    } catch (error) {
      handleError(error, res);
    }
  };
}

