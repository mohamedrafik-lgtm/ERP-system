import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EditEmployeeModal from '@/components/EmployeeManagement/EditEmployeeModal';
import { UserAPI } from '@/lip/features/users/user';

// Mock the API
const mockUserData = {
  id: '1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+201234567890',
  accountType: 'STAFF',
  roleId: 'role-1',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
};

jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    usePatchUserMutation: () => [
      jest.fn().mockResolvedValue({ data: mockUserData }),
      { isLoading: false, isError: false, isSuccess: true }
    ],
    useGetUserByIdQuery: () => ({
      data: mockUserData,
      isLoading: false,
      isError: false
    })
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

describe('EditEmployeeModal', () => {
  const mockProps = {
    userId: '1',
    isOpen: true,
    onClose: jest.fn()
  };

  it('renders modal when open', () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    const closedProps = { ...mockProps, isOpen: false };
    renderWithProvider(<EditEmployeeModal {...closedProps} />);
    
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('displays modal title', () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    expect(screen.getByText('تعديل بيانات المستخدم')).toBeInTheDocument();
  });

  it('renders form fields', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('الاسم الكامل')).toBeInTheDocument();
      expect(screen.getByLabelText('البريد الإلكتروني')).toBeInTheDocument();
      expect(screen.getByLabelText('رقم الهاتف')).toBeInTheDocument();
      expect(screen.getByLabelText('نوع الحساب')).toBeInTheDocument();
      expect(screen.getByLabelText('معرف الدور (اختياري)')).toBeInTheDocument();
    });
  });

  it('pre-populates form with user data', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText('الاسم الكامل') as HTMLInputElement;
      const emailInput = screen.getByLabelText('البريد الإلكتروني') as HTMLInputElement;
      const phoneInput = screen.getByLabelText('رقم الهاتف') as HTMLInputElement;
      
      expect(nameInput.value).toBe('أحمد محمد');
      expect(emailInput.value).toBe('ahmed@example.com');
      expect(phoneInput.value).toBe('+201234567890');
    });
  });

  it('renders action buttons', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('إلغاء')).toBeInTheDocument();
      expect(screen.getByText('تحديث المستخدم')).toBeInTheDocument();
    });
  });

  it('calls onClose when cancel button is clicked', async () => {
    const mockOnClose = jest.fn();
    const propsWithMockClose = { ...mockProps, onClose: mockOnClose };
    
    renderWithProvider(<EditEmployeeModal {...propsWithMockClose} />);
    
    await waitFor(() => {
      const cancelButton = screen.getByText('إلغاء');
      fireEvent.click(cancelButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('handles form submission', async () => {
    const mockPatchUser = jest.fn().mockResolvedValue({ data: mockUserData });
    
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        usePatchUserMutation: () => [mockPatchUser, { isLoading: false }],
        useGetUserByIdQuery: () => ({
          data: mockUserData,
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      const submitButton = screen.getByText('تحديث المستخدم');
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(mockPatchUser).toHaveBeenCalledWith({
        id: '1',
        data: {
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          accountType: 'STAFF',
          roleId: 'role-1'
        }
      });
    });
  });

  it('shows loading state during update', async () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        usePatchUserMutation: () => [
          jest.fn().mockResolvedValue({ data: mockUserData }),
          { isLoading: true }
        ],
        useGetUserByIdQuery: () => ({
          data: mockUserData,
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('جاري التحديث...')).toBeInTheDocument();
    });
  });

  it('shows loading state when fetching user data', () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        usePatchUserMutation: () => [
          jest.fn().mockResolvedValue({ data: mockUserData }),
          { isLoading: false }
        ],
        useGetUserByIdQuery: () => ({
          data: undefined,
          isLoading: true,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    expect(screen.getByText('جاري تحميل بيانات المستخدم...')).toBeInTheDocument();
  });

  it('handles form validation', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText('الاسم الكامل');
      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.blur(nameInput);
    });
    
    await waitFor(() => {
      expect(screen.getByText('الاسم مطلوب')).toBeInTheDocument();
    });
  });

  it('has correct input types', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText('البريد الإلكتروني');
      const phoneInput = screen.getByLabelText('رقم الهاتف');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(phoneInput).toHaveAttribute('type', 'tel');
    });
  });

  it('displays correct placeholders', async () => {
    renderWithProvider(<EditEmployeeModal {...mockProps} />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('أدخل الاسم الكامل')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('example@domain.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+20 123 456 7890')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('أدخل معرف الدور (اختياري)')).toBeInTheDocument();
    });
  });
});
