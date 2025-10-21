import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserDetailsModal from '@/components/EmployeeManagement/UserDetailsModal';
import { UserAPI } from '@/lip/features/users/user';

// Mock the API
const mockUserData = {
  id: '1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+201234567890',
  accountType: 'STAFF',
  roleId: 'role-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useGetUserByIdQuery: () => ({
      data: mockUserData,
      isLoading: false,
      isError: false
    })
  }
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

describe('UserDetailsModal', () => {
  const mockProps = {
    userId: '1',
    isOpen: true,
    onClose: jest.fn()
  };

  it('renders modal when open', () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    const closedProps = { ...mockProps, isOpen: false };
    renderWithProvider(<UserDetailsModal {...closedProps} />);
    
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('displays modal title', () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    expect(screen.getByText('تفاصيل المستخدم')).toBeInTheDocument();
  });

  it('displays user information', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
      expect(screen.getByText('+201234567890')).toBeInTheDocument();
      expect(screen.getByText('موظف')).toBeInTheDocument();
    });
  });

  it('displays account type correctly for STAFF', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('موظف')).toBeInTheDocument();
    });
  });

  it('displays account type correctly for INSTRUCTOR', async () => {
    const instructorData = { ...mockUserData, accountType: 'INSTRUCTOR' };
    
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUserByIdQuery: () => ({
          data: instructorData,
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('مدرب')).toBeInTheDocument();
    });
  });

  it('displays creation and update dates', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('تاريخ الإنشاء')).toBeInTheDocument();
      expect(screen.getByText('آخر تحديث')).toBeInTheDocument();
    });
  });

  it('renders close button', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('إغلاق')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const mockOnClose = jest.fn();
    const propsWithMockClose = { ...mockProps, onClose: mockOnClose };
    
    renderWithProvider(<UserDetailsModal {...propsWithMockClose} />);
    
    await waitFor(() => {
      const closeButton = screen.getByText('إغلاق');
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows loading state when fetching user data', () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUserByIdQuery: () => ({
          data: undefined,
          isLoading: true,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    expect(screen.getByText('جاري تحميل بيانات المستخدم...')).toBeInTheDocument();
  });

  it('shows error state when user data is not found', () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUserByIdQuery: () => ({
          data: null,
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    expect(screen.getByText('خطأ في تحميل البيانات')).toBeInTheDocument();
    expect(screen.getByText('لم يتم العثور على بيانات المستخدم')).toBeInTheDocument();
  });

  it('displays role ID when available', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('معرف الدور')).toBeInTheDocument();
      expect(screen.getByText('role-1')).toBeInTheDocument();
    });
  });

  it('handles missing role ID gracefully', async () => {
    const userWithoutRole = { ...mockUserData, roleId: undefined };
    
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUserByIdQuery: () => ({
          data: userWithoutRole,
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.queryByText('معرف الدور')).not.toBeInTheDocument();
    });
  });

  it('has correct CSS classes for styling', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      const dialogPanel = screen.getByTestId('dialog-panel');
      expect(dialogPanel).toHaveClass('relative', 'w-full', 'max-w-2xl', 'bg-white', 'rounded-2xl');
    });
  });

  it('displays user information in organized cards', async () => {
    renderWithProvider(<UserDetailsModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('البريد الإلكتروني')).toBeInTheDocument();
      expect(screen.getByText('رقم الهاتف')).toBeInTheDocument();
      expect(screen.getByText('تاريخ الإنشاء')).toBeInTheDocument();
      expect(screen.getByText('آخر تحديث')).toBeInTheDocument();
    });
  });
});
