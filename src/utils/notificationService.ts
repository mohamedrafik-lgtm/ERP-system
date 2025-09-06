export interface NotificationOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<string, HTMLElement> = new Map();

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public show(options: NotificationOptions): string {
    const id = this.generateId();
    const notification = this.createNotificationElement(id, options);
    
    document.body.appendChild(notification);
    this.notifications.set(id, notification);
    
    // إظهار الإشعار
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
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
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
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

  private createNotificationElement(id: string, options: NotificationOptions): HTMLElement {
    const notification = document.createElement('div');
    const position = this.getPositionClass(options.position || 'top-right');
    
    notification.id = id;
    notification.className = `fixed ${position} z-[9999] ${this.getTypeClasses(options.type)} px-6 py-4 rounded-2xl shadow-2xl transform translate-x-full transition-transform duration-300`;
    
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 ${this.getIconBgClass(options.type)} rounded-full flex items-center justify-center">
          ${this.getIcon(options.type)}
        </div>
        <div>
          <h4 class="font-bold text-lg">${options.title}</h4>
          <p class="${this.getTextColorClass(options.type)} text-sm">${options.message}</p>
        </div>
      </div>
    `;
    
    return notification;
  }

  private getTypeClasses(type: string): string {
    const typeMap = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      warning: 'bg-yellow-500 text-white'
    };
    return typeMap[type as keyof typeof typeMap] || typeMap.info;
  }

  private getIconBgClass(type: string): string {
    const bgMap = {
      success: 'bg-green-400',
      error: 'bg-red-400',
      info: 'bg-blue-400',
      warning: 'bg-yellow-400'
    };
    return bgMap[type as keyof typeof bgMap] || bgMap.info;
  }

  private getTextColorClass(type: string): string {
    const textMap = {
      success: 'text-green-100',
      error: 'text-red-100',
      info: 'text-blue-100',
      warning: 'text-yellow-100'
    };
    return textMap[type as keyof typeof textMap] || textMap.info;
  }

  private getPositionClass(position: string): string {
    const positionMap = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4'
    };
    return positionMap[position as keyof typeof positionMap] || positionMap['top-right'];
  }

  private getIcon(type: string): string {
    const icons = {
      success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>`,
      error: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>`,
      info: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>`,
      warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>`
    };
    return icons[type as keyof typeof icons] || icons.info;
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

// Export singleton instance
export const notificationService = NotificationService.getInstance();
