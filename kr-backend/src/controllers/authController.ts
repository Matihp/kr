import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { plainToInstance } from 'class-transformer';
import { RegisterDto, LoginDto, ChangePasswordDto } from '../dtos/authDto';
import { handleError } from '../utils/errorUtils';
import { z } from 'zod';
import { User } from '../models/userModel';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password is required'),
});

const changePasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(4, 'New password must be at least 4 characters long'),
});

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const validationResult = registerSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
      }

      const dto = plainToInstance(RegisterDto, validationResult.data);
      const user = await this.authService.register(dto);

      res.json({
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.type
        }
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
      }

      const dto = plainToInstance(LoginDto, validationResult.data);
      const { token, user } = await this.authService.login(dto);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });

      res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    } catch (error) {
      handleError(error, res);
    }
  };

  public verifyJwt = async (req: Request, res: Response) => {
    const token = req.cookies.jwt;

    try {
      const { isAuthenticated, user } = await this.authService.verifyJwt(token);
      res.json({ isAuthenticated, user });
    } catch (error) {
      handleError(error, res);
    }
  };

  public changePassword = async (req: Request, res: Response) => {
    try {
      const validationResult = changePasswordSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
      }

      const dto = plainToInstance(ChangePasswordDto, validationResult.data);
      await this.authService.changePassword(dto);

      res.header('Authorization', `Bearer ${req.cookies.jwt}`);
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      handleError(error, res);
    }
  };

  public logout = (req: Request, res: Response) => {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public googleCallback = async (req: Request, res: Response) => {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      if (req.user) {
        const token = await this.authService.googleCallback(req.user as User);
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
          path: '/'
        });
        res.redirect('http://localhost:3000');
      } else {
        res.redirect('http://localhost:3000/login?error=auth_failed');
      }
    } catch (error) {
      console.log('Error en googleCallback:', error);
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  };

  public githubCallback = async (req: Request, res: Response) => {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      const token = await this.authService.githubCallback(req.user as User);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });
      res.redirect('http://localhost:3000');
    } catch (error) {
      console.error('Error en googleCallback:', error);
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  };
}

