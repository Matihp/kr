import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';
import { NotFoundError } from '../utils/errorUtils';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  public getUserNotifications = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const notifications = await this.notificationService.findAllByUserId(userId);
      return res.status(200).json(notifications);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
      return res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
  };

  public markAsRead = async (req: Request, res: Response) => {
    try {
      const notificationId = req.params.id;
      await this.notificationService.markAsRead(notificationId);
      return res.status(200).json({ message: 'Notificación marcada como leída' });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error("Error al actualizar la notificación:", error);
      return res.status(500).json({ message: 'Error al actualizar la notificación' });
    }
  };

  public markAllAsRead = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      await this.notificationService.markAllAsRead(userId);
      return res.status(200).json({
        message: 'Todas las notificaciones han sido marcadas como leídas'
      });
    } catch (error) {
      console.error("Error al actualizar las notificaciones:", error);
      return res.status(500).json({
        message: 'Error al actualizar las notificaciones'
      });
    }
  };

  public cleanupExpiredNotifications = async () => {
    try {
      await this.notificationService.cleanupExpiredNotifications();
    } catch (error) {
      console.error('Error al limpiar las notificaciones expiradas:', error);
    }
  };
}
