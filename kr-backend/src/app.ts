import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { verifyToken } from './utils/jwtUtils';
import cors from 'cors';
import passport from './config/passport';
import profileRoutes from './routes/profileRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // URL de tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(passport.initialize());

// Middleware para verificar el token en cada solicitud
app.use((req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(); // Si no hay token, continúa con la siguiente ruta
  }

  try {
    const decodedToken = verifyToken(token);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

AppDataSource.initialize().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log('Error during Data Source initialization', error);
});

