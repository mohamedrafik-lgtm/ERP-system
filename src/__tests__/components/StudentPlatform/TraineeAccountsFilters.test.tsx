import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TraineeAccountsFilters from '@/components/StudentPlatform/TraineeAccountsFilters';
import { TraineeAccountsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi';

// Mock Heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  MagnifyingGlassIcon: () => <div data-testid="magnifying-glass-icon" />,
  XMarkIcon: () => <div data-testid="x-mark-icon" />,
  FunnelIcon: () => <div data-testid="funnel-icon" />,
  ArrowPathIcon: () => <div data-testid="arrow-path-icon" />,
  UserIcon: () => <div data-testid="user-icon" />,
  AcademicCapIcon: () => <div data-testid="academic-cap-icon" />,
  ShieldCheckIcon: () => <div data-testid="shield-check-icon" />,
  CalendarIcon: () => <div data-testid="calendar-icon" />,
}));

describe('TraineeAccountsFilters', () => {
  const defaultFilters: TraineeAccountsQuery = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  const defaultProps = {
    filters: defaultFilters,
    onFilterChange: jest.fn(),
    onClearFilters: jest.fn(),
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter form with all fields', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    expect(screen.getByText('فلترة حسابات المتدربين')).toBeInTheDocument();
    expect(screen.getByText('استخدم الفلاتر للبحث عن حسابات محددة')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('البحث بالاسم أو الرقم القومي...')).toBeInTheDocument();
    expect(screen.getByText('حالة الحساب')).toBeInTheDocument();
    expect(screen.getByText('البرنامج التدريبي')).toBeInTheDocument();
    expect(screen.getByText('ترتيب حسب')).toBeInTheDocument();
    expect(screen.getByText('نوع الترتيب')).toBeInTheDocument();
    expect(screen.getByText('عدد العناصر في الصفحة')).toBeInTheDocument();
  });

  it('displays current filter values', () => {
    const filtersWithValues = {
      ...defaultFilters,
      search: 'أحمد',
      isActive: true,
      programId: 1,
      sortBy: 'trainee.nameAr',
      sortOrder: 'asc' as const,
      limit: 20
    };

    render(<TraineeAccountsFilters {...defaultProps} filters={filtersWithValues} />);
    
    expect(screen.getByDisplayValue('أحمد')).toBeInTheDocument();
    expect(screen.getByDisplayValue('true')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('trainee.nameAr')).toBeInTheDocument();
    expect(screen.getByDisplayValue('asc')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('البحث بالاسم أو الرقم القومي...');
    fireEvent.change(searchInput, { target: { value: 'محمد' } });
    
    expect(searchInput).toHaveValue('محمد');
  });

  it('handles account status filter changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const statusSelect = screen.getByDisplayValue('جميع الحسابات');
    fireEvent.change(statusSelect, { target: { value: 'true' } });
    
    expect(statusSelect).toHaveValue('true');
  });

  it('handles program filter changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const programSelect = screen.getByDisplayValue('جميع البرامج');
    fireEvent.change(programSelect, { target: { value: '1' } });
    
    expect(programSelect).toHaveValue('1');
  });

  it('handles sort by filter changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const sortSelect = screen.getByDisplayValue('createdAt');
    fireEvent.change(sortSelect, { target: { value: 'trainee.nameAr' } });
    
    expect(sortSelect).toHaveValue('trainee.nameAr');
  });

  it('handles sort order filter changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const orderSelect = screen.getByDisplayValue('desc');
    fireEvent.change(orderSelect, { target: { value: 'asc' } });
    
    expect(orderSelect).toHaveValue('asc');
  });

  it('handles limit filter changes', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const limitSelect = screen.getByDisplayValue('10');
    fireEvent.change(limitSelect, { target: { value: '20' } });
    
    expect(limitSelect).toHaveValue('20');
  });

  it('calls onFilterChange when apply filters button is clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<TraineeAccountsFilters {...defaultProps} onFilterChange={mockOnFilterChange} />);
    
    const applyButton = screen.getByText('تطبيق الفلاتر');
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(defaultFilters);
  });

  it('calls onClearFilters when clear all button is clicked', () => {
    const mockOnClearFilters = jest.fn();
    render(<TraineeAccountsFilters {...defaultProps} onClearFilters={mockOnClearFilters} />);
    
    const clearButton = screen.getByText('مسح جميع الفلاتر');
    fireEvent.click(clearButton);
    
    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<TraineeAccountsFilters {...defaultProps} onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('x-mark-icon').parentElement;
    fireEvent.click(closeButton!);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('resets filters to current values when reset button is clicked', () => {
    const filtersWithValues = {
      ...defaultFilters,
      search: 'أحمد',
      isActive: true
    };

    render(<TraineeAccountsFilters {...defaultProps} filters={filtersWithValues} />);
    
    // Change a value
    const searchInput = screen.getByDisplayValue('أحمد');
    fireEvent.change(searchInput, { target: { value: 'محمد' } });
    
    // Click reset
    const resetButton = screen.getByText('إعادة تعيين');
    fireEvent.click(resetButton);
    
    // Should reset to original value
    expect(screen.getByDisplayValue('أحمد')).toBeInTheDocument();
  });

  it('shows active filters when filters are applied', () => {
    const filtersWithValues = {
      ...defaultFilters,
      search: 'أحمد',
      isActive: true,
      programId: 1
    };

    render(<TraineeAccountsFilters {...defaultProps} filters={filtersWithValues} />);
    
    expect(screen.getByText('الفلاتر النشطة:')).toBeInTheDocument();
    expect(screen.getByText('البحث: أحمد')).toBeInTheDocument();
    expect(screen.getByText('الحالة: نشط')).toBeInTheDocument();
    expect(screen.getByText('البرنامج: 1')).toBeInTheDocument();
  });

  it('allows removing individual active filters', () => {
    const filtersWithValues = {
      ...defaultFilters,
      search: 'أحمد',
      isActive: true
    };

    const mockOnFilterChange = jest.fn();
    render(<TraineeAccountsFilters {...defaultProps} filters={filtersWithValues} onFilterChange={mockOnFilterChange} />);
    
    const removeSearchButton = screen.getByText('البحث: أحمد').parentElement?.querySelector('button');
    fireEvent.click(removeSearchButton!);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ search: undefined });
  });

  it('displays program options correctly', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const programSelect = screen.getByDisplayValue('جميع البرامج');
    const options = Array.from(programSelect.querySelectorAll('option')).map(option => option.textContent);
    
    expect(options).toContain('جميع البرامج');
    expect(options).toContain('الذكاء الاصطناعي');
    expect(options).toContain('تطوير الويب');
    expect(options).toContain('علوم البيانات');
    expect(options).toContain('الأمن السيبراني');
  });

  it('displays sort options correctly', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const sortSelect = screen.getByDisplayValue('createdAt');
    const options = Array.from(sortSelect.querySelectorAll('option')).map(option => option.textContent);
    
    expect(options).toContain('تاريخ الإنشاء');
    expect(options).toContain('تاريخ التحديث');
    expect(options).toContain('آخر تسجيل دخول');
    expect(options).toContain('اسم المتدرب');
    expect(options).toContain('اسم البرنامج');
  });

  it('displays limit options correctly', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const limitSelect = screen.getByDisplayValue('10');
    const options = Array.from(limitSelect.querySelectorAll('option')).map(option => option.textContent);
    
    expect(options).toContain('5 عناصر');
    expect(options).toContain('10 عناصر');
    expect(options).toContain('20 عنصر');
    expect(options).toContain('50 عنصر');
    expect(options).toContain('100 عنصر');
  });

  it('handles date range inputs', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const dateInputs = screen.getAllByDisplayValue('');
    expect(dateInputs).toHaveLength(2); // From and to date inputs
  });

  it('shows advanced filters section', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    expect(screen.getByText('فلاتر متقدمة')).toBeInTheDocument();
    expect(screen.getByText('تاريخ الإنشاء من')).toBeInTheDocument();
    expect(screen.getByText('تاريخ الإنشاء إلى')).toBeInTheDocument();
  });

  it('handles empty search input', () => {
    render(<TraineeAccountsFilters {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('البحث بالاسم أو الرقم القومي...');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(searchInput).toHaveValue('');
  });

  it('handles undefined filter values gracefully', () => {
    const filtersWithUndefined = {
      ...defaultFilters,
      search: undefined,
      isActive: undefined,
      programId: undefined
    };

    render(<TraineeAccountsFilters {...defaultProps} filters={filtersWithUndefined} />);
    
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Search input
    expect(screen.getByDisplayValue('جميع الحسابات')).toBeInTheDocument();
    expect(screen.getByDisplayValue('جميع البرامج')).toBeInTheDocument();
  });
});
