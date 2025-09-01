import authReducer, {
  setCredentials,
  logout,
  checkAuthState,
  selectCurrentUser,
  selectIsAuthenticated,
  selectToken,
} from '@/lip/features/auth/authSlice'
import { LoginResponse } from '@/lip/features/auth/login'

// Mock js-cookie
const mockCookies = {
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}
jest.mock('js-cookie', () => mockCookies)

// Mock window object
const mockWindow = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}
Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
})

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
  }

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
  }

  const mockLoginResponse: LoginResponse = {
    access_token: 'mock-token-123',
    user: mockUser,
    success: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockCookies.get.mockReturnValue(undefined)
    mockCookies.set.mockReturnValue(undefined)
    mockCookies.remove.mockReturnValue(undefined)
  })

  describe('Initial State', () => {
    it('should return initial state when no cookies exist', () => {
      const state = authReducer(undefined, { type: 'unknown' })
      expect(state).toEqual(initialState)
    })

    it('should return authenticated state when cookies exist', () => {
      mockCookies.get
        .mockReturnValueOnce('mock-token') // access_token
        .mockReturnValueOnce('mock-token') // auth_token
        .mockReturnValueOnce(JSON.stringify(mockUser)) // user_data

      const state = authReducer(undefined, { type: 'unknown' })
      expect(state).toEqual({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
      })
    })
  })

  describe('setCredentials', () => {
    it('should set user credentials and authenticate', () => {
      const state = authReducer(initialState, setCredentials(mockLoginResponse))
      
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('mock-token-123')
      expect(state.isAuthenticated).toBe(true)
    })

    it('should save credentials to cookies', () => {
      authReducer(initialState, setCredentials(mockLoginResponse))
      
      expect(mockCookies.set).toHaveBeenCalledWith('access_token', 'mock-token-123', expect.any(Object))
      expect(mockCookies.set).toHaveBeenCalledWith('auth_token', 'mock-token-123', expect.any(Object))
      expect(mockCookies.set).toHaveBeenCalledWith('user_data', JSON.stringify(mockUser), expect.any(Object))
    })

    it('should not overwrite existing cookies', () => {
      mockCookies.get
        .mockReturnValueOnce('existing-token') // access_token
        .mockReturnValueOnce('existing-token') // auth_token
        .mockReturnValueOnce(JSON.stringify(mockUser)) // user_data

      authReducer(initialState, setCredentials(mockLoginResponse))
      
      expect(mockCookies.set).not.toHaveBeenCalled()
    })
  })

  describe('logout', () => {
    it('should clear user credentials and unauthenticate', () => {
      const authenticatedState = {
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
      }

      const state = authReducer(authenticatedState, logout())
      
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('should remove cookies on logout', () => {
      const authenticatedState = {
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
      }

      authReducer(authenticatedState, logout())
      
      expect(mockCookies.remove).toHaveBeenCalledWith('access_token', { path: '/' })
      expect(mockCookies.remove).toHaveBeenCalledWith('auth_token', { path: '/' })
      expect(mockCookies.remove).toHaveBeenCalledWith('user_data', { path: '/' })
    })
  })

  describe('checkAuthState', () => {
    it('should check and restore auth state from cookies', () => {
      mockCookies.get
        .mockReturnValueOnce('mock-token') // access_token
        .mockReturnValueOnce('mock-token') // auth_token
        .mockReturnValueOnce(JSON.stringify(mockUser)) // user_data

      const state = authReducer(initialState, checkAuthState())
      
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('mock-token')
      expect(state.isAuthenticated).toBe(true)
    })

    it('should handle missing cookies gracefully', () => {
      mockCookies.get.mockReturnValue(undefined)

      const state = authReducer(initialState, checkAuthState())
      
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('should handle cookie parsing errors gracefully', () => {
      mockCookies.get
        .mockReturnValueOnce('mock-token') // access_token
        .mockReturnValueOnce('mock-token') // auth_token
        .mockReturnValueOnce('invalid-json') // user_data

      const state = authReducer(initialState, checkAuthState())
      
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('should prioritize access_token over auth_token', () => {
      mockCookies.get
        .mockReturnValueOnce('access-token') // access_token
        .mockReturnValueOnce('auth-token') // auth_token
        .mockReturnValueOnce(JSON.stringify(mockUser)) // user_data

      const state = authReducer(initialState, checkAuthState())
      
      expect(state.token).toBe('access-token')
    })
  })

  describe('Selectors', () => {
    const mockState = {
      auth: {
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
      },
    }

    it('should select current user correctly', () => {
      const result = selectCurrentUser(mockState as any)
      expect(result).toEqual(mockUser)
    })

    it('should select authentication status correctly', () => {
      const result = selectIsAuthenticated(mockState as any)
      expect(result).toBe(true)
    })

    it('should select token correctly', () => {
      const result = selectToken(mockState as any)
      expect(result).toBe('mock-token')
    })
  })

  describe('Error Handling', () => {
    it('should handle cookie access errors gracefully', () => {
      mockCookies.get.mockImplementation(() => {
        throw new Error('Cookie access denied')
      })

      const state = authReducer(initialState, checkAuthState())
      
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('should handle cookie setting errors gracefully', () => {
      mockCookies.set.mockImplementation(() => {
        throw new Error('Cookie setting denied')
      })

      const state = authReducer(initialState, setCredentials(mockLoginResponse))
      
      // State should still be updated even if cookies fail
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('mock-token-123')
      expect(state.isAuthenticated).toBe(true)
    })
  })
})
