// Types for Roles and Permissions

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  permissions?: Permission[];
  userCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  permissionIds?: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  permissionIds?: string[];
  isActive?: boolean;
}

export interface RoleResponse {
  id: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  permissions?: Permission[];
  _count?: {
    users: number;
  };
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

