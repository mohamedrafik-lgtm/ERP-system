// Commission Types
export type CommissionType = 'FIRST_CONTACT' | 'SECOND_CONTACT';
export type CommissionStatus = 'PENDING' | 'PAID';

export interface MarketingEmployee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trainee {
  id: number;
  nameAr: string;
  nameEn: string;
  email: string;
  phone: string;
  programId: number;
  program?: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionPayout {
  id: number;
  commissionId: number;
  amount: number;
  paidAt: Date;
  paidBy: string;
  notes?: string;
  createdAt: Date;
}

export interface Commission {
  id: number;
  marketingEmployeeId: number;
  traineeId: number;
  type: CommissionType;
  amount: number;
  description?: string;
  status: CommissionStatus;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  paidBy?: string;
  marketingEmployee: MarketingEmployee;
  trainee: Trainee;
  payouts: CommissionPayout[];
}

// API Response Types
export interface CommissionsResponse {
  data: Commission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface CommissionFilters {
  status?: CommissionStatus;
  type?: CommissionType;
  marketingEmployeeId?: number;
  traineeId?: number;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Statistics Types
export interface CommissionStats {
  totalCommissions: number;
  totalAmount: number;
  paidCommissions: number;
  paidAmount: number;
  pendingCommissions: number;
  pendingAmount: number;
  firstContactCommissions: number;
  secondContactCommissions: number;
  totalMarketingEmployees: number;
  activeMarketingEmployees: number;
}
