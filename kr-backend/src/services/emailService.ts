import { User} from '../models/userModel';
import { transporter } from '../config/emailConfig';
import { AuthProvider } from '../types/userTypes';

export class EmailService {
  static async sendWelcomeEmail(user: User) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: '¡Bienvenido a nuestra plataforma!',
        html: this.getWelcomeTemplate(user.firstName, user.authProvider)
      });
      console.log(`Email enviado exitosamente a ${user.email}`);
    } catch (error) {
      console.error(`Error enviando email a ${user.email}:`, error);
    }
  }

  private static getWelcomeTemplate(name: string, authProvider: AuthProvider) {
    let methodText = '';
    switch(authProvider) {
      case AuthProvider.GOOGLE:
        methodText = 'Google';
        break;
      case AuthProvider.GITHUB:
        methodText = 'GitHub';
        break;
      default:
        methodText = 'registro directo';
    }

    return `
      <h1>¡Bienvenido ${name}!</h1>
      <p>Gracias por unirte a nuestra plataforma a través de ${methodText}.</p>
      <p>Estamos emocionados de tenerte con nosotros.</p>
    `;
  }
}