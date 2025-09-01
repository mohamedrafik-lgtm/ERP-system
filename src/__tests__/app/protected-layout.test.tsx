import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import ProtectedLayout from '@/app/protected-layout'
import authReducer from '@/lip/features/auth/authSlice'

// Mock usePathname and useRouter
const mockPush = jest.fn()
const mockPathname = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname(),
}))

// Mock js-cookie
const mockCookies = {
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}
jest.mock('js-cookie', () => mockCookies)

// Mock AuthGuard component
jest.mock('@/components/ui/AuthGuard', () => {
  return function MockedAuthGuard({ children }: { children: React.ReactNode }) {
    return <div data-testid="auth-guard">{children}</div>
  }
})

// Mock Navbar component
jest.mock('@/components/ui/Navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>
}))

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

describe('ProtectedLayout Component', () => {
  let store: ReturnType<typeof createMockStore>

  beforeEach(() => {
    store = createMockStore()
    mockPush.mockClear()
    mockCookies.get.mockClear()
    mockPathname.mockReturnValue('/')
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

  describe('Public Paths', () => {
    it('renders children directly for login page', () => {
      mockPathname.mockReturnValue('/login')
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Login Content</div>
        </ProtectedLayout>
      )
      
      expect(screen.getByText('Login Content')).toBeInTheDocument()
      expect(screen.queryByTestId('navbar')).not.toBeInTheDocument()
      expect(screen.queryByTestId('auth-guard')).not.toBeInTheDocument()
    })

    it('does not render navbar for public paths', () => {
      mockPathname.mockReturnValue('/login')
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Login Content</div>
        </ProtectedLayout>
      )
      
      expect(screen.queryByTestId('navbar')).not.toBeInTheDocument()
    })
  })

  describe('Protected Paths', () => {
    it('renders AuthGuard and Navbar for protected pages', async () => {
      mockPathname.mockReturnValue('/dashboard')
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
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-guard')).toBeInTheDocument()
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
        expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
      })
    })

    it('redirects to login when no token exists', async () => {
      mockPathname.mockReturnValue('/dashboard')
      mockCookies.get.mockReturnValue(undefined)
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('Authentication State Changes', () => {
    it('redirects authenticated user from login page to home', async () => {
      mockPathname.mockReturnValue('/login')
      
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
        <ProtectedLayout>
          <div>Login Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/')
      })
    })

    it('dispatches checkAuthState on mount', async () => {
      mockPathname.mockReturnValue('/dashboard')
      const mockDispatch = jest.fn()
      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch)
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
  })

  describe('Client-side Rendering', () => {
    it('returns null during initial hydration', () => {
      mockPathname.mockReturnValue('/dashboard')
      
      // Mock useState to simulate initial state
      const mockSetState = jest.fn()
      jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState]) // isClient = false
      
      const { container } = renderWithProvider(
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      expect(container.firstChild).toBeNull()
    })

    it('renders content after client-side hydration', async () => {
      mockPathname.mockReturnValue('/dashboard')
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
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
      })
    })
  })

  describe('Path Detection', () => {
    it('correctly identifies public paths', () => {
      const publicPaths = ['/login']
      
      publicPaths.forEach(path => {
        mockPathname.mockReturnValue(path)
        
        renderWithProvider(
          <ProtectedLayout>
            <div>Public Content</div>
          </ProtectedLayout>
        )
        
        expect(screen.getByText('Public Content')).toBeInTheDocument()
        expect(screen.queryByTestId('navbar')).not.toBeInTheDocument()
      })
    })

    it('correctly identifies protected paths', async () => {
      const protectedPaths = ['/', '/dashboard', '/students', '/employees']
      
      for (const path of protectedPaths) {
        mockPathname.mockReturnValue(path)
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
        
        const { unmount } = renderWithProvider(
          <ProtectedLayout>
            <div>Protected Content</div>
          </ProtectedLayout>
        )
        
        await waitFor(() => {
          expect(screen.getByTestId('auth-guard')).toBeInTheDocument()
          expect(screen.getByTestId('navbar')).toBeInTheDocument()
        })
        
        unmount()
      }
    })
  })

  describe('Error Handling', () => {
    it('handles cookie errors gracefully', async () => {
      mockPathname.mockReturnValue('/dashboard')
      mockCookies.get.mockImplementation(() => {
        throw new Error('Cookie error')
      })
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })

    it('handles authentication state errors gracefully', async () => {
      mockPathname.mockReturnValue('/dashboard')
      mockCookies.get.mockReturnValue(undefined)
      
      renderWithProvider(
        <ProtectedLayout>
          <div>Dashboard Content</div>
        </ProtectedLayout>
      )
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })
  })
})
