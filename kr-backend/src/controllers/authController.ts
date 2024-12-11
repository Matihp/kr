import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { isValidEmail, isValidPassword, isValidName } from '../utils/validationUtils';
import { handleError } from '../utils/errorUtils';

const userRepository = AppDataSource.manager.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 4 characters long' });
    }
    if (!isValidName(firstName)) {
      return res.status(400).json({ message: 'Invalid first name format' });
    }
    if (!isValidName(lastName)) {
      return res.status(400).json({ message: 'Invalid last name format' });
    }

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
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

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
    const decoded = verifyToken(token) as { id: number };
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Verificar si el usuario existe
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
      // Si el usuario no tiene una contraseña almacenada, es probable que se haya autenticado con Google o GitHub
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Encriptar la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    user.password = hashedNewPassword;
    await userRepository.save(user);

    // Establecer el encabezado de autorización antes de enviar la respuesta
    res.header('Authorization', `Bearer ${req.cookies.jwt}`);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    handleError(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
};

export const googleCallback = async (req: Request, res: Response) => {
  const token = generateToken({ id: (req.user as User).id }, process.env.JWT_SECRET!, '1d');

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });

  setTimeout(() => {
    res.redirect('http://localhost:3000');
  }, 200);
};

export const githubCallback = async (req: Request, res: Response) => {
  const token = generateToken({ id: (req.user as User).id }, process.env.JWT_SECRET!, '1d');

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });

  setTimeout(() => {
    res.redirect('http://localhost:3000');
  }, 200);
};
