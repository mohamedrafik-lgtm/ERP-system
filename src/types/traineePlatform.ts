// Interfaces for Trainee Platform API

export interface TraineeAccountResponse {
  data: TraineeAccount[];
  meta: PaginationMeta;
}

export interface TraineeAccount {
  id: string;
  nationalId: string;
  birthDate: Date;
  password: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  resetCode: string | null;
  resetCodeExpiresAt: Date | null;
  resetCodeGeneratedAt: Date | null;
  traineeId: number;
  createdAt: Date;
  updatedAt: Date;
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string;
    nationalId: string;
    email: string | null;
    phone: string;
    photoUrl: string | null;
    program: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
    traineeStatus: 'NEW' | 'CURRENT' | 'GRADUATE' | 'WITHDRAWN';
    classLevel: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH';
    academicYear: string | null;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Request interfaces
export interface TraineeAccountFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  programId?: number;
  traineeStatus?: 'NEW' | 'CURRENT' | 'GRADUATE' | 'WITHDRAWN';
  page?: number;
  limit?: number;
}

export interface TraineeAccountUpdateRequest {
  isActive?: boolean;
  password?: string;
}

export interface TraineeAccountCreateRequest {
  traineeId: number;
  password: string;
  isActive?: boolean;
}

// UI State interfaces
export interface TraineeAccountUI {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  nationalId: string;
  program: string;
  status: 'active' | 'inactive';
  traineeStatus: string;
  classLevel: string;
  lastLogin: string | null;
  createdAt: string;
  photoUrl: string | null;
}

export interface AccountManagementState {
  accounts: TraineeAccountUI[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
  filters: TraineeAccountFilters;
  selectedAccounts: string[];
}
