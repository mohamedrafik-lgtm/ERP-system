import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LockerDetils from '@/components/Lockers/LockerDetils';

// Mock RTK Query hooks
const mockGetTransactionsQuery = jest.fn();
const mockGetFinanceQuery = jest.fn();

jest.mock('@/lip/features/Lockers/safe', () => ({
  useGetTransactionsQuery: (safeId: string) => mockGetTransactionsQuery(safeId),
  useGetFinanceQuery: () => ({ data: mockGetFinanceQuery() }),
}));

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    lockers: (state = { selectedLockerId: 'locker-1' }, action) => state,
  },
});

const mockLockersData = [
  { id: 'locker-1', name: 'خزينة عمومية', balance: 10000, currency: 'ر.س' },
  { id: 'locker-2', name: 'خزينة خاصة', balance: 5000, currency: 'ر.س' }
];

const mockTransactionsData = [
  {
    id: '1',
    amount: 1000,
    type: 'DEPOSIT',
    description: 'إيداع مبلغ',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    amount: 500,
    type: 'WITHDRAW',
    description: 'سحب مبلغ',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    amount: 750,
    type: 'TRANSFER',
    description: 'تحويل بين الخزائن',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  }
];

describe('LockerDetils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFinanceQuery.mockReturnValue(mockLockersData);
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={mockStore}>
        <LockerDetils />
      </Provider>
    );
  };

  it('renders correctly with selected locker', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    expect(screen.getByText('تفاصيل الخزينة')).toBeInTheDocument();
    expect(screen.getByText('خزينة عمومية')).toBeInTheDocument();
    expect(screen.getByText('10,000 ر.س')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false
    });
    
    renderWithProvider();
    
    expect(screen.getByText('جاري تحميل المعاملات...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true
    });
    
    renderWithProvider();
    
    expect(screen.getByText('حدث خطأ أثناء تحميل المعاملات')).toBeInTheDocument();
  });

  it('displays empty state when no transactions', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    expect(screen.getByText('لا توجد معاملات لهذه الخزينة')).toBeInTheDocument();
  });

  it('displays transactions correctly', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    // Check transaction amounts
    expect(screen.getByText('1,000 ر.س')).toBeInTheDocument();
    expect(screen.getByText('500 ر.س')).toBeInTheDocument();
    expect(screen.getByText('750 ر.س')).toBeInTheDocument();
    
    // Check transaction descriptions
    expect(screen.getByText('إيداع مبلغ')).toBeInTheDocument();
    expect(screen.getByText('سحب مبلغ')).toBeInTheDocument();
    expect(screen.getByText('تحويل بين الخزائن')).toBeInTheDocument();
  });

  it('displays correct transaction types in Arabic', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    expect(screen.getByText('إيداع')).toBeInTheDocument();
    expect(screen.getByText('سحب')).toBeInTheDocument();
    expect(screen.getByText('تحويل')).toBeInTheDocument();
  });

  it('displays transaction dates correctly', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    // Check if dates are displayed (formatted in Arabic)
    expect(screen.getByText(/١٥\/١\/٢٠٢٤/)).toBeInTheDocument();
    expect(screen.getByText(/١٤\/١\/٢٠٢٤/)).toBeInTheDocument();
    expect(screen.getByText(/١٣\/١\/٢٠٢٤/)).toBeInTheDocument();
  });

  it('shows different icons for different transaction types', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    // Check for different colored icons based on transaction type
    const depositIcon = screen.getByText('إيداع').closest('div')?.querySelector('div');
    const withdrawIcon = screen.getByText('سحب').closest('div')?.querySelector('div');
    const transferIcon = screen.getByText('تحويل').closest('div')?.querySelector('div');
    
    expect(depositIcon).toHaveClass('bg-green-100', 'text-green-600');
    expect(withdrawIcon).toHaveClass('bg-red-100', 'text-red-600');
    expect(transferIcon).toHaveClass('bg-blue-100', 'text-blue-600');
  });

  it('handles no selected locker', () => {
    const storeWithoutLocker = configureStore({
      reducer: {
        lockers: (state = { selectedLockerId: null }, action) => state,
      },
    });
    
    render(
      <Provider store={storeWithoutLocker}>
        <LockerDetils />
      </Provider>
    );
    
    expect(screen.getByText('يرجى اختيار خزينة لعرض التفاصيل')).toBeInTheDocument();
  });

  it('calls useGetTransactionsQuery with correct safeId', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    expect(mockGetTransactionsQuery).toHaveBeenCalledWith('locker-1');
  });

  it('displays locker balance with correct currency', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    expect(screen.getByText('10,000 ر.س')).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    const container = screen.getByText('تفاصيل الخزينة').closest('div');
    expect(container).toHaveClass('bg-gradient-to-br', 'from-white', 'to-gray-50');
  });

  it('displays transaction cards with proper styling', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    const transactionCards = screen.getAllByText(/ر\.س/);
    transactionCards.forEach(card => {
      const cardElement = card.closest('div');
      expect(cardElement).toHaveClass('bg-white', 'rounded-xl', 'shadow-sm');
    });
  });

  it('handles different locker selection', () => {
    const storeWithDifferentLocker = configureStore({
      reducer: {
        lockers: (state = { selectedLockerId: 'locker-2' }, action) => state,
      },
    });
    
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    render(
      <Provider store={storeWithDifferentLocker}>
        <LockerDetils />
      </Provider>
    );
    
    expect(screen.getByText('خزينة خاصة')).toBeInTheDocument();
    expect(screen.getByText('5,000 ر.س')).toBeInTheDocument();
    expect(mockGetTransactionsQuery).toHaveBeenCalledWith('locker-2');
  });

  it('displays header with icon', () => {
    mockGetTransactionsQuery.mockReturnValue({
      data: mockTransactionsData,
      isLoading: false,
      isError: false
    });
    
    renderWithProvider();
    
    const header = screen.getByText('تفاصيل الخزينة');
    const iconContainer = header.closest('div')?.querySelector('div');
    
    expect(iconContainer).toHaveClass('w-16', 'h-16', 'bg-gradient-to-r');
  });
});
