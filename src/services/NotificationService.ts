// Dependency Inversion Principle - الاعتماد على abstractions وليس implementations
import { 
  INotificationService, 
  INotificationOptions, 
  INotificationElement 
} from '@/types/notification.types';
import { INotificationRenderer } from '@/types/notification.types';

export class NotificationService implements INotificationService {
  private static instance: NotificationService;
  private notifications: Map<string, INotificationElement> = new Map();
  private renderer: INotificationRenderer;

  private constructor(renderer: INotificationRenderer) {
    this.renderer = renderer;
  }

  public static getInstance(renderer: INotificationRenderer): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService(renderer);
    }
    return NotificationService.instance;
  }

  public show(options: INotificationOptions): string {
    const id = this.generateId();
    const element = this.renderer.createElement(id, options);
    
    document.body.appendChild(element);
    this.notifications.set(id, { id, element, options });
    
    // إظهار الإشعار
    setTimeout(() => {
      element.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار تلقائياً
    const duration = options.duration || this.getDefaultDuration(options.type);
    setTimeout(() => {
      this.hide(id);
    }, duration);
    
    return id;
  }

  public hide(id: string): void {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.element.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.element.parentNode) {
          notification.element.parentNode.removeChild(notification.element);
        }
        this.notifications.delete(id);
      }, 300);
    }
  }

  public hideAll(): void {
    this.notifications.forEach((_, id) => {
      this.hide(id);
    });
  }

  private getDefaultDuration(type: string): number {
    const durationMap = {
      success: 4000,
      error: 5000,
      info: 3000,
      warning: 4000
    };
    return durationMap[type as keyof typeof durationMap] || 3000;
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
