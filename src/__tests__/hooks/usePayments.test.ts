import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { traineePaymentsApi } from '@/lip/features/traineePayments/traineePaymentsApi';
import { usePayments } from '@/hooks/usePayments';
import { TraineePaymentResponse } from '@/types/payment';

// Mock the API
jest.mock('@/lip/features/traineePayments/traineePaymentsApi', () => ({
  traineePaymentsApi: {
    reducerPath: 'traineePaymentsApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
    endpoints: {
      getTraineePayments: {
        initiate: jest.fn(),
      },
    },
  },
  useGetTraineePaymentsQuery: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    [traineePaymentsApi.reducerPath]: traineePaymentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(traineePaymentsApi.middleware),
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

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

describe('usePayments', () => {
  const mockUseGetTraineePaymentsQuery = require('@/lip/features/traineePayments/traineePaymentsApi').useGetTraineePaymentsQuery;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state correctly', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    expect(result.current.payments).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.filters).toEqual({
      searchTerm: '',
      statusFilter: 'all',
      sortBy: 'date'
    });
    expect(result.current.isAddPaymentDialogOpen).toBe(false);
    expect(result.current.selectedPayment).toBe(null);
  });

  it('should handle loading state', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.payments).toEqual([]);
  });

  it('should handle error state', () => {
    const mockError = { message: 'Network error' };
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    expect(result.current.error).toBe(mockError);
    expect(result.current.payments).toEqual([]);
  });

  it('should calculate stats correctly', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    expect(result.current.stats).toEqual({
      total: 15000, // 5000 + 8000 + 2000
      paid: 11000,  // 3000 + 8000 + 0
      remaining: 4000, // 15000 - 11000
      totalCount: 3,
      paidCount: 1,    // PAID
      partialCount: 1, // PARTIALLY_PAID
      unpaidCount: 1   // PENDING
    });
  });

  it('should filter payments by search term', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleFilterChange('searchTerm', 'أحمد');
    });

    expect(result.current.payments).toHaveLength(1);
    expect(result.current.payments[0].trainee.name).toBe('أحمد محمد علي');
  });

  it('should filter payments by status', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleFilterChange('statusFilter', 'paid');
    });

    expect(result.current.payments).toHaveLength(1);
    expect(result.current.payments[0].status).toBe('PAID');
  });

  it('should sort payments by amount', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleFilterChange('sortBy', 'amount');
    });

    expect(result.current.payments[0].amount).toBe(8000); // Highest amount first
    expect(result.current.payments[1].amount).toBe(5000);
    expect(result.current.payments[2].amount).toBe(2000);
  });

  it('should open add payment dialog', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleAddPayment(mockPayments[0]);
    });

    expect(result.current.isAddPaymentDialogOpen).toBe(true);
    expect(result.current.selectedPayment).toBe(mockPayments[0]);
  });

  it('should close add payment dialog', () => {
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    // First open the dialog
    act(() => {
      result.current.handleAddPayment(mockPayments[0]);
    });

    expect(result.current.isAddPaymentDialogOpen).toBe(true);

    // Then close it
    act(() => {
      result.current.handleCloseDialog();
    });

    expect(result.current.isAddPaymentDialogOpen).toBe(false);
    expect(result.current.selectedPayment).toBe(null);
  });

  it('should handle payment added', () => {
    const mockRefetch = jest.fn();
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handlePaymentAdded();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should handle export report', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleExportReport();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Exporting report...');
    
    consoleSpy.mockRestore();
  });

  it('should handle add payment from header', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockUseGetTraineePaymentsQuery.mockReturnValue({
      data: mockPayments,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => {
      result.current.handleAddPaymentFromHeader();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Adding payment from header...');
    
    consoleSpy.mockRestore();
  });
});
