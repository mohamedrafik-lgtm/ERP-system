import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteStatsModal from '@/components/EmployeeManagement/DeleteStatsModal';

// Mock Headless UI components
jest.mock('@headlessui/react', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Dialog: ({ children, open, onClose }: any) => 
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogPanel: ({ children }: any) => <div data-testid="dialog-panel">{children}</div>,
  DialogTitle: ({ children }: any) => <h3>{children}</h3>
}));

describe('DeleteStatsModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    deletedUser: {
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      accountType: 'STAFF'
    }
  };

  it('renders modal when open', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    const closedProps = { ...mockProps, isOpen: false };
    render(<DeleteStatsModal {...closedProps} />);
    
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('displays success title', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('تم الحذف بنجاح')).toBeInTheDocument();
  });

  it('displays deleted user information', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
    expect(screen.getByText('موظف')).toBeInTheDocument();
  });

  it('displays account type correctly for STAFF', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('موظف')).toBeInTheDocument();
  });

  it('displays account type correctly for INSTRUCTOR', () => {
    const instructorProps = {
      ...mockProps,
      deletedUser: {
        ...mockProps.deletedUser,
        accountType: 'INSTRUCTOR'
      }
    };
    
    render(<DeleteStatsModal {...instructorProps} />);
    
    expect(screen.getByText('مدرب')).toBeInTheDocument();
  });

  it('displays success message', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('عملية مكتملة')).toBeInTheDocument();
    expect(screen.getByText('تم حذف المستخدم بنجاح من قاعدة البيانات')).toBeInTheDocument();
  });

  it('displays impact information', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('تأثير الحذف')).toBeInTheDocument();
    expect(screen.getByText('• تم حذف الحساب نهائياً')).toBeInTheDocument();
    expect(screen.getByText('• تم إلغاء جميع الصلاحيات')).toBeInTheDocument();
    expect(screen.getByText('• لن يتمكن من تسجيل الدخول')).toBeInTheDocument();
    expect(screen.getByText('• تم حذف البيانات المرتبطة')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText('تم')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    const propsWithMockClose = { ...mockProps, onClose: mockOnClose };
    
    render(<DeleteStatsModal {...propsWithMockClose} />);
    
    const closeButton = screen.getByText('تم');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays user name in success message', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    expect(screen.getByText(/تم حذف المستخدم أحمد محمد بنجاح/)).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    const dialogPanel = screen.getByTestId('dialog-panel');
    expect(dialogPanel).toHaveClass('relative', 'w-full', 'max-w-md', 'bg-white', 'rounded-2xl');
  });

  it('displays success icon', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    // Check if the success icon is present (CheckCircleIcon)
    const successIcon = screen.getByTestId('success-icon');
    expect(successIcon).toBeInTheDocument();
  });

  it('displays impact icon', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    // Check if the impact icon is present (ShieldExclamationIcon)
    const impactIcon = screen.getByTestId('impact-icon');
    expect(impactIcon).toBeInTheDocument();
  });

  it('renders with gradient header', () => {
    render(<DeleteStatsModal {...mockProps} />);
    
    const header = screen.getByText('تم الحذف بنجاح').closest('div');
    expect(header).toHaveClass('bg-gradient-to-r', 'from-green-600', 'to-blue-600');
  });

  it('handles missing user data gracefully', () => {
    const minimalProps = {
      isOpen: true,
      onClose: jest.fn(),
      deletedUser: {
        name: 'Test User',
        email: 'test@example.com',
        accountType: 'STAFF'
      }
    };
    
    render(<DeleteStatsModal {...minimalProps} />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
