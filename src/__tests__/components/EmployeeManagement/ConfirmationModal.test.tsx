import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ConfirmationModal from '@/components/EmployeeManagement/ConfirmationModal';
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

describe('ConfirmationModal', () => {
  const mockProps = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    id: '1',
    phone: '+201234567890',
    accountType: 'STAFF'
  };

  it('renders delete button', () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('opens modal when delete button is clicked', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('displays user information in modal', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
      expect(screen.getByText('+201234567890')).toBeInTheDocument();
      expect(screen.getByText('موظف')).toBeInTheDocument();
    });
  });

  it('shows warning messages', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('تحذير مهم')).toBeInTheDocument();
      expect(screen.getByText('سيتم حذف المستخدم نهائياً من النظام وجميع البيانات المرتبطة به')).toBeInTheDocument();
    });
  });

  it('shows confirmation question', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText(/هل أنت متأكد تماماً من حذف المستخدم/)).toBeInTheDocument();
    });
  });

  it('renders action buttons', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('إلغاء')).toBeInTheDocument();
      expect(screen.getByText('حذف المستخدم')).toBeInTheDocument();
    });
  });

  it('closes modal when cancel button is clicked', async () => {
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
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

  it('handles delete action', async () => {
    const mockDeleteUser = jest.fn().mockResolvedValue({ data: {} });
    
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useDeleteUserMutation: () => [mockDeleteUser, { isLoading: false }]
      }
    }));
    
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
    
    const confirmDeleteButton = screen.getByText('حذف المستخدم');
    fireEvent.click(confirmDeleteButton);
    
    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith('1');
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
    
    renderWithProvider(<ConfirmationModal {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('جاري الحذف...')).toBeInTheDocument();
    });
  });

  it('displays correct account type', async () => {
    const instructorProps = {
      ...mockProps,
      accountType: 'INSTRUCTOR'
    };
    
    renderWithProvider(<ConfirmationModal {...instructorProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText('مدرب')).toBeInTheDocument();
    });
  });

  it('handles missing optional props gracefully', async () => {
    const minimalProps = {
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      id: '1'
    };
    
    renderWithProvider(<ConfirmationModal {...minimalProps} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    });
  });
});
