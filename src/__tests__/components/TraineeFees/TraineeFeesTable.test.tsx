import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TraineeFeesCards from '@/components/TraineeFees/TraineeFeesTable';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock RTK Query hooks
const mockActivateFee = jest.fn();
const mockGetFeesQuery = jest.fn();

jest.mock('@/lip/features/Fees/Fees', () => ({
  useActivateFeeMutation: () => [mockActivateFee, { isLoading: false, isSuccess: false }],
  useGetFeesQuery: () => ({ data: mockGetFeesQuery() }),
}));

// Mock UI components
jest.mock('@/components/ui/MenuReport', () => {
  return function MockMenuComponent({ items, svg }: any) {
    return (
      <div data-testid="menu-component">
        <button data-testid="menu-button">{svg}</button>
      </div>
    );
  };
});

jest.mock('@/components/ui/Dialog', () => {
  return function MockDialogReports({ name }: any) {
    return (
      <div data-testid="dialog-component">
        <button data-testid="dialog-button">{name}</button>
      </div>
    );
  };
});

describe('TraineeFeesCards', () => {
  const mockFeesData = [
    {
      id: 1,
      name: 'رسوم التسجيل',
      type: 'TUITION',
      amount: 1000,
      isApplied: true,
      program: { nameAr: 'الذكاء الاصطناعي' },
      safe: { balance: 50000, currency: 'ر.س' }
    },
    {
      id: 2,
      name: 'رسوم التدريب',
      type: 'TRAIN',
      amount: 2000,
      isApplied: false,
      program: { nameAr: 'علوم البيانات' },
      safe: { balance: 30000, currency: 'ر.س' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFeesQuery.mockReturnValue(mockFeesData);
  });

  it('renders correctly with data', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('اسم الرسم')).toBeInTheDocument();
    expect(screen.getByText('النوع')).toBeInTheDocument();
    expect(screen.getByText('البرنامج')).toBeInTheDocument();
    expect(screen.getByText('الخزينه')).toBeInTheDocument();
    expect(screen.getByText('المبلغ')).toBeInTheDocument();
    expect(screen.getByText('الحاله')).toBeInTheDocument();
    expect(screen.getByText('الإجراءات')).toBeInTheDocument();
  });

  it('displays fee data correctly', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('رسوم التسجيل')).toBeInTheDocument();
    expect(screen.getByText('رسوم التدريب')).toBeInTheDocument();
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
    expect(screen.getByText('علوم البيانات')).toBeInTheDocument();
  });

  it('displays fee amounts and currency', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('1000 ر.س')).toBeInTheDocument();
    expect(screen.getByText('2000 ر.س')).toBeInTheDocument();
  });

  it('displays fee status correctly', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('مفعل')).toBeInTheDocument();
    expect(screen.getByText('غير مفعل')).toBeInTheDocument();
  });

  it('handles fee activation', async () => {
    render(<TraineeFeesCards />);
    
    const activateButton = screen.getByText('غير مفعل');
    fireEvent.click(activateButton);
    
    expect(mockActivateFee).toHaveBeenCalledWith({ id: 2 });
  });

  it('displays menu and dialog components', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getAllByTestId('menu-component')).toHaveLength(2);
    expect(screen.getAllByTestId('dialog-component')).toHaveLength(2);
  });

  it('shows loading state for activation button', () => {
    // Mock loading state
    jest.doMock('@/lip/features/Fees/Fees', () => ({
      useActivateFeeMutation: () => [mockActivateFee, { isLoading: true, isSuccess: false }],
      useGetFeesQuery: () => ({ data: mockFeesData }),
    }));
    
    render(<TraineeFeesCards />);
    
    const activateButtons = screen.getAllByRole('button');
    const feeButtons = activateButtons.filter(button => 
      button.textContent === 'مفعل' || button.textContent === 'غير مفعل'
    );
    
    // Check if buttons have loading state classes
    feeButtons.forEach(button => {
      expect(button).toHaveClass('cursor-not-allowed', 'opacity-65');
    });
  });

  it('handles empty data state', () => {
    mockGetFeesQuery.mockReturnValue([]);
    
    render(<TraineeFeesCards />);
    
    // Should still show headers
    expect(screen.getByText('اسم الرسم')).toBeInTheDocument();
    expect(screen.getByText('النوع')).toBeInTheDocument();
    
    // Should not show any fee data
    expect(screen.queryByText('رسوم التسجيل')).not.toBeInTheDocument();
  });

  it('handles undefined data state', () => {
    mockGetFeesQuery.mockReturnValue(undefined);
    
    render(<TraineeFeesCards />);
    
    // Should still show headers
    expect(screen.getByText('اسم الرسم')).toBeInTheDocument();
    expect(screen.getByText('النوع')).toBeInTheDocument();
  });

  it('displays correct fee types', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('TUITION')).toBeInTheDocument();
    expect(screen.getByText('TRAIN')).toBeInTheDocument();
  });

  it('shows success toast on successful activation', async () => {
    // Mock success state
    jest.doMock('@/lip/features/Fees/Fees', () => ({
      useActivateFeeMutation: () => [mockActivateFee, { isLoading: false, isSuccess: true }],
      useGetFeesQuery: () => ({ data: mockFeesData }),
    }));
    
    const { toast } = require('react-hot-toast');
    
    render(<TraineeFeesCards />);
    
    // Wait for useEffect to trigger
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('تم تفعيل الرسم');
    });
  });

  it('has proper styling classes', () => {
    render(<TraineeFeesCards />);
    
    const container = screen.getByText('اسم الرسم').closest('div');
    expect(container).toHaveClass('p-4', 'space-y-4');
  });

  it('displays fee cards with proper styling', () => {
    render(<TraineeFeesCards />);
    
    const feeCards = screen.getAllByText('رسوم التسجيل');
    feeCards.forEach(card => {
      const cardElement = card.closest('div');
      expect(cardElement).toHaveClass('bg-white', 'hover:bg-white/20', 'backdrop-blur-md', 'rounded-xl');
    });
  });

  it('handles multiple fee activations', async () => {
    render(<TraineeFeesCards />);
    
    const activateButtons = screen.getAllByText('غير مفعل');
    
    fireEvent.click(activateButtons[0]);
    
    expect(mockActivateFee).toHaveBeenCalledWith({ id: 2 });
    expect(mockActivateFee).toHaveBeenCalledTimes(1);
  });

  it('displays safe balance information', () => {
    render(<TraineeFeesCards />);
    
    expect(screen.getByText('50000')).toBeInTheDocument();
    expect(screen.getByText('30000')).toBeInTheDocument();
  });
});
