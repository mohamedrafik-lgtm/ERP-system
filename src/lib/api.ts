// Base API configuration and utilities
import Cookies from 'js-cookie';

export const API_BASE_URL = 'http://localhost:4000';

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Get authentication token
export const getAuthToken = (): string => {
  // Try to get token from cookies
  let token = Cookies.get('access_token');
  
  // If not found, try the old cookie name
  if (!token) {
    token = Cookies.get('auth_token');
  }
  
  // If not found in cookies, try localStorage
  if (!token && typeof window !== 'undefined') {
    const localToken = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
    if (localToken) token = localToken;
  }
  
  // If not found in localStorage, try sessionStorage
  if (!token && typeof window !== 'undefined') {
    const sessionToken = sessionStorage.getItem('access_token') || sessionStorage.getItem('auth_token');
    if (sessionToken) token = sessionToken;
  }
  
  return token || '';
};

// Base fetch function with authentication
export const fetchAPI = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  };
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use the default message
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
  }
};

// Export for use in other files
export default fetchAPI;
