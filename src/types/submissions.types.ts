// Marketing Trainee Submission Types

// Marketing Trainee Response Interface
export interface MarketingTraineeResponse {
  id: number;
  name: string;
  nationalId: string;
  phone: string;
  program: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL' | 'UNPAID';
  amountPaid: number;
  currency: string;
  firstContactEmployeeId?: number;
  secondContactEmployeeId?: number;
  firstContactEmployee?: {
    id: number;
    name: string;
  };
  secondContactEmployee?: {
    id: number;
    name: string;
  };
  firstContactDate?: Date;
  secondContactDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Marketing Trainees Query Parameters
export interface MarketingTraineesQueryParams {
  page: string;
  limit: string;
  search: string;
  status: string;
  employeeId: string;
  unassigned: string;
}

// Marketing Trainees Response
export interface MarketingTraineesResponse {
  data: MarketingTraineeResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Update Trainee Contact Request
export interface UpdateTraineeContactRequest {
  firstContactEmployeeId?: number;
  secondContactEmployeeId?: number;
}

// Assign Trainee to Marketing Employee Request
export interface AssignTraineeRequest {
  employeeId: number;
  contactType: 'first' | 'second';
}

// Marketing Employee for Contact Assignment
export interface MarketingEmployeeForContact {
  id: number;
  name: string;
  isActive: boolean;
}

// Contact Status Types
export type ContactStatus = 'UNASSIGNED' | 'ASSIGNED' | 'COMPLETED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL' | 'UNPAID';
