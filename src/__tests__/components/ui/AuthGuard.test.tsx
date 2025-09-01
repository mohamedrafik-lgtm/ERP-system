import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import AuthGuard from '@/components/ui/AuthGuard'
import authReducer from '@/lip/features/auth/authSlice'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock js-cookie
const mockCookies = {
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}
jest.mock('js-cookie', () => mockCookies)

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        ...initialState,
      },
    },
  })
}

describe('AuthGuard Component', () => {
  let store: ReturnType<typeof createMockStore>

  beforeEach(() => {
    store = createMockStore()
    mockPush.mockClear()
    mockCookies.get.mockClear()
  })

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    )
  }

  it('renders loading state initially', () => {
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    expect(screen.getByText('جاري التحقق من حالة تسجيل الدخول...')).toBeInTheDocument()
  })

  it('redirects to login when no token is present', async () => {
    mockCookies.get.mockReturnValue(undefined)
    
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('renders protected content when authenticated', async () => {
    mockCookies.get.mockReturnValue('mock-token')
    
    store = createMockStore({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      },
      token: 'mock-token',
      isAuthenticated: true,
    })
    
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  it('shows loading spinner during authentication check', () => {
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('handles authentication state changes correctly', async () => {
    // Start with no authentication
    mockCookies.get.mockReturnValue(undefined)
    
    const { rerender } = renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    // Should redirect to login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
    
    // Now authenticate
    mockCookies.get.mockReturnValue('mock-token')
    store = createMockStore({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      },
      token: 'mock-token',
      isAuthenticated: true,
    })
    
    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <AuthGuard>
            <div>Protected Content</div>
          </AuthGuard>
        </BrowserRouter>
      </Provider>
    )
    
    // Should show protected content
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  it('dispatches checkAuthState action on mount', async () => {
    const mockDispatch = jest.fn()
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch)
    
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('handles cookie parsing errors gracefully', async () => {
    mockCookies.get.mockImplementation((key) => {
      if (key === 'user_data') {
        throw new Error('Invalid JSON')
      }
      return 'mock-token'
    })
    
    renderWithProvider(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })
})
