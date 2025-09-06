// Interface Segregation Principle - تقسيم interfaces كبيرة إلى أصغر

export interface INotificationOptions {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  position?: NotificationPosition;
}

export interface INotificationElement {
  id: string;
  element: HTMLElement;
  options: INotificationOptions;
}

export interface INotificationService {
  show(options: INotificationOptions): string;
  hide(id: string): void;
  hideAll(): void;
}

export interface INotificationRenderer {
  createElement(id: string, options: INotificationOptions): HTMLElement;
  getTypeClasses(type: NotificationType): string;
  getIcon(type: NotificationType): string;
}

export interface INotificationPositionManager {
  getPositionClass(position: NotificationPosition): string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
