export enum NotificationType {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    INFO = 'INFO',
    ERROR = 'ERROR'
  }
export type NotificationTemplateParams = {
    firstName?: string;
    projectName?: string;
    skillName?: string;
    certificateName?: string;
  };
  
export type ExpirationTime = {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
  };  