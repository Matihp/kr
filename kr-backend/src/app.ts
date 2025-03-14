import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { verifyToken } from './utils/jwtUtils';
import cors from 'cors';
import passport from './config/passport';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import skillRoutes from './routes/skillRoutes';
import newsRoutes from './routes/newsRoutes';
import notificationRoutes from './routes/notificationRoutes';
import onboardingRoutes from './routes/onboardingRoutes';
import gigRoutes from './routes/gigRoutes';
import proposalRoutes from './routes/proposalRoutes';
import { levelProgressRoutes } from './routes/levelProgressRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

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
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/projects', projectRoutes);
app.use('/skills', skillRoutes);
app.use('/admin', adminRoutes);
app.use('/news',newsRoutes)
app.use('/notifications', notificationRoutes);
app.use('/level-progress', levelProgressRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/gigs', gigRoutes);
app.use('/proposals', proposalRoutes);

AppDataSource.initialize().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log('Error during Data Source initialization', error);
});

