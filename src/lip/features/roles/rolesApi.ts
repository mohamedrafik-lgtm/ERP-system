import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Role, RoleResponse, CreateRoleRequest, UpdateRoleRequest } from '@/types/role.types';

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Role', 'Permission'],
  endpoints: (builder) => ({
    // Get all roles
    getRoles: builder.query<RoleResponse[], void>({
      query: () => '/api/permissions/roles',
      providesTags: ['Role'],
      transformResponse: (response: RoleResponse[]) => {
        // Transform response to include userCount
        return response.map((role) => ({
          ...role,
          userCount: role._count?.users || 0,
        }));
      },
    }),
    
    // Get role by ID
    getRoleById: builder.query<RoleResponse, string>({
      query: (id) => `/api/permissions/roles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Role', id }],
    }),
    
    // Create new role
    createRole: builder.mutation<RoleResponse, CreateRoleRequest>({
      query: (body) => ({
        url: '/api/permissions/roles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Role'],
    }),
    
    // Update role
    updateRole: builder.mutation<RoleResponse, { id: string; data: UpdateRoleRequest }>({
      query: ({ id, data }) => ({
        url: `/api/permissions/roles/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }],
    }),
    
    // Delete role
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/permissions/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;

