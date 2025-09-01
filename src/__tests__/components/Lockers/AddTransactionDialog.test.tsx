import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AddTransactionDialog } from '@/components/Lockers/AddTransactionDialog';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock RTK Query hooks
const mockAddTransaction = jest.fn();
const mockGetFinanceQuery = jest.fn();

jest.mock('@/lip/features/Lockers/safe', () => ({
  useGetFinanceQuery: () => ({ data: mockGetFinanceQuery() }),
  useAddTransactionMutation: () => [mockAddTransaction, { isLoading: false }],
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

describe('AddTransactionDialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFinanceQuery.mockReturnValue(mockLockersData);
    mockAddTransaction.mockResolvedValue({ unwrap: () => Promise.resolve() });
  });

  const renderWithProvider = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <AddTransactionDialog
          isOpen={true}
          onClose={mockOnClose}
          {...props}
        />
      </Provider>
    );
  };

  it('renders correctly when open', () => {
    renderWithProvider();
    
    expect(screen.getByText('إضافة معاملة جديدة')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithProvider({ isOpen: false });
    
    expect(screen.queryByText('إضافة معاملة جديدة')).not.toBeInTheDocument();
  });

  it('displays all transaction type buttons', () => {
    renderWithProvider();
    
    expect(screen.getByText('إيداع')).toBeInTheDocument();
    expect(screen.getByText('سحب')).toBeInTheDocument();
    expect(screen.getByText('تحويل')).toBeInTheDocument();
    expect(screen.getByText('رسوم')).toBeInTheDocument();
    expect(screen.getByText('دفع')).toBeInTheDocument();
  });

  it('displays form fields', () => {
    renderWithProvider();
    
    expect(screen.getByLabelText('المبلغ')).toBeInTheDocument();
    expect(screen.getByLabelText('الوصف (اختياري)')).toBeInTheDocument();
  });

  it('handles transaction type selection', () => {
    renderWithProvider();
    
    const withdrawButton = screen.getByText('سحب');
    fireEvent.click(withdrawButton);
    
    expect(withdrawButton).toHaveClass('bg-gradient-to-r', 'from-red-500', 'to-red-600');
  });

  it('shows target locker selection for TRANSFER type', () => {
    renderWithProvider();
    
    const transferButton = screen.getByText('تحويل');
    fireEvent.click(transferButton);
    
    expect(screen.getByText('الخزينة المستهدفة')).toBeInTheDocument();
  });

  it('hides target locker selection for non-TRANSFER types', () => {
    renderWithProvider();
    
    const depositButton = screen.getByText('إيداع');
    fireEvent.click(depositButton);
    
    expect(screen.queryByText('الخزينة المستهدفة')).not.toBeInTheDocument();
  });

  it('handles form input changes', () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const descriptionInput = screen.getByLabelText('الوصف (اختياري)');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف المعاملة' } });
    
    expect(amountInput).toHaveValue('1000');
    expect(descriptionInput).toHaveValue('وصف المعاملة');
  });

  it('displays currency symbol in amount field', () => {
    renderWithProvider();
    
    expect(screen.getByText('ر.س')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const descriptionInput = screen.getByLabelText('الوصف (اختياري)');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف المعاملة' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAddTransaction).toHaveBeenCalledWith({
        amount: 1000,
        type: 'DEPOSIT',
        description: 'وصف المعاملة',
        sourceId: undefined,
        targetId: 'locker-1'
      });
    });
  });

  it('handles form submission for WITHDRAW type', async () => {
    renderWithProvider();
    
    const withdrawButton = screen.getByText('سحب');
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.click(withdrawButton);
    fireEvent.change(amountInput, { target: { value: '500' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAddTransaction).toHaveBeenCalledWith({
        amount: 500,
        type: 'WITHDRAW',
        description: undefined,
        sourceId: 'locker-1',
        targetId: undefined
      });
    });
  });

  it('handles form submission for TRANSFER type', async () => {
    renderWithProvider();
    
    const transferButton = screen.getByText('تحويل');
    const amountInput = screen.getByLabelText('المبلغ');
    const targetLockerSelect = screen.getByLabelText('الخزينة المستهدفة');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.click(transferButton);
    fireEvent.change(amountInput, { target: { value: '750' } });
    fireEvent.change(targetLockerSelect, { target: { value: 'locker-2' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAddTransaction).toHaveBeenCalledWith({
        amount: 750,
        type: 'TRANSFER',
        description: undefined,
        sourceId: 'locker-1',
        targetId: 'locker-2'
      });
    });
  });

  it('shows error for missing current locker', async () => {
    const storeWithoutLocker = configureStore({
      reducer: {
        lockers: (state = { selectedLockerId: null }, action) => state,
      },
    });
    
    render(
      <Provider store={storeWithoutLocker}>
        <AddTransactionDialog isOpen={true} onClose={mockOnClose} />
      </Provider>
    );
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    const { toast } = require('react-hot-toast');
    expect(toast.error).toHaveBeenCalledWith('يرجى اختيار خزينة أولاً');
  });

  it('shows error for invalid amount', async () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '0' } });
    fireEvent.click(submitButton);
    
    const { toast } = require('react-hot-toast');
    expect(toast.error).toHaveBeenCalledWith('يرجى إدخال مبلغ صحيح');
  });

  it('shows error for missing target locker in TRANSFER', async () => {
    renderWithProvider();
    
    const transferButton = screen.getByText('تحويل');
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.click(transferButton);
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    const { toast } = require('react-hot-toast');
    expect(toast.error).toHaveBeenCalledWith('يرجى اختيار الخزينة المستهدفة');
  });

  it('shows success message on successful submission', async () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const { toast } = require('react-hot-toast');
      expect(toast.success).toHaveBeenCalledWith('تم إنشاء المعاملة بنجاح');
    });
  });

  it('shows error message on failed submission', async () => {
    mockAddTransaction.mockRejectedValue(new Error('API Error'));
    
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const { toast } = require('react-hot-toast');
      expect(toast.error).toHaveBeenCalledWith('حدث خطأ أثناء إنشاء المعاملة');
    });
  });

  it('resets form after successful submission', async () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const descriptionInput = screen.getByLabelText('الوصف (اختياري)');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(amountInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });
  });

  it('calls onClose after successful submission', async () => {
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('displays loading state during submission', async () => {
    mockAddTransaction.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    renderWithProvider();
    
    const amountInput = screen.getByLabelText('المبلغ');
    const submitButton = screen.getByText('إضافة المعاملة');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });

  it('has proper styling classes', () => {
    renderWithProvider();
    
    const dialogPanel = screen.getByText('إضافة معاملة جديدة').closest('div');
    expect(dialogPanel).toHaveClass('bg-gradient-to-br', 'from-white', 'to-gray-50');
  });
});
