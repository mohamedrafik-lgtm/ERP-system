import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserResponse, 
  LoginRequest, 
  LoginResponse,
  AccountType 
} from '@/interface/index';

export const UserAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    // Get all users
    getUsers: build.query<UserResponse[], void>({
      query: () => '/api/users',
      providesTags: ['User']
    }),
    
    // Get user by ID
    getUserById: build.query<UserResponse, string>({
      query: (id) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }]
    }),
    
    // Create new user
    createUser: build.mutation<UserResponse, CreateUserRequest>({
      query: (body) => ({
        url: '/api/users',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User']
    }),
    
    // Update user (PUT)
    updateUser: build.mutation<UserResponse, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
    }),
    
    // Update user (PATCH)
    patchUser: build.mutation<UserResponse, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/api/users/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
    }),
    
    // Delete user
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User']
    }),
    
    // User login
    loginUser: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    
    // Get users by account type
    getUsersByAccountType: build.query<UserResponse[], AccountType>({
      query: (accountType) => `/api/users?accountType=${accountType}`,
      providesTags: ['User']
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useGetUsersByAccountTypeQuery
} = UserAPI;

// Legacy exports for backward compatibility
export const {
  useGetUserEmployeeQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation
} = UserAPI;
