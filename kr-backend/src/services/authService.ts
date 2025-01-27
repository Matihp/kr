import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Role, RoleType } from '../models/roleModel';
import { Notification } from '../models/notificationModel';
import { RegisterDto, LoginDto, ChangePasswordDto } from '../dtos/authDto';
import { NotFoundError } from '../utils/errorUtils';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { EmailService } from '../services/emailService';
import { createNotificationFromTemplate, NotificationTemplates } from '../constants/notificationTemplates';
import { AuthProvider } from '../types/userTypes';

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const notificationRepository = AppDataSource.getRepository(Notification);

export class AuthService {
    async register(dto: RegisterDto): Promise<User> {
      const { firstName, lastName, email, password } = dto;
  
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const role = await roleRepository.findOne({ where: { type: RoleType.USER } });
      if (!role) {
        throw new Error('Role configuration error');
      }
  
      const user = userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      });
  
      await userRepository.save(user);
  
      await createNotificationFromTemplate(
        notificationRepository,
        user,
        NotificationTemplates.WELCOME,
        { firstName: user.firstName }
      );
  
    //   await EmailService.sendWelcomeEmail(user);
  
      return user;
    }
  
    async login(dto: LoginDto): Promise<{ token: string; user: User }> {
      const { email, password } = dto;
  
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundError('Invalid credentials');
      }
  
      if (!user.password) {
        throw new NotFoundError('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundError('Invalid credentials');
      }
  
      const token = generateToken({ id: user.id }, process.env.JWT_SECRET!, '1d');
  
      return { token, user };
    }
  
    async verifyJwt(token: string): Promise<{ isAuthenticated: boolean; user: User | null }> {
      if (!token) {
        return { isAuthenticated: false, user: null };
      }
  
      try {
        const decodedToken = verifyToken(token) as { id: string };
        const user = await userRepository.findOne({
          where: { id: decodedToken.id },
          relations: ['languages', 'skills', 'projects', 'certifications', 'role']
        });
  
        if (!user) {
          return { isAuthenticated: false, user: null };
        }
  
        return {
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              description: user.description,
              role: user.role, // Accedemos a la propiedad 'type' del objeto 'Role'
              avatarSrc: user.avatarSrc,
              languages: user.languages,
              skills: user.skills,
              projects: user.projects,
              certifications: user.certifications,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              authProvider: user.authProvider,
              notifications: user.notifications
            }
          };
      } catch (err) {
        console.error('Error verifying token:', err);
        return { isAuthenticated: false, user: null };
      }
    }
  
    async changePassword(dto: ChangePasswordDto): Promise<void> {
      const { email, currentPassword, newPassword } = dto;
  
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundError('User not found');
      }
  
      if (!user.password) {
        throw new NotFoundError('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new NotFoundError('Invalid credentials');
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await userRepository.save(user);
    }
  
    async googleCallback(user: User): Promise<string> {
      const token = generateToken({ id: user.id }, process.env.JWT_SECRET!, '1d');
      await createNotificationFromTemplate(
        notificationRepository,
        user,
        NotificationTemplates.WELCOME,
        { firstName: user.firstName }
      );
      return token;
    }
  
    async githubCallback(user: User): Promise<string> {
      const token = generateToken({ id: user.id }, process.env.JWT_SECRET!, '1d');
      await createNotificationFromTemplate(
        notificationRepository,
        user,
        NotificationTemplates.WELCOME,
        { firstName: user.firstName }
      );
      return token;
    }
  }