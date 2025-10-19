import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  success?: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { endpoint }) => {
      console.log('🌐 Employee API Request to endpoint:', endpoint);
      console.log('🔗 Full Employee URL:', `http://localhost:4000${endpoint}`);
      
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('access_token', token);
        headers.set('x-access-token', token);
        console.log('🔑 Employee token found and added to headers');
      } else {
        console.log('⚠️ No employee token found in cookies');
      }
      
      console.log('📋 Employee request headers:', Object.fromEntries(headers.entries()));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        console.log('🚀 Employee login request to:', '/api/auth/login');
        console.log('📤 Employee login data:', credentials);
        return {
          url: '/api/auth/login',
          method: 'POST',
          body: credentials,
        };
      },
      transformResponse: (response: unknown) => {
        console.log('✅ Employee login response received:', response);
        
        if (response && typeof response === 'object' && 'access_token' in response && 'user' in response) {
          return response as LoginResponse;
        } else if (response && typeof response === 'object' && 'token' in response && 'user' in response) {
          return {
            access_token: (response as { token: string }).token,
            user: (response as { user: LoginResponse['user'] }).user
          } as LoginResponse;
        } else {
          console.error('Unexpected login response format:', response);
          throw new Error('Unexpected login response format');
        }
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = loginApi;
export default loginApi;
