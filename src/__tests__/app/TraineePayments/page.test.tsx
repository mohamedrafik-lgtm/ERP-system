import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TraineePayments from '@/app/TraineePayments/page';

// Mock the usePayments hook
jest.mock('@/hooks/usePayments', () => ({
  usePayments: () => ({
    payments: [],
    stats: {
      total: 0,
      paid: 0,
      remaining: 0,
      totalCount: 0
    },
    filters: {
      searchTerm: '',
      statusFilter: 'all',
      sortBy: 'date'
    },
    isAddPaymentDialogOpen: false,
    selectedPayment: null,
    isLoading: false,
    error: null,
    handleFilterChange: jest.fn(),
    handleAddPayment: jest.fn(),
    handleCloseDialog: jest.fn(),
    handlePaymentAdded: jest.fn(),
    handleExportReport: jest.fn(),
    handleAddPaymentFromHeader: jest.fn()
  })
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  CreditCard: () => <div data-testid="credit-card-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  ArrowDownWideNarrow: () => <div data-testid="sort-icon" />,
  User: () => <div data-testid="user-icon" />,
}));

// Mock components
jest.mock('@/components/TraineePayments/PaymentHeader', () => {
  return function MockPaymentHeader({ onAddPayment, onExportReport }: any) {
    return (
      <div data-testid="payment-header">
        <button onClick={onAddPayment} data-testid="header-add-payment">
          إضافة دفعة
        </button>
        <button onClick={onExportReport} data-testid="header-export-report">
          تصدير التقرير
        </button>
      </div>
    );
  };
});

jest.mock('@/components/TraineePayments/PaymentStats', () => {
  return function MockPaymentStats({ stats }: any) {
    return (
      <div data-testid="payment-stats">
        <div>Total: {stats.total}</div>
        <div>Paid: {stats.paid}</div>
        <div>Remaining: {stats.remaining}</div>
      </div>
    );
  };
});

jest.mock('@/components/TraineePayments/PaymentFilters', () => {
  return function MockPaymentFilters({ 
    searchTerm, 
    statusFilter, 
    sortBy, 
    onSearchChange, 
    onStatusFilterChange, 
    onSortChange 
  }: any) {
    return (
      <div data-testid="payment-filters">
        <input
          data-testid="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="البحث..."
        />
        <select
          data-testid="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          <option value="paid">مدفوع</option>
          <option value="partial">جزئي</option>
          <option value="unpaid">غير مدفوع</option>
        </select>
        <select
          data-testid="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="date">التاريخ</option>
          <option value="amount">المبلغ</option>
          <option value="trainee">المتدرب</option>
        </select>
      </div>
    );
  };
});

jest.mock('@/components/TraineePayments/TraineePaymentsTable', () => {
  return function MockTraineePaymentsTable({ payments, onAddPayment }: any) {
    return (
      <div data-testid="payments-table">
        {payments.map((payment: any) => (
          <div key={payment.id} data-testid={`payment-row-${payment.id}`}>
            <span>{payment.trainee.name}</span>
            <button 
              onClick={() => onAddPayment(payment)}
              data-testid={`add-payment-btn-${payment.id}`}
            >
              إضافة دفعة
            </button>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/TraineePayments/AddPaymentDialog', () => {
  return function MockAddPaymentDialog({ isOpen, onClose, payment, onPaymentAdded }: any) {
    if (!isOpen) return null;
    
    return (
      <div data-testid="add-payment-dialog">
        <div>Dialog for: {payment?.trainee.name}</div>
        <button onClick={onClose} data-testid="close-dialog">إغلاق</button>
        <button onClick={onPaymentAdded} data-testid="payment-added">تم الدفع</button>
      </div>
    );
  };
});

// Mock the usePayments hook
jest.mock('@/hooks/usePayments', () => ({
  usePayments: jest.fn(),
}));

const mockUsePayments = require('@/hooks/usePayments').usePayments;

const mockPayments = [
  {
    id: 1,
    amount: 5000,
    status: 'PARTIALLY_PAID',
    paidAmount: 3000,
    trainee: { id: 1, name: 'أحمد محمد علي' },
    fee: { id: 1, name: 'رسوم التسجيل', amount: 5000, type: 'REGISTRATION_FEE' },
    safe: { id: '1', name: 'الخزينة الرئيسية' },
    transactions: []
  },
  {
    id: 2,
    amount: 8000,
    status: 'PAID',
    paidAmount: 8000,
    trainee: { id: 2, name: 'فاطمة أحمد حسن' },
    fee: { id: 2, name: 'رسوم البرنامج التدريبي', amount: 8000, type: 'TRAINING_FEE' },
    safe: { id: '2', name: 'خزينة الرسوم' },
    transactions: []
  }
];

const mockStats = {
  total: 13000,
  paid: 11000,
  remaining: 2000,
  totalCount: 2,
  paidCount: 1,
  partialCount: 1,
  unpaidCount: 0
};

const mockFilters = {
  searchTerm: '',
  statusFilter: 'all',
  sortBy: 'date'
};

describe('TraineePayments Page', () => {
  const mockHandleFilterChange = jest.fn();
  const mockHandleAddPayment = jest.fn();
  const mockHandleCloseDialog = jest.fn();
  const mockHandlePaymentAdded = jest.fn();
  const mockHandleExportReport = jest.fn();
  const mockHandleAddPaymentFromHeader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUsePayments.mockReturnValue({
      payments: mockPayments,
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: false,
      selectedPayment: null,
      isLoading: false,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });
  });

  it('should render page components correctly', () => {
    render(<TraineePayments />);

    expect(screen.getByTestId('payment-header')).toBeInTheDocument();
    expect(screen.getByTestId('payment-stats')).toBeInTheDocument();
    expect(screen.getByTestId('payment-filters')).toBeInTheDocument();
    expect(screen.getByTestId('payments-table')).toBeInTheDocument();
  });

  it('should display payment stats correctly', () => {
    render(<TraineePayments />);

    expect(screen.getByText('Total: 13000')).toBeInTheDocument();
    expect(screen.getByText('Paid: 11000')).toBeInTheDocument();
    expect(screen.getByText('Remaining: 2000')).toBeInTheDocument();
  });

  it('should render payment data in table', () => {
    render(<TraineePayments />);

    expect(screen.getByText('أحمد محمد علي')).toBeInTheDocument();
    expect(screen.getByText('فاطمة أحمد حسن')).toBeInTheDocument();
    expect(screen.getByTestId('payment-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('payment-row-2')).toBeInTheDocument();
  });

  it('should handle filter changes', () => {
    render(<TraineePayments />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'أحمد' } });

    expect(mockHandleFilterChange).toHaveBeenCalledWith('searchTerm', 'أحمد');
  });

  it('should handle status filter changes', () => {
    render(<TraineePayments />);

    const statusFilter = screen.getByTestId('status-filter');
    fireEvent.change(statusFilter, { target: { value: 'paid' } });

    expect(mockHandleFilterChange).toHaveBeenCalledWith('statusFilter', 'paid');
  });

  it('should handle sort changes', () => {
    render(<TraineePayments />);

    const sortSelect = screen.getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'amount' } });

    expect(mockHandleFilterChange).toHaveBeenCalledWith('sortBy', 'amount');
  });

  it('should handle add payment from table', () => {
    render(<TraineePayments />);

    const addPaymentBtn = screen.getByTestId('add-payment-btn-1');
    fireEvent.click(addPaymentBtn);

    expect(mockHandleAddPayment).toHaveBeenCalledWith(mockPayments[0]);
  });

  it('should handle add payment from header', () => {
    render(<TraineePayments />);

    const headerAddBtn = screen.getByTestId('header-add-payment');
    fireEvent.click(headerAddBtn);

    expect(mockHandleAddPaymentFromHeader).toHaveBeenCalled();
  });

  it('should handle export report', () => {
    render(<TraineePayments />);

    const exportBtn = screen.getByTestId('header-export-report');
    fireEvent.click(exportBtn);

    expect(mockHandleExportReport).toHaveBeenCalled();
  });

  it('should show loading state', () => {
    mockUsePayments.mockReturnValue({
      payments: [],
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: false,
      selectedPayment: null,
      isLoading: true,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    expect(screen.getByText('جاري تحميل البيانات...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    mockUsePayments.mockReturnValue({
      payments: [],
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: false,
      selectedPayment: null,
      isLoading: false,
      error: { message: 'Network error' },
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    expect(screen.getByText('خطأ في تحميل البيانات')).toBeInTheDocument();
    expect(screen.getByText('حدث خطأ أثناء جلب بيانات المدفوعات')).toBeInTheDocument();
  });

  it('should show add payment dialog when selected payment exists', () => {
    mockUsePayments.mockReturnValue({
      payments: mockPayments,
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: true,
      selectedPayment: mockPayments[0],
      isLoading: false,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    expect(screen.getByTestId('add-payment-dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog for: أحمد محمد علي')).toBeInTheDocument();
  });

  it('should handle dialog close', () => {
    mockUsePayments.mockReturnValue({
      payments: mockPayments,
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: true,
      selectedPayment: mockPayments[0],
      isLoading: false,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    const closeBtn = screen.getByTestId('close-dialog');
    fireEvent.click(closeBtn);

    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  it('should handle payment added', () => {
    mockUsePayments.mockReturnValue({
      payments: mockPayments,
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: true,
      selectedPayment: mockPayments[0],
      isLoading: false,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    const paymentAddedBtn = screen.getByTestId('payment-added');
    fireEvent.click(paymentAddedBtn);

    expect(mockHandlePaymentAdded).toHaveBeenCalled();
  });

  it('should not show dialog when no selected payment', () => {
    mockUsePayments.mockReturnValue({
      payments: mockPayments,
      stats: mockStats,
      filters: mockFilters,
      isAddPaymentDialogOpen: true,
      selectedPayment: null,
      isLoading: false,
      error: null,
      handleFilterChange: mockHandleFilterChange,
      handleAddPayment: mockHandleAddPayment,
      handleCloseDialog: mockHandleCloseDialog,
      handlePaymentAdded: mockHandlePaymentAdded,
      handleExportReport: mockHandleExportReport,
      handleAddPaymentFromHeader: mockHandleAddPaymentFromHeader,
    });

    render(<TraineePayments />);

    expect(screen.queryByTestId('add-payment-dialog')).not.toBeInTheDocument();
  });

  it('should have correct RTL direction', () => {
    render(<TraineePayments />);

    const mainContainer = screen.getByTestId('payment-header').closest('div');
    expect(mainContainer).toHaveAttribute('dir', 'rtl');
  });
});
