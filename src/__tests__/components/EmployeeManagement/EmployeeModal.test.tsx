import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddEmployeeModal from '@/components/EmployeeManagement/EmployeeModal';
import { UserAPI } from '@/lip/features/users/user';

// Mock the API
jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useCreateUserMutation: () => [
      jest.fn().mockResolvedValue({ data: { id: '1', name: 'Test User' } }),
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

describe('AddEmployeeModal', () => {
  it('renders the add employee button', () => {
    renderWithProvider(<AddEmployeeModal />);
    
    expect(screen.getByText('إضافة موظف جديد')).toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    renderWithProvider(<AddEmployeeModal />);
    
    const button = screen.getByText('إضافة موظف جديد');
    fireEvent.click(button);
    
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('renders form fields in modal', async () => {
    renderWithProvider(<AddEmployeeModal />);
    
    const button = screen.getByText('إضافة موظف جديد');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByLabelText('الاسم الكامل')).toBeInTheDocument();
      expect(screen.getByLabelText('البريد الإلكتروني')).toBeInTheDocument();
      expect(screen.getByLabelText('رقم الهاتف')).toBeInTheDocument();
      expect(screen.getByLabelText('نوع الحساب')).toBeInTheDocument();
      expect(screen.getByLabelText('كلمة المرور')).toBeInTheDocument();
    });
  });

  it('renders action buttons in modal', async () => {
    renderWithProvider(<AddEmployeeModal />);
    
    const button = screen.getByText('إضافة موظف جديد');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('إلغاء')).toBeInTheDocument();
      expect(screen.getByText('إضافة الموظف')).toBeInTheDocument();
    });
  });

  it('has correct input types', async () => {
    renderWithProvider(<AddEmployeeModal />);
    
    const button = screen.getByText('إضافة موظف جديد');
    fireEvent.click(button);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText('البريد الإلكتروني');
      const phoneInput = screen.getByLabelText('رقم الهاتف');
      const passwordInput = screen.getByLabelText('كلمة المرور');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(phoneInput).toHaveAttribute('type', 'tel');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  it('has correct placeholders', async () => {
    renderWithProvider(<AddEmployeeModal />);
    
    const button = screen.getByText('إضافة موظف جديد');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('أدخل الاسم الكامل')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('example@domain.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+20 123 456 7890')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('أدخل كلمة المرور')).toBeInTheDocument();
    });
  });
});
