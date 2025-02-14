import { User } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Aseguramos que sea string para coincidir con el tipo en User
      user?: User;
    }
  }
}