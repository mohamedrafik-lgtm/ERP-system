import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeesDialog, { IFeesType } from '@/components/TraineeFees/Modal';
import { Program, FinancialAccount } from '@/interface';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock RTK Query hook
jest.mock('@/lip/features/Fees/Fees', () => ({
  useAddFeesMutation: () => [
    jest.fn().mockResolvedValue({ unwrap: () => Promise.resolve() }),
    { isLoading: false }
  ],
}));

describe('FeesDialog', () => {
  const mockOnClose = jest.fn();
  const mockPrograms: Program[] = [
    { id: 1, nameAr: 'الذكاء الاصطناعي', nameEn: 'AI', description: 'AI Program' },
    { id: 2, nameAr: 'علوم البيانات', nameEn: 'Data Science', description: 'DS Program' }
  ];
  const mockSafes: FinancialAccount[] = [
    { id: '1', name: 'خزينة عمومية', balance: 10000, currency: 'ر.س' },
    { id: '2', name: 'خزينة خاصة', balance: 5000, currency: 'ر.س' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    expect(screen.getByText('إضافة رسم للمتدرب')).toBeInTheDocument();
    expect(screen.getByText('أدخل تفاصيل الرسم الجديد')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <FeesDialog
        isOpen={false}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    expect(screen.queryByText('إضافة رسم للمتدرب')).not.toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    expect(screen.getByLabelText('اسم الرسم')).toBeInTheDocument();
    expect(screen.getByLabelText('المبلغ')).toBeInTheDocument();
    expect(screen.getByLabelText('نوع الرسم')).toBeInTheDocument();
    expect(screen.getByLabelText('السنة الأكاديمية')).toBeInTheDocument();
    expect(screen.getByText('البرنامج التدريبي')).toBeInTheDocument();
    expect(screen.getByText('الخزنة')).toBeInTheDocument();
    expect(screen.getByText('السماح بالتكرار')).toBeInTheDocument();
  });

  it('displays fee types in dropdown', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const typeSelect = screen.getByLabelText('نوع الرسم');
    expect(typeSelect).toBeInTheDocument();
    
    // Check if all fee types are present
    Object.values(IFeesType).forEach(type => {
      expect(screen.getByDisplayValue(type)).toBeInTheDocument();
    });
  });

  it('displays programs in listbox', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const programButton = screen.getByText('اختر برنامجاً');
    fireEvent.click(programButton);
    
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
    expect(screen.getByText('علوم البيانات')).toBeInTheDocument();
  });

  it('displays safes in listbox', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const safeButton = screen.getByText('اختر خزنة');
    fireEvent.click(safeButton);
    
    expect(screen.getByText('خزينة عمومية')).toBeInTheDocument();
    expect(screen.getByText('خزينة خاصة')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const nameInput = screen.getByLabelText('اسم الرسم');
    const amountInput = screen.getByLabelText('المبلغ');
    const academicYearInput = screen.getByLabelText('السنة الأكاديمية');
    
    fireEvent.change(nameInput, { target: { value: 'رسوم جديدة' } });
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(academicYearInput, { target: { value: '2024/2025' } });
    
    expect(nameInput).toHaveValue('رسوم جديدة');
    expect(amountInput).toHaveValue(1000);
    expect(academicYearInput).toHaveValue('2024/2025');
  });

  it('handles program selection', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const programButton = screen.getByText('اختر برنامجاً');
    fireEvent.click(programButton);
    
    const programOption = screen.getByText('الذكاء الاصطناعي');
    fireEvent.click(programOption);
    
    expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
  });

  it('handles safe selection', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const safeButton = screen.getByText('اختر خزنة');
    fireEvent.click(safeButton);
    
    const safeOption = screen.getByText('خزينة عمومية');
    fireEvent.click(safeOption);
    
    expect(screen.getByText('خزينة عمومية')).toBeInTheDocument();
  });

  it('handles checkbox toggle', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const checkbox = screen.getByLabelText('السماح بالتكرار');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('handles cancel button click', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const cancelButton = screen.getByText('إلغاء');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays currency symbol in amount field', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    expect(screen.getByText('ر.س')).toBeInTheDocument();
  });

  it('shows empty state for programs', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={[]}
        safes={mockSafes}
      />
    );
    
    const programButton = screen.getByText('اختر برنامجاً');
    fireEvent.click(programButton);
    
    expect(screen.getByText('لا توجد برامج متاحة')).toBeInTheDocument();
  });

  it('shows empty state for safes', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={[]}
      />
    );
    
    const safeButton = screen.getByText('اختر خزنة');
    fireEvent.click(safeButton);
    
    expect(screen.getByText('لا توجد خزائن متاحة')).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    const dialogPanel = screen.getByText('إضافة رسم للمتدرب').closest('div');
    expect(dialogPanel).toHaveClass('bg-gradient-to-br', 'from-white', 'to-gray-50');
  });

  it('handles form submission with validation', async () => {
    render(
      <FeesDialog
        isOpen={true}
        onClose={mockOnClose}
        programs={mockPrograms}
        safes={mockSafes}
      />
    );
    
    // Fill required fields
    const nameInput = screen.getByLabelText('اسم الرسم');
    const amountInput = screen.getByLabelText('المبلغ');
    const academicYearInput = screen.getByLabelText('السنة الأكاديمية');
    
    fireEvent.change(nameInput, { target: { value: 'رسوم جديدة' } });
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(academicYearInput, { target: { value: '2024/2025' } });
    
    // Select program
    const programButton = screen.getByText('اختر برنامجاً');
    fireEvent.click(programButton);
    const programOption = screen.getByText('الذكاء الاصطناعي');
    fireEvent.click(programOption);
    
    // Select safe
    const safeButton = screen.getByText('اختر خزنة');
    fireEvent.click(safeButton);
    const safeOption = screen.getByText('خزينة عمومية');
    fireEvent.click(safeOption);
    
    // Submit form
    const submitButton = screen.getByText('حفظ الرسم');
    fireEvent.click(submitButton);
    
    // Wait for form submission
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
