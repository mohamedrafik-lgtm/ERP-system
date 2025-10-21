import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeManagement from '@/app/EmployeeManagement/page';
import { UserAPI } from '@/lip/features/users/user';

// Mock the API
const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+201234567890',
    accountType: 'STAFF',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useGetUsersQuery: () => ({
      data: mockUsers,
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

describe('EmployeeManagement Page', () => {
  it('renders page title', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('إدارة المستخدمين')).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('إدارة وتنظيم حسابات المستخدمين والموظفين')).toBeInTheDocument();
  });

  it('renders stats cards', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('إجمالي المستخدمين')).toBeInTheDocument();
    expect(screen.getByText('المديرين')).toBeInTheDocument();
    expect(screen.getByText('المستخدمين العاديين')).toBeInTheDocument();
    expect(screen.getByText('آخر تسجيل دخول')).toBeInTheDocument();
  });

  it('renders add employee button', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('إضافة موظف جديد')).toBeInTheDocument();
  });

  it('renders employee table', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('قائمة المستخدمين')).toBeInTheDocument();
    expect(screen.getByText('إدارة جميع حسابات المستخدمين في النظام')).toBeInTheDocument();
  });

  it('displays user data in table', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
  });

  it('renders pagination', () => {
    renderWithProvider(<EmployeeManagement />);
    
    // Check if pagination component is rendered
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('has correct page layout', () => {
    renderWithProvider(<EmployeeManagement />);
    
    const mainContainer = screen.getByText('إدارة المستخدمين').closest('div');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });

  it('renders with RTL direction', () => {
    renderWithProvider(<EmployeeManagement />);
    
    const mainContainer = screen.getByText('إدارة المستخدمين').closest('div');
    expect(mainContainer).toHaveAttribute('dir', 'rtl');
  });

  it('displays correct stats values', () => {
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('24')).toBeInTheDocument(); // Total users
    expect(screen.getByText('3')).toBeInTheDocument(); // Admins
    expect(screen.getByText('21')).toBeInTheDocument(); // Regular users
  });

  it('shows loading state when data is loading', () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUsersQuery: () => ({
          data: undefined,
          isLoading: true,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('shows empty state when no users', () => {
    jest.doMock('@/lip/features/users/user', () => ({
      UserAPI: {
        useGetUsersQuery: () => ({
          data: [],
          isLoading: false,
          isError: false
        })
      }
    }));
    
    renderWithProvider(<EmployeeManagement />);
    
    expect(screen.getByText('لا يوجد مستخدمين')).toBeInTheDocument();
  });

  it('has correct grid layout for stats', () => {
    renderWithProvider(<EmployeeManagement />);
    
    const statsContainer = screen.getByText('إجمالي المستخدمين').closest('div')?.parentElement;
    expect(statsContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('renders with proper spacing', () => {
    renderWithProvider(<EmployeeManagement />);
    
    const mainContainer = screen.getByText('إدارة المستخدمين').closest('div');
    expect(mainContainer).toHaveClass('p-6');
  });

  it('has responsive design classes', () => {
    renderWithProvider(<EmployeeManagement />);
    
    const mainContainer = screen.getByText('إدارة المستخدمين').closest('div');
    expect(mainContainer).toHaveClass('max-w-7xl', 'mx-auto');
  });
});
