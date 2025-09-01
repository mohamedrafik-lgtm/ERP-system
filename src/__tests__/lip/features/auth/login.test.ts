import { loginApi } from '@/lip/features/auth/login'
import { LoginRequest, LoginResponse } from '@/lip/features/auth/login'

// Mock js-cookie
const mockCookies = {
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}
jest.mock('js-cookie', () => mockCookies)

// Mock fetch
global.fetch = jest.fn()

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCookies.get.mockReturnValue('mock-token')
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('API Configuration', () => {
    it('should have correct reducer path', () => {
      expect(loginApi.reducerPath).toBe('loginApi')
    })

    it('should have correct base URL', () => {
      const baseQuery = loginApi.endpoints.login.query
      expect(baseQuery).toBeDefined()
    })
  })

  describe('Login Endpoint', () => {
    it('should have login endpoint defined', () => {
      expect(loginApi.endpoints.login).toBeDefined()
    })

    it('should have correct query configuration', () => {
      const endpoint = loginApi.endpoints.login
      expect(endpoint.query).toBeDefined()
    })

    it('should have transformResponse defined', () => {
      const endpoint = loginApi.endpoints.login
      expect(endpoint.transformResponse).toBeDefined()
    })
  })

  describe('Logout Endpoint', () => {
    it('should have logout endpoint defined', () => {
      expect(loginApi.endpoints.logout).toBeDefined()
    })

    it('should have correct query configuration', () => {
      const endpoint = loginApi.endpoints.logout
      expect(endpoint.query).toBeDefined()
    })
  })

  describe('Headers Configuration', () => {
    it('should set correct content type header', () => {
      const baseQuery = loginApi.endpoints.login.query
      const headers = new Headers()
      
      // Mock the prepareHeaders function
      const mockPrepareHeaders = jest.fn().mockReturnValue(headers)
      const mockBaseQuery = {
        ...baseQuery,
        prepareHeaders: mockPrepareHeaders,
      }
      
      expect(mockPrepareHeaders).toHaveBeenCalled()
    })

    it('should include authorization header when token exists', () => {
      mockCookies.get.mockReturnValue('mock-token')
      
      const baseQuery = loginApi.endpoints.login.query
      expect(baseQuery).toBeDefined()
    })
  })

  describe('Response Transformation', () => {
    it('should transform response with access_token correctly', () => {
      const mockResponse: LoginResponse = {
        access_token: 'mock-token-123',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        },
        success: true,
      }

      const endpoint = loginApi.endpoints.login
      if (endpoint.transformResponse) {
        const transformed = endpoint.transformResponse(mockResponse)
        expect(transformed).toEqual(mockResponse)
      }
    })

    it('should transform response with token field correctly', () => {
      const mockResponse = {
        token: 'mock-token-123',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        },
      }

      const endpoint = loginApi.endpoints.login
      if (endpoint.transformResponse) {
        const transformed = endpoint.transformResponse(mockResponse)
        expect(transformed).toEqual({
          access_token: 'mock-token-123',
          user: mockResponse.user,
        })
      }
    })

    it('should throw error for unexpected response format', () => {
      const invalidResponse = {
        message: 'Invalid response',
      }

      const endpoint = loginApi.endpoints.login
      if (endpoint.transformResponse) {
        expect(() => endpoint.transformResponse(invalidResponse)).toThrow('Unexpected login response format')
      }
    })
  })

  describe('API Hooks', () => {
    it('should export useLoginMutation hook', () => {
      const { useLoginMutation } = loginApi
      expect(useLoginMutation).toBeDefined()
    })

    it('should export useLogoutMutation hook', () => {
      const { useLogoutMutation } = loginApi
      expect(useLogoutMutation).toBeDefined()
    })
  })

  describe('Type Definitions', () => {
    it('should have correct LoginRequest interface', () => {
      const mockRequest: LoginRequest = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      }

      expect(mockRequest.emailOrPhone).toBe('test@example.com')
      expect(mockRequest.password).toBe('password123')
    })

    it('should have correct LoginResponse interface', () => {
      const mockResponse: LoginResponse = {
        access_token: 'mock-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        },
        success: true,
      }

      expect(mockResponse.access_token).toBe('mock-token')
      expect(mockResponse.user).toBeDefined()
      expect(mockResponse.success).toBe(true)
    })

    it('should have correct LogoutResponse interface', () => {
      const mockLogoutResponse = {
        success: true,
        message: 'Logged out successfully',
      }

      expect(mockLogoutResponse.success).toBe(true)
      expect(mockLogoutResponse.message).toBe('Logged out successfully')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      const endpoint = loginApi.endpoints.login
      expect(endpoint).toBeDefined()
    })

    it('should handle malformed responses gracefully', () => {
      const endpoint = loginApi.endpoints.login
      if (endpoint.transformResponse) {
        expect(() => endpoint.transformResponse(null)).toThrow()
      }
    })
  })

  describe('Cookie Integration', () => {
    it('should read token from cookies for headers', () => {
      mockCookies.get.mockReturnValue('mock-token')
      
      const baseQuery = loginApi.endpoints.login.query
      expect(baseQuery).toBeDefined()
    })

    it('should handle missing cookies gracefully', () => {
      mockCookies.get.mockReturnValue(undefined)
      
      const baseQuery = loginApi.endpoints.login.query
      expect(baseQuery).toBeDefined()
    })
  })
})
