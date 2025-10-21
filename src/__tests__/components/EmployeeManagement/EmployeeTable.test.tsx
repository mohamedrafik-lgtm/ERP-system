import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeTable from '@/components/EmployeeManagement/EmployeeTable';
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
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '+201234567891',
    accountType: 'INSTRUCTOR',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  }
];

jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useGetUsersQuery: () => ({
      data: mockUsers,
      isLoading: false,
      isError: false
    }),
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

describe('EmployeeTable', () => {
  it('renders user data correctly', () => {
    renderWithProvider(<EmployeeTable />);
    
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('فاطمة علي')).toBeInTheDocument();
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
    expect(screen.getByText('fatima@example.com')).toBeInTheDocument();
  });

  it('renders account type badges correctly', () => {
    renderWithProvider(<EmployeeTable />);
    
    expect(screen.getByText('موظف')).toBeInTheDocument();
    expect(screen.getByText('مدرب')).toBeInTheDocument();
  });

  it('renders action buttons for each user', () => {
    renderWithProvider(<EmployeeTable />);
    
    const viewButtons = screen.getAllByTestId('view-button');
    const editButtons = screen.getAllByTestId('edit-button');
    const deleteButtons = screen.getAllByTestId('delete-button');
    
    expect(viewButtons).toHaveLength(2);
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
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
    
    renderWithProvider(<EmployeeTable />);
    
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
    
    renderWithProvider(<EmployeeTable />);
    
    expect(screen.getByText('لا يوجد مستخدمين')).toBeInTheDocument();
    expect(screen.getByText('لم يتم العثور على أي مستخدمين في النظام')).toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', async () => {
    renderWithProvider(<EmployeeTable />);
    
    const editButtons = screen.getAllByTestId('edit-button');
    fireEvent.click(editButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('opens details modal when view button is clicked', async () => {
    renderWithProvider(<EmployeeTable />);
    
    const viewButtons = screen.getAllByTestId('view-button');
    fireEvent.click(viewButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('opens delete confirmation when delete button is clicked', async () => {
    renderWithProvider(<EmployeeTable />);
    
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('renders user information correctly', () => {
    renderWithProvider(<EmployeeTable />);
    
    // Check if user names are displayed
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('فاطمة علي')).toBeInTheDocument();
    
    // Check if emails are displayed
    expect(screen.getByText('ahmed@example.com')).toBeInTheDocument();
    expect(screen.getByText('fatima@example.com')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    renderWithProvider(<EmployeeTable />);
    
    const tableContainer = screen.getByTestId('employee-table');
    expect(tableContainer).toHaveClass('space-y-4');
  });
});
