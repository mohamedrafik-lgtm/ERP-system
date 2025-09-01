import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Navbar } from '@/components/ui/Navbar'
import authReducer from '@/lip/features/auth/authSlice'

// Mock the image imports
jest.mock('@/img/502585454_122235753458244801_413190920156398012_n-removebg-preview.png', () => ({
  src: '/mock-logo.png',
}))

jest.mock('@/img/454375571_1646661866176465_6149835982982053363_n.jpg', () => ({
  src: '/mock-user.jpg',
}))

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        },
        token: 'mock-token',
        isAuthenticated: true,
        ...initialState,
      },
    },
  })
}

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/',
}))

describe('Navbar Component', () => {
  let store: ReturnType<typeof createMockStore>

  beforeEach(() => {
    store = createMockStore()
    mockPush.mockClear()
  })

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  it('renders navbar with logo', () => {
    renderWithProvider(<Navbar />)
    
    const logo = screen.getByAltText('Logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders user profile section', () => {
    renderWithProvider(<Navbar />)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('shows user menu when clicking on user avatar', async () => {
    renderWithProvider(<Navbar />)
    
    const userAvatar = screen.getByAltText('User')
    fireEvent.click(userAvatar)
    
    await waitFor(() => {
      expect(screen.getByText('الملف الشخصي')).toBeInTheDocument()
      expect(screen.getByText('الإعدادات')).toBeInTheDocument()
      expect(screen.getByText('تسجيل الخروج')).toBeInTheDocument()
    })
  })

  it('renders main navigation menus', () => {
    renderWithProvider(<Navbar />)
    
    expect(screen.getByText('شؤون المتدربين')).toBeInTheDocument()
    expect(screen.getByText('المستخدمين')).toBeInTheDocument()
    expect(screen.getByText('الحسابات')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    renderWithProvider(<Navbar />)
    
    const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when clicking mobile menu button', async () => {
    renderWithProvider(<Navbar />)
    
    const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(mobileMenuButton)
    
    await waitFor(() => {
      expect(screen.getByText('شؤون المتدربين')).toBeInTheDocument()
    })
  })

  it('handles logout correctly', async () => {
    renderWithProvider(<Navbar />)
    
    const userAvatar = screen.getByAltText('User')
    fireEvent.click(userAvatar)
    
    await waitFor(() => {
      const logoutButton = screen.getByText('تسجيل الخروج')
      fireEvent.click(logoutButton)
    })
    
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('displays online status indicator', () => {
    renderWithProvider(<Navbar />)
    
    const statusIndicator = screen.getByTestId('online-status')
    expect(statusIndicator).toBeInTheDocument()
  })
})
