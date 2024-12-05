import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';
import { verifyToken } from '../utils/jwtUtils';

const userRepository = AppDataSource.manager.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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
      // Si el usuario no tiene una contraseña almacenada, es probable que se haya autenticado con Google o GitHub
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const verifyJwt = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(200).json({ isAuthenticated: false, user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }

    res.json({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (err) {
    return res.status(200).json({ isAuthenticated: false, user: null });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
};

export const googleCallback = async (req: Request, res: Response) => {
  const token = jwt.sign({ id: (req.user as User).id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ message: 'Google login successful' });
};

export const githubCallback = async (req: Request, res: Response) => {
  const token = jwt.sign({ id: (req.user as User).id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ message: 'GitHub login successful' });
};
