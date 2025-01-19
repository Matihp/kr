import { ExpirationTime, NotificationTemplateParams, NotificationType } from "../types/notificationTypes";

const calculateExpirationDate = (expiration?: ExpirationTime): Date | undefined => {
    if (!expiration) return undefined;
  
    const now = new Date();
    const { value, unit } = expiration;
  
    switch (unit) {
      case 'minutes':
        return new Date(now.getTime() + value * 60000);
      case 'hours':
        return new Date(now.getTime() + value * 3600000);
      case 'days':
        return new Date(now.getTime() + value * 86400000);
      case 'weeks':
        return new Date(now.getTime() + value * 604800000);
    }
  };
  
  export const NotificationTemplates = {
    // Notificaciones de autenticación
    WELCOME: (params: Pick<NotificationTemplateParams, 'firstName'>) => ({
      message: `¡Bienvenido/a ${params.firstName}! Gracias por registrarte en nuestra plataforma.`,
      type: NotificationType.SUCCESS,
      expiration: { value: 7, unit: 'days' as const }
    }),
  
    PASSWORD_CHANGED: () => ({
      message: 'Tu contraseña ha sido actualizada exitosamente.',
      type: NotificationType.SUCCESS,
      expiration: { value: 1, unit: 'days' as const }
    }),
  
    PROFILE_UPDATED: () => ({
      message: 'Tu perfil ha sido actualizado exitosamente.',
      type: NotificationType.SUCCESS,
      expiration: { value: 1, unit: 'days' as const }
    }),
  
    PROJECT_CREATED: (params: Pick<NotificationTemplateParams, 'projectName'>) => ({
      message: `Tu proyecto "${params.projectName}" ha sido creado exitosamente.`,
      type: NotificationType.SUCCESS,
      expiration: { value: 3, unit: 'days' as const }
    }),
  
    MAINTENANCE_ALERT: () => ({
      message: 'El sistema entrará en mantenimiento en los próximos minutos.',
      type: NotificationType.WARNING,
      expiration: { value: 30, unit: 'minutes' as const }
    }),
  
    ERROR_ALERT: () => ({
      message: 'Ha ocurrido un error en el sistema. Por favor, inténtalo más tarde.',
      type: NotificationType.ERROR,
      expiration: { value: 12, unit: 'hours' as const }
    })
  };
  
  export const createNotificationFromTemplate = async (
    notificationRepository: any,
    user: any,
    template: (params: any) => { 
      message: string;
      type: NotificationType;
      expiration?: ExpirationTime;
    },
    params: NotificationTemplateParams = {}
  ) => {
    const { message, type, expiration } = template(params);
    
    const notification = notificationRepository.create({
      user,
      message,
      type,
      expiresAt: calculateExpirationDate(expiration),
      isRead: false,
      createdAt: new Date()
    });
  
    return await notificationRepository.save(notification);
  };