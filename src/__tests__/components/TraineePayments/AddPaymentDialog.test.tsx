import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddPaymentDialog from '@/components/TraineePayments/AddPaymentDialog';
import { TraineePaymentResponse } from '@/types/payment';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid="close-icon" />,
  CreditCard: () => <div data-testid="credit-card-icon" />,
  DollarSign: () => <div data-testid="dollar-sign-icon" />,
  Building2: () => <div data-testid="building-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Save: () => <div data-testid="save-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn({
        amount: 1000,
        treasury: '1',
        notes: 'Test notes'
      });
    },
    formState: { errors: {} },
    reset: jest.fn(),
    watch: jest.fn((field: string) => {
      if (field === 'treasury') return '1';
      return '';
    }),
    setValue: jest.fn(),
  }),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock API
jest.mock('@/lip/features/traineePayments/traineePaymentsApi', () => ({
  useAddTraineePaymentMutation: () => [
    jest.fn().mockResolvedValue({
      unwrap: () => Promise.resolve({ id: 1 })
    }),
    { isLoading: false }
  ],
}));

const mockPayment: TraineePaymentResponse = {
  id: 1,
  amount: 5000,
  status: 'PARTIALLY_PAID',
  paidAmount: 3000,
  paidAt: '2024-01-15T10:30:00Z',
  notes: 'دفعة جزئية للرسوم',
  fee: {
    id: 1,
    name: 'رسوم التسجيل',
    amount: 5000,
    type: 'REGISTRATION_FEE'
  },
  trainee: {
    id: 1,
    name: 'أحمد محمد علي'
  },
  safe: {
    id: '1',
    name: 'الخزينة الرئيسية'
  },
  transactions: [
    {
      id: 'TXN-001',
      amount: 3000,
      type: 'PAYMENT',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ]
};

describe('AddPaymentDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnPaymentAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog when open', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('إضافة دفعة جديدة')).toBeInTheDocument();
    expect(screen.getByText('إضافة دفعة للمتدرب: أحمد محمد علي')).toBeInTheDocument();
  });

  it('should not render dialog when closed', () => {
    render(
      <AddPaymentDialog
        isOpen={false}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.queryByText('إضافة دفعة جديدة')).not.toBeInTheDocument();
  });

  it('should display trainee information correctly', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('أحمد محمد علي')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
  });

  it('should display remaining amount correctly', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    // Remaining amount should be 5000 - 3000 = 2000
    expect(screen.getByText('2,000.00 ر.س')).toBeInTheDocument();
  });

  it('should render form fields', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('المبلغ المراد دفعه *')).toBeInTheDocument();
    expect(screen.getByText('الخزينة المستلمة للدفع *')).toBeInTheDocument();
    expect(screen.getByText('ملاحظات (اختياري)')).toBeInTheDocument();
  });

  it('should render treasury options', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('الخزينة الرئيسية')).toBeInTheDocument();
    expect(screen.getByText('خزينة الرسوم')).toBeInTheDocument();
    expect(screen.getByText('خزينة الطوارئ')).toBeInTheDocument();
    expect(screen.getByText('خزينة الشهادات')).toBeInTheDocument();
  });

  it('should display treasury balances', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('الرصيد: 50,000.00 ر.س')).toBeInTheDocument();
    expect(screen.getByText('الرصيد: 25,000.00 ر.س')).toBeInTheDocument();
    expect(screen.getByText('الرصيد: 15,000.00 ر.س')).toBeInTheDocument();
    expect(screen.getByText('الرصيد: 8,000.00 ر.س')).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('إلغاء')).toBeInTheDocument();
    expect(screen.getByText('حفظ الدفعة')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    const closeButton = screen.getByTestId('close-icon').parentElement;
    fireEvent.click(closeButton!);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    const cancelButton = screen.getByText('إلغاء');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should render icons correctly', () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByTestId('credit-card-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dollar-sign-icon')).toBeInTheDocument();
    expect(screen.getByTestId('building-icon')).toBeInTheDocument();
    expect(screen.getByTestId('file-text-icon')).toBeInTheDocument();
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    const submitButton = screen.getByText('حفظ الدفعة');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnPaymentAdded).toHaveBeenCalled();
    });
  });

  it('should show loading state when submitting', () => {
    // Mock loading state
    jest.doMock('@/lip/features/traineePayments/traineePaymentsApi', () => ({
      useAddTraineePaymentMutation: () => [
        jest.fn(),
        { isLoading: true }
      ],
    }));

    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  it('should disable form when loading', () => {
    // Mock loading state
    jest.doMock('@/lip/features/traineePayments/traineePaymentsApi', () => ({
      useAddTraineePaymentMutation: () => [
        jest.fn(),
        { isLoading: true }
      ],
    }));

    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={mockPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    const submitButton = screen.getByText('حفظ الدفعة');
    expect(submitButton).toBeDisabled();
  });

  it('should show correct remaining amount for different payment statuses', () => {
    const fullyPaidPayment: TraineePaymentResponse = {
      ...mockPayment,
      status: 'PAID',
      paidAmount: 5000,
    };

    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={fullyPaidPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('0.00 ر.س')).toBeInTheDocument();
  });

  it('should show correct remaining amount for unpaid payment', () => {
    const unpaidPayment: TraineePaymentResponse = {
      ...mockPayment,
      status: 'PENDING',
      paidAmount: 0,
    };

    render(
      <AddPaymentDialog
        isOpen={true}
        onClose={mockOnClose}
        payment={unpaidPayment}
        onPaymentAdded={mockOnPaymentAdded}
      />
    );

    expect(screen.getByText('5,000.00 ر.س')).toBeInTheDocument();
  });
});
