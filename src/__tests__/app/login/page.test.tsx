import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '@/app/login/page'
import authReducer from '@/lip/features/auth/authSlice'
import { loginApi } from '@/lip/features/auth/login'

// Mock the login API
jest.mock('@/lip/features/auth/login', () => ({
  useLoginMutation: () => [
    jest.fn(),
    {
      data: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  ],
}))

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loginApi.middleware),
  })
}

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

// Mock react-hot-toast
const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}
jest.mock('react-hot-toast', () => mockToast)

describe('LoginPage Component', () => {
  let store: ReturnType<typeof createMockStore>

  beforeEach(() => {
    store = createMockStore()
    mockPush.mockClear()
    mockCookies.set.mockClear()
    mockToast.success.mockClear()
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

  it('renders login form with all fields', () => {
    renderWithProvider(<LoginPage />)
    
    expect(screen.getByText('تسجيل الدخول')).toBeInTheDocument()
    expect(screen.getByLabelText('البريد الإلكتروني')).toBeInTheDocument()
    expect(screen.getByLabelText('كلمة المرور')).toBeInTheDocument()
    expect(screen.getByText('حفظ تسجيل الدخول')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'تسجيل الدخول' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    renderWithProvider(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: 'تسجيل الدخول' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('البريد الإلكتروني مطلوب')).toBeInTheDocument()
      expect(screen.getByText('كلمة المرور مطلوبة')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    renderWithProvider(<LoginPage />)
    
    const emailInput = screen.getByLabelText('البريد الإلكتروني')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: 'تسجيل الدخول' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('هذه ليس بريد الكتروني')).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    renderWithProvider(<LoginPage />)
    
    const passwordInput = screen.getByLabelText('كلمة المرور')
    fireEvent.change(passwordInput, { target: { value: '123' } })
    
    const submitButton = screen.getByRole('button', { name: 'تسجيل الدخول' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('كلمة المرور يجب أن تكون 6 أحرف على الأقل')).toBeInTheDocument()
    })
  })

  it('handles successful form submission', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      access_token: 'mock-token',
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      },
    })

    jest.mocked(require('@/lip/features/auth/login').useLoginMutation).mockReturnValue([
      mockLogin,
      {
        data: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      },
    ])

    renderWithProvider(<LoginPage />)
    
    const emailInput = screen.getByLabelText('البريد الإلكتروني')
    const passwordInput = screen.getByLabelText('كلمة المرور')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    const submitButton = screen.getByRole('button', { name: 'تسجيل الدخول' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveHaveBeenCalledWith({
        emailOrPhone: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('handles login errors correctly', async () => {
    const mockLogin = jest.fn().mockRejectedValue({
      status: 401,
      data: { message: 'Invalid credentials' },
    })

    jest.mocked(require('@/lip/features/auth/login').useLoginMutation).mockReturnValue([
      mockLogin,
      {
        data: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      },
    ])

    renderWithProvider(<LoginPage />)
    
    const emailInput = screen.getByLabelText('البريد الإلكتروني')
    const passwordInput = screen.getByLabelText('كلمة المرور')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    
    const submitButton = screen.getByRole('button', { name: 'تسجيل الدخول' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('بيانات الاعتماد غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.')).toBeInTheDocument()
    })
  })

  it('shows loading state during form submission', async () => {
    jest.mocked(require('@/lip/features/auth/login').useLoginMutation).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      },
    ])

    renderWithProvider(<LoginPage />)
    
    expect(screen.getByText('جاري التحميل...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'جاري التحميل...' })).toBeDisabled()
  })

  it('remembers user login when checkbox is checked', async () => {
    renderWithProvider(<LoginPage />)
    
    const rememberCheckbox = screen.getByLabelText('حفظ تسجيل الدخول')
    expect(rememberCheckbox).toBeChecked()
    
    fireEvent.click(rememberCheckbox)
    expect(rememberCheckbox).not.toBeChecked()
  })
})
