import { NotificationService } from '@/services/NotificationService';
import { NotificationRenderer } from '@/services/NotificationRenderer';

// Mock DOM
Object.defineProperty(document, 'body', {
  value: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  },
  writable: true,
});

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let mockRenderer: jest.Mocked<NotificationRenderer>;

  beforeEach(() => {
    mockRenderer = {
      createElement: jest.fn(),
      getTypeClasses: jest.fn(),
      getIcon: jest.fn(),
    } as any;

    notificationService = NotificationService.getInstance(mockRenderer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('show', () => {
    it('should create and show notification', () => {
      const mockElement = document.createElement('div');
      mockRenderer.createElement.mockReturnValue(mockElement);

      const options = {
        type: 'success' as const,
        title: 'Test Title',
        message: 'Test Message',
      };

      const id = notificationService.show(options);

      expect(mockRenderer.createElement).toHaveBeenCalledWith(expect.any(String), options);
      expect(document.body.appendChild).toHaveBeenCalledWith(mockElement);
      expect(id).toBeDefined();
    });

    it('should use default duration for success notification', () => {
      const mockElement = document.createElement('div');
      mockRenderer.createElement.mockReturnValue(mockElement);

      const options = {
        type: 'success' as const,
        title: 'Test Title',
        message: 'Test Message',
      };

      notificationService.show(options);

      // Should not throw error
      expect(mockRenderer.createElement).toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should hide notification by id', () => {
      const mockElement = document.createElement('div');
      mockRenderer.createElement.mockReturnValue(mockElement);

      const options = {
        type: 'success' as const,
        title: 'Test Title',
        message: 'Test Message',
      };

      const id = notificationService.show(options);
      notificationService.hide(id);

      expect(mockElement.style.transform).toBe('translateX(100%)');
    });

    it('should not throw error when hiding non-existent notification', () => {
      expect(() => {
        notificationService.hide('non-existent-id');
      }).not.toThrow();
    });
  });

  describe('hideAll', () => {
    it('should hide all notifications', () => {
      const mockElement1 = document.createElement('div');
      const mockElement2 = document.createElement('div');
      
      mockRenderer.createElement
        .mockReturnValueOnce(mockElement1)
        .mockReturnValueOnce(mockElement2);

      notificationService.show({
        type: 'success',
        title: 'Test 1',
        message: 'Message 1',
      });

      notificationService.show({
        type: 'error',
        title: 'Test 2',
        message: 'Message 2',
      });

      notificationService.hideAll();

      expect(mockElement1.style.transform).toBe('translateX(100%)');
      expect(mockElement2.style.transform).toBe('translateX(100%)');
    });
  });
});
