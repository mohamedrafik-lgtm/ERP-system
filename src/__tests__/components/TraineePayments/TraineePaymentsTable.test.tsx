import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TraineePaymentsTable from '@/components/TraineePayments/TraineePaymentsTable';
import { TraineePaymentResponse } from '@/types/payment';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  CreditCard: () => <div data-testid="credit-card-icon" />,
}));

// Mock utility functions
jest.mock('@/utils/traineePaymentUtils', () => ({
  formatCurrency: (amount: number) => `${amount.toLocaleString('ar-SA')} ر.س`,
  getRemainingAmount: (payment: TraineePaymentResponse) => payment.amount - payment.paidAmount,
  formatDate: (dateString?: string) => {
    if (!dateString) return 'لم يتم الدفع';
    return new Date(dateString).toLocaleDateString('ar-SA');
  },
}));

const mockPayments: TraineePaymentResponse[] = [
  {
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
  },
  {
    id: 2,
    amount: 8000,
    status: 'PAID',
    paidAmount: 8000,
    paidAt: '2024-01-20T14:15:00Z',
    notes: 'دفعة كاملة للبرنامج التدريبي',
    fee: {
      id: 2,
      name: 'رسوم البرنامج التدريبي',
      amount: 8000,
      type: 'TRAINING_FEE'
    },
    trainee: {
      id: 2,
      name: 'فاطمة أحمد حسن'
    },
    safe: {
      id: '2',
      name: 'خزينة الرسوم'
    },
    transactions: [
      {
        id: 'TXN-002',
        amount: 8000,
        type: 'PAYMENT',
        createdAt: '2024-01-20T14:15:00Z'
      }
    ]
  },
  {
    id: 3,
    amount: 2000,
    status: 'PENDING',
    paidAmount: 0,
    notes: 'رسوم الشهادة - لم يتم الدفع بعد',
    fee: {
      id: 3,
      name: 'رسوم الشهادة',
      amount: 2000,
      type: 'CERTIFICATE_FEE'
    },
    trainee: {
      id: 3,
      name: 'محمد سعد الدين'
    },
    safe: {
      id: '3',
      name: 'خزينة الطوارئ'
    },
    transactions: []
  }
];

describe('TraineePaymentsTable', () => {
  const mockOnAddPayment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render table headers correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByText('الإجراءات')).toBeInTheDocument();
    expect(screen.getByText('المتدرب')).toBeInTheDocument();
    expect(screen.getByText('الرسوم')).toBeInTheDocument();
    expect(screen.getByText('المبلغ المطلوب')).toBeInTheDocument();
    expect(screen.getByText('المبلغ المدفوع')).toBeInTheDocument();
    expect(screen.getByText('المبلغ المتبقي')).toBeInTheDocument();
    expect(screen.getByText('الحالة')).toBeInTheDocument();
    expect(screen.getByText('تاريخ الدفع')).toBeInTheDocument();
  });

  it('should render payment data correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    // Check trainee names
    expect(screen.getByText('أحمد محمد علي')).toBeInTheDocument();
    expect(screen.getByText('فاطمة أحمد حسن')).toBeInTheDocument();
    expect(screen.getByText('محمد سعد الدين')).toBeInTheDocument();

    // Check trainee IDs
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(screen.getByText('ID: 3')).toBeInTheDocument();

    // Check fee names
    expect(screen.getByText('رسوم التسجيل')).toBeInTheDocument();
    expect(screen.getByText('رسوم البرنامج التدريبي')).toBeInTheDocument();
    expect(screen.getByText('رسوم الشهادة')).toBeInTheDocument();
  });

  it('should render payment buttons for unpaid/partial payments', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    // Should have 2 payment buttons (for PARTIALLY_PAID and PENDING)
    const paymentButtons = screen.getAllByText('دفع');
    expect(paymentButtons).toHaveLength(2);
  });

  it('should show "مدفوع بالكامل" for fully paid payments', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByText('مدفوع بالكامل')).toBeInTheDocument();
  });

  it('should call onAddPayment when payment button is clicked', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    const paymentButtons = screen.getAllByText('دفع');
    fireEvent.click(paymentButtons[0]);

    expect(mockOnAddPayment).toHaveBeenCalledWith(mockPayments[0]);
  });

  it('should render status badges correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByText('مدفوع جزئياً')).toBeInTheDocument();
    expect(screen.getByText('مدفوع بالكامل')).toBeInTheDocument();
    expect(screen.getByText('غير مدفوع')).toBeInTheDocument();
  });

  it('should render notes when available', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByText('دفعة جزئية للرسوم')).toBeInTheDocument();
    expect(screen.getByText('دفعة كاملة للبرنامج التدريبي')).toBeInTheDocument();
    expect(screen.getByText('رسوم الشهادة - لم يتم الدفع بعد')).toBeInTheDocument();
  });

  it('should render empty state when no payments', () => {
    render(
      <TraineePaymentsTable
        payments={[]}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByText('لا توجد مدفوعات')).toBeInTheDocument();
    expect(screen.getByText('لم يتم العثور على أي مدفوعات تطابق معايير البحث')).toBeInTheDocument();
    expect(screen.getByText('إضافة دفعة جديدة')).toBeInTheDocument();
  });

  it('should render user icons for each trainee', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    const userIcons = screen.getAllByTestId('user-icon');
    expect(userIcons).toHaveLength(3);
  });

  it('should render plus icons in payment buttons', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    const plusIcons = screen.getAllByTestId('plus-icon');
    expect(plusIcons).toHaveLength(2); // Only for unpaid/partial payments
  });

  it('should render credit card icon in empty state', () => {
    render(
      <TraineePaymentsTable
        payments={[]}
        onAddPayment={mockOnAddPayment}
      />
    );

    expect(screen.getByTestId('credit-card-icon')).toBeInTheDocument();
  });

  it('should format currency correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    // Check if formatted currency appears
    expect(screen.getByText('5,000 ر.س')).toBeInTheDocument();
    expect(screen.getByText('8,000 ر.س')).toBeInTheDocument();
    expect(screen.getByText('2,000 ر.س')).toBeInTheDocument();
  });

  it('should calculate remaining amounts correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    // Check remaining amounts
    expect(screen.getByText('2,000 ر.س')).toBeInTheDocument(); // 5000 - 3000
    expect(screen.getByText('0 ر.س')).toBeInTheDocument(); // 8000 - 8000
    expect(screen.getByText('2,000 ر.س')).toBeInTheDocument(); // 2000 - 0
  });

  it('should format dates correctly', () => {
    render(
      <TraineePaymentsTable
        payments={mockPayments}
        onAddPayment={mockOnAddPayment}
      />
    );

    // Check if dates are formatted (mocked to return formatted date)
    expect(screen.getByText('15/1/2024')).toBeInTheDocument();
    expect(screen.getByText('20/1/2024')).toBeInTheDocument();
    expect(screen.getByText('لم يتم الدفع')).toBeInTheDocument();
  });
});
