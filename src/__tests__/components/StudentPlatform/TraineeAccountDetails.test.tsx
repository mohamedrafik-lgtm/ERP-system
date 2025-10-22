import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TraineeAccountDetails from '@/components/StudentPlatform/TraineeAccountDetails';
import { useGetTraineeAccountByIdQuery, useUpdateTraineeAccountStatusMutation, useResetTraineeAccountPasswordMutation, useDeleteTraineeAccountMutation } from '@/lip/features/trainee-platform/traineeAccountsApi';
import toast from 'react-hot-toast';

// Mock the API hooks
jest.mock('@/lip/features/trainee-platform/traineeAccountsApi', () => ({
  useGetTraineeAccountByIdQuery: jest.fn(),
  useUpdateTraineeAccountStatusMutation: jest.fn(),
  useResetTraineeAccountPasswordMutation: jest.fn(),
  useDeleteTraineeAccountMutation: jest.fn(),
}));

// Mock Headless UI
jest.mock('@headlessui/react', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Dialog: ({ children, open, onClose }: any) => 
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogPanel: ({ children }: any) => <div data-testid="dialog-panel">{children}</div>,
  DialogTitle: ({ children }: any) => <h3>{children}</h3>
}));

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'dd/MM/yyyy') return '15/01/2024';
    if (formatStr === 'dd/MM/yyyy HH:mm') return '15/01/2024 10:30';
    return '15/01/2024';
  }),
  ar: {}
}));

// Mock toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}));

// Mock Heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  XMarkIcon: () => <div data-testid="x-mark-icon" />,
  UserIcon: () => <div data-testid="user-icon" />,
  AcademicCapIcon: () => <div data-testid="academic-cap-icon" />,
  ShieldCheckIcon: () => <div data-testid="shield-check-icon" />,
  ShieldExclamationIcon: () => <div data-testid="shield-exclamation-icon" />,
  PhoneIcon: () => <div data-testid="phone-icon" />,
  EnvelopeIcon: () => <div data-testid="envelope-icon" />,
  CalendarIcon: () => <div data-testid="calendar-icon" />,
  ClockIcon: () => <div data-testid="clock-icon" />,
  KeyIcon: () => <div data-testid="key-icon" />,
  ArrowPathIcon: () => <div data-testid="arrow-path-icon" />,
  TrashIcon: () => <div data-testid="trash-icon" />,
  PencilIcon: () => <div data-testid="pencil-icon" />,
  EyeIcon: () => <div data-testid="eye-icon" />,
  EyeSlashIcon: () => <div data-testid="eye-slash-icon" />,
}));

describe('TraineeAccountDetails', () => {
  const mockAccount = {
    id: '1',
    nationalId: '12345678901234',
    birthDate: new Date('1990-01-01'),
    password: null,
    isActive: true,
    lastLoginAt: new Date('2024-01-15T10:30:00Z'),
    resetCode: null,
    resetCodeExpiresAt: null,
    resetCodeGeneratedAt: null,
    traineeId: 1,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    trainee: {
      id: 1,
      nameAr: 'أحمد محمد',
      nameEn: 'Ahmed Mohamed',
      nationalId: '12345678901234',
      email: 'ahmed@example.com',
      phone: '+201234567890',
      photoUrl: null,
      traineeStatus: 'CURRENT',
      classLevel: 'FIRST',
      academicYear: '2024',
      program: {
        id: 1,
        nameAr: 'الذكاء الاصطناعي',
        nameEn: 'Artificial Intelligence'
      }
    }
  };

  const defaultProps = {
    accountId: '1',
    isOpen: true,
    onClose: jest.fn(),
    onRefresh: jest.fn()
  };

  const mockUseGetTraineeAccountByIdQuery = useGetTraineeAccountByIdQuery as jest.Mock;
  const mockUseUpdateTraineeAccountStatusMutation = useUpdateTraineeAccountStatusMutation as jest.Mock;
  const mockUseResetTraineeAccountPasswordMutation = useResetTraineeAccountPasswordMutation as jest.Mock;
  const mockUseDeleteTraineeAccountMutation = useDeleteTraineeAccountMutation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: mockAccount,
      isLoading: false,
      error: null
    });

    mockUseUpdateTraineeAccountStatusMutation.mockReturnValue([
      jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() }),
      { isLoading: false }
    ]);

    mockUseResetTraineeAccountPasswordMutation.mockReturnValue([
      jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() }),
      { isLoading: false }
    ]);

    mockUseDeleteTraineeAccountMutation.mockReturnValue([
      jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() }),
      { isLoading: false }
    ]);
  });

  it('renders account details when data is loaded', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('تفاصيل حساب المتدرب')).toBeInTheDocument();
    expect(screen.getByText('أحمد محمد - Ahmed Mohamed')).toBeInTheDocument();
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('Ahmed Mohamed')).toBeInTheDocument();
  });

  it('displays trainee information correctly', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('معلومات المتدرب')).toBeInTheDocument();
    expect(screen.getByText('12345678901234')).toBeInTheDocument();
    expect(screen.getByText('حالي')).toBeInTheDocument();
    expect(screen.getByText('FIRST')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('displays program information correctly', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('معلومات البرنامج')).toBeInTheDocument();
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
  });

  it('displays account details correctly', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('تفاصيل الحساب')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Account ID
    expect(screen.getByText('نشط')).toBeInTheDocument();
    expect(screen.getByText('15/01/2024 10:30')).toBeInTheDocument(); // Last login
  });

  it('displays contact information when available', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('معلومات الاتصال')).toBeInTheDocument();
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
    expect(screen.getByText('+201234567890')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('جاري تحميل تفاصيل الحساب...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Network error' }
    });

    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('حدث خطأ أثناء تحميل تفاصيل الحساب')).toBeInTheDocument();
  });

  it('handles status toggle for active account', async () => {
    const mockUpdateStatus = jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() });
    mockUseUpdateTraineeAccountStatusMutation.mockReturnValue([
      mockUpdateStatus,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    const statusButton = screen.getByText('إلغاء التفعيل');
    fireEvent.click(statusButton);
    
    await waitFor(() => {
      expect(mockUpdateStatus).toHaveBeenCalledWith({
        id: '1',
        isActive: false
      });
    });
  });

  it('handles status toggle for inactive account', async () => {
    const inactiveAccount = { ...mockAccount, isActive: false };
    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: inactiveAccount,
      isLoading: false,
      error: null
    });

    const mockUpdateStatus = jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() });
    mockUseUpdateTraineeAccountStatusMutation.mockReturnValue([
      mockUpdateStatus,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    const statusButton = screen.getByText('تفعيل الحساب');
    fireEvent.click(statusButton);
    
    await waitFor(() => {
      expect(mockUpdateStatus).toHaveBeenCalledWith({
        id: '1',
        isActive: true
      });
    });
  });

  it('handles password reset', async () => {
    const mockResetPassword = jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() });
    mockUseResetTraineeAccountPasswordMutation.mockReturnValue([
      mockResetPassword,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    const resetButton = screen.getByText('إعادة تعيين كلمة المرور');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('1');
    });
  });

  it('shows delete confirmation modal', () => {
    render(<TraineeAccountDetails {...defaultProps} />);
    
    const deleteButton = screen.getByText('حذف الحساب');
    fireEvent.click(deleteButton);
    
    expect(screen.getByText('تأكيد الحذف')).toBeInTheDocument();
    expect(screen.getByText('هذا الإجراء لا يمكن التراجع عنه')).toBeInTheDocument();
  });

  it('handles account deletion', async () => {
    const mockDeleteAccount = jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() });
    mockUseDeleteTraineeAccountMutation.mockReturnValue([
      mockDeleteAccount,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    // Open delete confirmation
    const deleteButton = screen.getByText('حذف الحساب');
    fireEvent.click(deleteButton);
    
    // Confirm deletion
    const confirmButton = screen.getByText('حذف الحساب');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(mockDeleteAccount).toHaveBeenCalledWith('1');
    });
  });

  it('displays reset code information when available', () => {
    const accountWithResetCode = {
      ...mockAccount,
      resetCode: 'ABC123',
      resetCodeExpiresAt: new Date('2024-01-16T10:30:00Z'),
      resetCodeGeneratedAt: new Date('2024-01-15T10:30:00Z')
    };

    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: accountWithResetCode,
      isLoading: false,
      error: null
    });

    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('معلومات الأمان')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('handles loading states for mutations', () => {
    mockUseUpdateTraineeAccountStatusMutation.mockReturnValue([
      jest.fn(),
      { isLoading: true }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('جاري التحديث...')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<TraineeAccountDetails {...defaultProps} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('إغلاق');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles accounts without contact information', () => {
    const accountWithoutContact = {
      ...mockAccount,
      trainee: {
        ...mockAccount.trainee,
        email: null,
        phone: null
      }
    };

    mockUseGetTraineeAccountByIdQuery.mockReturnValue({
      data: accountWithoutContact,
      isLoading: false,
      error: null
    });

    render(<TraineeAccountDetails {...defaultProps} />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.queryByText('ahmed@example.com')).not.toBeInTheDocument();
  });

  it('displays different trainee statuses correctly', () => {
    const statuses = ['NEW', 'CURRENT', 'GRADUATE', 'WITHDRAWN'];
    
    statuses.forEach(status => {
      const accountWithStatus = {
        ...mockAccount,
        trainee: {
          ...mockAccount.trainee,
          traineeStatus: status
        }
      };

      mockUseGetTraineeAccountByIdQuery.mockReturnValue({
        data: accountWithStatus,
        isLoading: false,
        error: null
      });

      const { unmount } = render(<TraineeAccountDetails {...defaultProps} />);
      
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      unmount();
    });
  });

  it('handles error in status update', async () => {
    const mockUpdateStatus = jest.fn().mockRejectedValue(new Error('Update failed'));
    mockUseUpdateTraineeAccountStatusMutation.mockReturnValue([
      mockUpdateStatus,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    const statusButton = screen.getByText('إلغاء التفعيل');
    fireEvent.click(statusButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('حدث خطأ أثناء تحديث حالة الحساب');
    });
  });

  it('handles error in password reset', async () => {
    const mockResetPassword = jest.fn().mockRejectedValue(new Error('Reset failed'));
    mockUseResetTraineeAccountPasswordMutation.mockReturnValue([
      mockResetPassword,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    const resetButton = screen.getByText('إعادة تعيين كلمة المرور');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('حدث خطأ أثناء إعادة تعيين كلمة المرور');
    });
  });

  it('handles error in account deletion', async () => {
    const mockDeleteAccount = jest.fn().mockRejectedValue(new Error('Delete failed'));
    mockUseDeleteTraineeAccountMutation.mockReturnValue([
      mockDeleteAccount,
      { isLoading: false }
    ]);

    render(<TraineeAccountDetails {...defaultProps} />);
    
    // Open delete confirmation
    const deleteButton = screen.getByText('حذف الحساب');
    fireEvent.click(deleteButton);
    
    // Confirm deletion
    const confirmButton = screen.getByText('حذف الحساب');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('حدث خطأ أثناء حذف الحساب');
    });
  });
});
