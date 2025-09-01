import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTypeDialog from '@/components/TraineeFees/EditData';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('EditTypeDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<EditTypeDialog />);
    
    expect(screen.getByText('تحكم في نوع الرسوم')).toBeInTheDocument();
    expect(screen.getByText('تعديل إعدادات نوع الرسم المحدد')).toBeInTheDocument();
    expect(screen.getByText('تنبيه مهم')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <EditTypeDialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onSave={mockOnSave} 
      />
    );
    
    expect(screen.getByText('تحكم في نوع الرسوم')).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<EditTypeDialog />);
    
    // Check form fields by placeholder text and labels
    expect(screen.getByPlaceholderText('مثال: رسوم تسجيل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(screen.getByText('الاسم')).toBeInTheDocument();
    expect(screen.getByText('المبلغ')).toBeInTheDocument();
    expect(screen.getByText('الأولوية')).toBeInTheDocument();
    expect(screen.getByText('حالة المتدرب')).toBeInTheDocument();
    expect(screen.getByText('النوع')).toBeInTheDocument();
    expect(screen.getByText('العام التدريبي')).toBeInTheDocument();
    expect(screen.getByText('السماح بالتطبيق أكثر من مرة')).toBeInTheDocument();
    expect(screen.getByText('السماح بطباعة إيصال')).toBeInTheDocument();
    expect(screen.getByText('البرنامج')).toBeInTheDocument();
    expect(screen.getByText('الفرقة')).toBeInTheDocument();
    expect(screen.getByText('حساب الخزينة')).toBeInTheDocument();
  });

  it('displays warning message', () => {
    render(<EditTypeDialog />);
    
    const warningText = 'تعديل مبلغ نوع رسوم أو حذفه لا يقلل المبالغ المستحقة على المتدربين السابقين. لتعديل مدفوعات متدرب يتم ذلك من خلال صفحة مدفوعات المتدرب.';
    expect(screen.getByText(warningText)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <EditTypeDialog 
        onClose={mockOnClose} 
        onSave={mockOnSave} 
      />
    );
    
    const submitButton = screen.getByText('حفظ التغييرات');
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('جاري الحفظ...')).toBeInTheDocument();
    
    // Wait for async operation to complete
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({});
    }, { timeout: 2000 });
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('handles cancel button click', () => {
    render(
      <EditTypeDialog 
        onClose={mockOnClose} 
      />
    );
    
    const cancelButton = screen.getByText('إلغاء');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('disables submit button during loading', async () => {
    render(<EditTypeDialog />);
    
    const submitButton = screen.getByText('حفظ التغييرات');
    fireEvent.click(submitButton);
    
    // Check if button is disabled during loading
    expect(submitButton).toBeDisabled();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    }, { timeout: 2000 });
  });

  it('shows loading spinner during submission', async () => {
    render(<EditTypeDialog />);
    
    const submitButton = screen.getByText('حفظ التغييرات');
    fireEvent.click(submitButton);
    
    // Check for loading spinner
    expect(screen.getByText('جاري الحفظ...')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('جاري الحفظ...')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles form input changes', () => {
    render(<EditTypeDialog />);
    
    const nameInput = screen.getByPlaceholderText('مثال: رسوم تسجيل');
    const amountInput = screen.getByPlaceholderText('0.00');
    
    fireEvent.change(nameInput, { target: { value: 'رسوم جديدة' } });
    fireEvent.change(amountInput, { target: { value: '1000' } });
    
    expect(nameInput).toHaveValue('رسوم جديدة');
    expect(amountInput).toHaveValue(1000);
  });

  it('displays currency symbol in amount field', () => {
    render(<EditTypeDialog />);
    
    expect(screen.getByText('ر.س')).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<EditTypeDialog />);
    
    // Find the main container by looking for the gradient background
    const container = document.querySelector('.bg-gradient-to-br.from-white.to-gray-50');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('bg-gradient-to-br', 'from-white', 'to-gray-50');
  });

  it('handles error during submission', async () => {
    // Mock console.error to avoid error logs in test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<EditTypeDialog />);
    
    // Mock a failing promise
    const originalPromise = Promise;
    global.Promise = jest.fn().mockImplementation((executor) => {
      executor(() => {}, () => { throw new Error('Test error'); });
    }) as any;
    
    const submitButton = screen.getByText('حفظ التغييرات');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error saving data:', expect.any(Error));
    });
    
    // Restore original Promise
    global.Promise = originalPromise;
    consoleSpy.mockRestore();
  });
});
