import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TraineeAccountsTable from '@/components/StudentPlatform/TraineeAccountsTable';
import { TraineeAccount } from '@/lip/features/trainee-platform/traineeAccountsApi';

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'dd/MM/yyyy') return '15/01/2024';
    if (formatStr === 'dd/MM/yyyy HH:mm') return '15/01/2024 10:30';
    return '15/01/2024';
  }),
  ar: {}
}));

// Mock Heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  EyeIcon: () => <div data-testid="eye-icon" />,
  PencilIcon: () => <div data-testid="pencil-icon" />,
  TrashIcon: () => <div data-testid="trash-icon" />,
  ShieldCheckIcon: () => <div data-testid="shield-check-icon" />,
  ShieldExclamationIcon: () => <div data-testid="shield-exclamation-icon" />,
  UserIcon: () => <div data-testid="user-icon" />,
  PhoneIcon: () => <div data-testid="phone-icon" />,
  EnvelopeIcon: () => <div data-testid="envelope-icon" />,
  AcademicCapIcon: () => <div data-testid="academic-cap-icon" />,
  CalendarIcon: () => <div data-testid="calendar-icon" />,
  ClockIcon: () => <div data-testid="clock-icon" />,
  CheckCircleIcon: () => <div data-testid="check-circle-icon" />,
  XCircleIcon: () => <div data-testid="x-circle-icon" />,
  ArrowPathIcon: () => <div data-testid="arrow-path-icon" />,
}));

describe('TraineeAccountsTable', () => {
  const mockAccounts: TraineeAccount[] = [
    {
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
    },
    {
      id: '2',
      nationalId: '98765432109876',
      birthDate: new Date('1995-05-15'),
      password: null,
      isActive: false,
      lastLoginAt: null,
      resetCode: null,
      resetCodeExpiresAt: null,
      resetCodeGeneratedAt: null,
      traineeId: 2,
      createdAt: new Date('2024-01-02T00:00:00Z'),
      updatedAt: new Date('2024-01-02T00:00:00Z'),
      trainee: {
        id: 2,
        nameAr: 'فاطمة أحمد',
        nameEn: 'Fatima Ahmed',
        nationalId: '98765432109876',
        email: 'fatima@example.com',
        phone: '+201234567891',
        photoUrl: 'https://example.com/photo.jpg',
        traineeStatus: 'NEW',
        classLevel: 'SECOND',
        academicYear: '2024',
        program: {
          id: 2,
          nameAr: 'تطوير الويب',
          nameEn: 'Web Development'
        }
      }
    }
  ];

  const defaultProps = {
    accounts: mockAccounts,
    loading: false,
    error: null,
    onAccountSelect: jest.fn(),
    onRefresh: jest.fn()
  };

  it('renders table with accounts data', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('Ahmed Mohamed')).toBeInTheDocument();
    expect(screen.getByText('فاطمة أحمد')).toBeInTheDocument();
    expect(screen.getByText('Fatima Ahmed')).toBeInTheDocument();
  });

  it('displays trainee information correctly', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('12345678901234')).toBeInTheDocument();
    expect(screen.getByText('98765432109876')).toBeInTheDocument();
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
    expect(screen.getByText('تطوير الويب')).toBeInTheDocument();
  });

  it('shows account status badges', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('نشط')).toBeInTheDocument();
    expect(screen.getByText('غير نشط')).toBeInTheDocument();
  });

  it('displays trainee status badges', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('حالي')).toBeInTheDocument();
    expect(screen.getByText('جديد')).toBeInTheDocument();
  });

  it('shows contact information when available', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
    expect(screen.getByText('fatima@example.com')).toBeInTheDocument();
    expect(screen.getByText('+201234567890')).toBeInTheDocument();
    expect(screen.getByText('+201234567891')).toBeInTheDocument();
  });

  it('displays last login information', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('15/01/2024 10:30')).toBeInTheDocument();
    expect(screen.getByText('لم يسجل دخول')).toBeInTheDocument();
  });

  it('shows creation and update dates', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getAllByText('15/01/2024')).toHaveLength(4); // 2 accounts × 2 dates each
  });

  it('renders action buttons for each account', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    const viewButtons = screen.getAllByTestId('eye-icon');
    const editButtons = screen.getAllByTestId('pencil-icon');
    const deleteButtons = screen.getAllByTestId('trash-icon');
    
    expect(viewButtons).toHaveLength(2);
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  it('calls onAccountSelect when view button is clicked', () => {
    const mockOnAccountSelect = jest.fn();
    render(<TraineeAccountsTable {...defaultProps} onAccountSelect={mockOnAccountSelect} />);
    
    const viewButtons = screen.getAllByTestId('eye-icon');
    fireEvent.click(viewButtons[0].parentElement!);
    
    expect(mockOnAccountSelect).toHaveBeenCalledWith('1');
  });

  it('shows loading state', () => {
    render(<TraineeAccountsTable {...defaultProps} loading={true} />);
    
    expect(screen.getByText('جاري تحميل حسابات المتدربين...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const error = { data: { message: 'Network error' } };
    render(<TraineeAccountsTable {...defaultProps} error={error} />);
    
    expect(screen.getByText('حدث خطأ في تحميل البيانات')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('shows empty state when no accounts', () => {
    render(<TraineeAccountsTable {...defaultProps} accounts={[]} />);
    
    expect(screen.getByText('لا توجد حسابات متدربين')).toBeInTheDocument();
  });

  it('calls onRefresh when retry button is clicked in error state', () => {
    const mockOnRefresh = jest.fn();
    const error = { data: { message: 'Network error' } };
    render(<TraineeAccountsTable {...defaultProps} error={error} onRefresh={mockOnRefresh} />);
    
    const retryButton = screen.getByText('إعادة المحاولة');
    fireEvent.click(retryButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('handles hover effects on table rows', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    const firstRow = screen.getByText('أحمد محمد').closest('tr');
    expect(firstRow).toBeInTheDocument();
  });

  it('displays program information correctly', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('تطوير الويب')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('shows class level information', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getByText('المستوى: FIRST')).toBeInTheDocument();
    expect(screen.getByText('المستوى: SECOND')).toBeInTheDocument();
  });

  it('handles accounts without photos', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    const userIcons = screen.getAllByTestId('user-icon');
    expect(userIcons).toHaveLength(2); // One for each account
  });

  it('displays status toggle buttons correctly', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    const shieldIcons = screen.getAllByTestId('shield-check-icon');
    const shieldExclamationIcons = screen.getAllByTestId('shield-exclamation-icon');
    
    expect(shieldIcons).toHaveLength(1); // For inactive account
    expect(shieldExclamationIcons).toHaveLength(1); // For active account
  });

  it('formats dates correctly', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getAllByText('15/01/2024')).toHaveLength(4);
    expect(screen.getByText('15/01/2024 10:30')).toBeInTheDocument();
  });

  it('shows academic year information', () => {
    render(<TraineeAccountsTable {...defaultProps} />);
    
    expect(screen.getAllByText('2024')).toHaveLength(2);
  });

  it('handles missing contact information gracefully', () => {
    const accountsWithoutContact = mockAccounts.map(account => ({
      ...account,
      trainee: {
        ...account.trainee,
        email: null,
        phone: null
      }
    }));
    
    render(<TraineeAccountsTable {...defaultProps} accounts={accountsWithoutContact} />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('فاطمة أحمد')).toBeInTheDocument();
  });
});
