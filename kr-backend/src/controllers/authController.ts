import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    
    // Establecer el token solo como una cookie httpOnly
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Añadido para mayor seguridad
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
    
    // No enviamos el token en el cuerpo de la respuesta
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const googleCallback = (req: Request, res: Response) => {
  const token = jwt.sign({ id: (req.user as User).id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que la cookie sea segura en producción
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });
  res.json({ message: 'Google login successful' });
};

export const githubCallback = (req: Request, res: Response) => {
  const token = jwt.sign({ id: (req.user as User).id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que la cookie sea segura en producción
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });
  res.json({ message: 'GitHub login successful' });
};
