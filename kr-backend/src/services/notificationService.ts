import { AppDataSource } from '../config/data-source';
import { CreateNotificationDto, NotificationResponseDto, UpdateNotificationDto } from '../dtos/notificationDto';
import { Notification } from '../models/notificationModel';
import { NotFoundError } from '../utils/errorUtils';
import { IsNull, LessThan, MoreThan } from 'typeorm';

export class NotificationService {
    private notificationRepository = AppDataSource.getRepository(Notification);
  
    async findAllByUserId(userId: string): Promise<NotificationResponseDto[]> {
      const now = new Date();
      const notifications = await this.notificationRepository.find({
        where: [
          { user: { id: userId }, expiresAt: IsNull() },
          { user: { id: userId }, expiresAt: MoreThan(now) },
        ],
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
  
      return notifications.map(notification => ({
        id: notification.id,
        message: notification.message,
        type: notification.type,
        createdAt: notification.createdAt,
        expiresAt: notification.expiresAt,
        isRead: notification.isRead,
        userId: notification.user.id,
      }));
    }
  
    async findById(id: string): Promise<Notification> {
      const notification = await this.notificationRepository.findOne({
        where: { id },
      });
  
      if (!notification) {
        throw new NotFoundError('Notificación no encontrada');
      }
  
      return notification;
    }
  
    async create(dto: CreateNotificationDto): Promise<NotificationResponseDto> {
      try {
        const newNotification = this.notificationRepository.create(dto);
        const savedNotification = await this.notificationRepository.save(newNotification);
        return {
          id: savedNotification.id,
          message: savedNotification.message,
          type: savedNotification.type,
          createdAt: savedNotification.createdAt,
          expiresAt: savedNotification.expiresAt,
          isRead: savedNotification.isRead,
          userId: savedNotification.user.id,
        };
      } catch (error: any) {
        throw error;
      }
    }
  
    async update(id: string, dto: UpdateNotificationDto): Promise<NotificationResponseDto> {
      const notification = await this.findById(id);
  
      try {
        this.notificationRepository.merge(notification, dto);
        const updatedNotification = await this.notificationRepository.save(notification);
        return {
          id: updatedNotification.id,
          message: updatedNotification.message,
          type: updatedNotification.type,
          createdAt: updatedNotification.createdAt,
          expiresAt: updatedNotification.expiresAt,
          isRead: updatedNotification.isRead,
          userId: updatedNotification.user.id,
        };
      } catch (error: any) {
        throw error;
      }
    }
  
    async delete(id: string): Promise<void> {
      const notification = await this.findById(id);
      await this.notificationRepository.remove(notification);
    }
  
    async markAsRead(id: string): Promise<void> {
      const notification = await this.findById(id);
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    }
  
    async markAllAsRead(userId: string): Promise<void> {
      const now = new Date();
      await this.notificationRepository.createQueryBuilder()
        .update(Notification)
        .set({ isRead: true })
        .where('userId = :userId', { userId })
        .andWhere('(expiresAt IS NULL OR expiresAt > :now)', { now })
        .execute();
    }
  
    async cleanupExpiredNotifications(): Promise<void> {
      const now = new Date();
      await this.notificationRepository.delete({
        expiresAt: LessThan(now)
      });
    }
  }
