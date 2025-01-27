import { IsString, IsEnum, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { NotificationType } from '../types/notificationTypes';

export class CreateNotificationDto {
  @IsString({ message: 'El mensaje debe ser un string' })
  message!: string;

  @IsEnum(NotificationType, { message: 'El tipo debe ser un valor válido' })
  type!: NotificationType;

  @IsOptional()
  @IsDate({ message: 'La fecha de expiración debe ser una fecha válida' })
  expiresAt?: Date;

  @IsBoolean({ message: 'El campo isRead debe ser un booleano' })
  isRead!: boolean;

  @IsString({ message: 'El userId debe ser un string' })
  userId!: string;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsString({ message: 'El mensaje debe ser un string' })
  message?: string;

  @IsOptional()
  @IsEnum(NotificationType, { message: 'El tipo debe ser un valor válido' })
  type?: NotificationType;

  @IsOptional()
  @IsDate({ message: 'La fecha de expiración debe ser una fecha válida' })
  expiresAt?: Date;

  @IsOptional()
  @IsBoolean({ message: 'El campo isRead debe ser un booleano' })
  isRead?: boolean;
}

export class NotificationResponseDto {
  id!: string;
  message!: string;
  type!: NotificationType;
  createdAt!: Date;
  expiresAt?: Date;
  isRead!: boolean;
  userId!: string;
}

