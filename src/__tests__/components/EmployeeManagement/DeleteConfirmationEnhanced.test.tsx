import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DeleteConfirmationEnhanced from '@/components/EmployeeManagement/DeleteConfirmationEnhanced';
import { UserAPI } from '@/lip/features/users/user';

// Mock the API
jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useDeleteUserMutation: () => [
      jest.fn().mockResolvedValue({ data: {} }),
      { isLoading: false, isError: false, isSuccess: true }
    ]
  }
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}));

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

const createMockStore = () => {
  return configureStore({
    reducer: {
      [UserAPI.reducerPath]: UserAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(UserAPI.middleware),
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('DeleteConfirmationEnhanced', () => {
  const mockProps = {
    userId: '1',
    userName: 'أحمد محمد',
    userEmail: 'ahmed@example.com',
    userPhone: '+201234567890',
    userAccountType: 'STAFF',
    onDeleteSuccess: jest.fn()
  };

  it('renders delete button', () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('opens confirmation modal when delete button is clicked', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('displays user information in confirmation modal', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
      expect(screen.getByText('+201234567890')).toBeInTheDocument();
      expect(screen.getByText('موظف')).toBeInTheDocument();
    });
  });

  it('shows warning messages in confirmation modal', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('تحذير مهم')).toBeInTheDocument();
      expect(screen.getByText('سيتم حذف المستخدم نهائياً من النظام وجميع البيانات المرتبطة به')).toBeInTheDocument();
    });
  });

  it('shows final confirmation message', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('تأكيد نهائي')).toBeInTheDocument();
      expect(screen.getByText(/هل أنت متأكد تماماً من حذف المستخدم/)).toBeInTheDocument();
    });
  });

  it('renders action buttons in confirmation modal', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('إلغاء')).toBeInTheDocument();
      expect(screen.getByText('حذف المستخدم')).toBeInTheDocument();
    });
  });

  it('closes confirmation modal when cancel button is clicked', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
    
    const cancelButton = screen.getByText('إلغاء');
    fireEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles delete action and shows success modal', async () => {
    const mockDeleteUser = jest.fn().mockResolvedValue({ data: {} });
    
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useDeleteUserMutation: () => [mockDeleteUser, { isLoading: false }]
      }
    }));
    
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      const confirmDeleteButton = screen.getByText('حذف المستخدم');
      fireEvent.click(confirmDeleteButton);
    });
    
    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith('1');
      expect(screen.getByText('تم الحذف بنجاح')).toBeInTheDocument();
    });
  });

  it('calls onDeleteSuccess callback after successful deletion', async () => {
    const mockOnDeleteSuccess = jest.fn();
    const propsWithCallback = { ...mockProps, onDeleteSuccess: mockOnDeleteSuccess };
    
    renderWithProvider(<DeleteConfirmationEnhanced {...propsWithCallback} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      const confirmDeleteButton = screen.getByText('حذف المستخدم');
      fireEvent.click(confirmDeleteButton);
    });
    
    await waitFor(() => {
      expect(mockOnDeleteSuccess).toHaveBeenCalled();
    });
  });

  it('shows loading state during deletion', async () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useDeleteUserMutation: () => [
          jest.fn().mockResolvedValue({ data: {} }),
          { isLoading: true }
        ]
      }
    }));
    
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('جاري الحذف...')).toBeInTheDocument();
    });
  });

  it('displays correct account type for INSTRUCTOR', async () => {
    const instructorProps = {
      ...mockProps,
      userAccountType: 'INSTRUCTOR'
    };
    
    renderWithProvider(<DeleteConfirmationEnhanced {...instructorProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('مدرب')).toBeInTheDocument();
    });
  });

  it('shows success modal with impact information', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      const confirmDeleteButton = screen.getByText('حذف المستخدم');
      fireEvent.click(confirmDeleteButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText('تم الحذف بنجاح')).toBeInTheDocument();
      expect(screen.getByText('تأثير الحذف')).toBeInTheDocument();
      expect(screen.getByText('• تم حذف الحساب نهائياً')).toBeInTheDocument();
      expect(screen.getByText('• تم إلغاء جميع الصلاحيات')).toBeInTheDocument();
    });
  });

  it('closes success modal when close button is clicked', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      const confirmDeleteButton = screen.getByText('حذف المستخدم');
      fireEvent.click(confirmDeleteButton);
    });
    
    await waitFor(() => {
      const closeButton = screen.getByText('تم');
      fireEvent.click(closeButton);
    });
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles missing optional props gracefully', async () => {
    const minimalProps = {
      userId: '1',
      userName: 'أحمد محمد',
      userEmail: 'ahmed@example.com'
    };
    
    renderWithProvider(<DeleteConfirmationEnhanced {...minimalProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    });
  });

  it('has correct CSS classes for styling', async () => {
    renderWithProvider(<DeleteConfirmationEnhanced {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toHaveClass('p-2', 'text-red-600', 'hover:bg-red-100', 'rounded-lg');
  });
});
