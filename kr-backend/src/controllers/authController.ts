import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { handleError } from '../utils/errorUtils';
import { z } from 'zod';
import { Role, RoleType } from '../models/roleModel';
import { AuthenticationError } from '../types/errors';
import { EmailService } from '../services/emailService';

const userRepository = AppDataSource.manager.getRepository(User);

// Definir esquemas de validación con Zod
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

export const register = async (req: Request, res: Response) => {
  try {
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
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

    await EmailService.sendWelcomeEmail(user);
    
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

export const login = async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { email, password } = validationResult.data;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id }, process.env.JWT_SECRET!, '1d');

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

export const verifyJwt = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(200).json({ isAuthenticated: false, user: null });
  }

  try {
    const decodedToken = verifyToken(token) as { id: string };
    const user = await userRepository.findOne({
      where: { id: decodedToken.id },
      relations: ['languages', 'skills', 'projects', 'certifications', 'role']
    });

    if (!user) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }

    res.json({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description,
        role: user.role.type,
        avatarSrc: user.avatarSrc,
        languages: user.languages,
        skills: user.skills,
        projects: user.projects,
        certifications: user.certifications
      }
    });
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(200).json({ isAuthenticated: false, user: null });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const validationResult = changePasswordSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { email, currentPassword, newPassword } = validationResult.data;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await userRepository.save(user);

    res.header('Authorization', `Bearer ${req.cookies.jwt}`);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    handleError(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Limpiar la cookie JWT
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

export const googleCallback = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    if (req.user) {
      const token = generateToken(
        { id: (req.user as User).id },
        process.env.JWT_SECRET!,
        '1d'
      );
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });
      res.redirect('http://localhost:3000');
    } else {
      // Si no hay usuario, probablemente hubo un error de autenticación
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  } catch (error) {
    console.log('Error en googleCallback:', error);
    
    // Manejar específicamente el error de email en uso
    if (error instanceof AuthenticationError && error.code === 'EMAIL_IN_USE') {
      res.redirect('http://localhost:3000/login?error=email_in_use');
    } else {
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  }
};

export const githubCallback = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    const token = generateToken(
      { id: (req.user as User).id },
      process.env.JWT_SECRET!,
      '1d'
    );
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
