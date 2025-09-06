import { render, screen, fireEvent } from '@testing-library/react';
import QuickAmountButtons from '@/components/TraineePayments/QuickAmountButtons';

describe('QuickAmountButtons', () => {
  const defaultProps = {
    remainingAmount: 1000,
    selectedAmount: 0,
    onAmountSelect: jest.fn(),
    onClear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render quick amount buttons', () => {
    render(<QuickAmountButtons {...defaultProps} />);
    
    expect(screen.getByText('⚡ مبالغ سريعة')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should call onAmountSelect when button is clicked', () => {
    render(<QuickAmountButtons {...defaultProps} />);
    
    const button25 = screen.getByText('25%').closest('button');
    fireEvent.click(button25!);
    
    expect(defaultProps.onAmountSelect).toHaveBeenCalledWith(250);
  });

  it('should highlight selected amount', () => {
    render(<QuickAmountButtons {...defaultProps} selectedAmount={500} />);
    
    const button50 = screen.getByText('50%').closest('button');
    expect(button50).toHaveClass('border-emerald-500', 'bg-emerald-100');
  });

  it('should call onClear when clear button is clicked', () => {
    render(<QuickAmountButtons {...defaultProps} />);
    
    const clearButton = screen.getByText('مسح');
    fireEvent.click(clearButton);
    
    expect(defaultProps.onClear).toHaveBeenCalled();
  });

  it('should display correct amounts for different remaining amounts', () => {
    render(<QuickAmountButtons {...defaultProps} remainingAmount={2000} />);
    
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
  });

  it('should show instruction text', () => {
    render(<QuickAmountButtons {...defaultProps} />);
    
    expect(screen.getByText('اضغط على أي مبلغ لإدخاله تلقائياً')).toBeInTheDocument();
  });
});
