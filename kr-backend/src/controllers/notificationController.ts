import { Request, Response } from 'express';
import { Notification } from '../models/notificationModel';
import { AppDataSource } from '../config/data-source';
import { IsNull, LessThan, MoreThan } from 'typeorm';

const notificationRepository = AppDataSource.manager.getRepository(Notification);

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const now = new Date();

    const notifications = await notificationRepository.find({
      where: [
        { user: { id: userId }, expiresAt: IsNull() },
        { user: { id: userId }, expiresAt: MoreThan(now) },
      ],
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ message: 'Error al obtener las notificaciones' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    
    const notification = await notificationRepository.findOne({
      where: { id: notificationId }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    notification.isRead = true;
    await notificationRepository.save(notification);

    return res.status(200).json({ message: 'Notificación marcada como leída' });
  } catch (error) {
    console.error("Error al actualizar la notificación:", error);
    return res.status(500).json({ message: 'Error al actualizar la notificación' });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const now = new Date();

    // Actualizar todas las notificaciones no expiradas del usuario
    await notificationRepository.createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where('userId = :userId', { userId })
      .andWhere('(expiresAt IS NULL OR expiresAt > :now)', { now })
      .execute();

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

export const cleanupExpiredNotifications = async () => {
  try {
    const now = new Date();
    await notificationRepository.delete({
      expiresAt: LessThan(now)
    });
  } catch (error) {
    console.error('Error cleaning up notifications:', error);
  }
};