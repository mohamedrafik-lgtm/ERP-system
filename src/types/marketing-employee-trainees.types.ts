// src/types/marketing-employee-trainees.types.ts

// Program Interface
export interface Program {
  id: number;
  nameAr: string;
}

// Trainee Interface
export interface Trainee {
  id: number;
  nameAr: string;
  nameEn?: string;
  phone?: string;
  email?: string;
  program: Program;
  createdAt: Date;
  updatedAt: Date;
  // Additional trainee fields that might be included
  marketingEmployeeId?: number;
  firstContactEmployeeId?: number;
  secondContactEmployeeId?: number;
  status?: string;
  enrollmentType?: string;
  gender?: string;
  birthDate?: Date;
  address?: string;
  education?: string;
  workExperience?: string;
  notes?: string;
}

// Marketing Employee Trainees Response Interface
export interface MarketingEmployeeTraineesResponse {
  data: Trainee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Marketing Employee Trainees Pagination Interface
export interface MarketingEmployeeTraineesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Marketing Employee Trainees List Response Interface
export interface MarketingEmployeeTraineesListResponse {
  data: Trainee[];
  pagination: MarketingEmployeeTraineesPagination;
}

// Marketing Employee Trainees Stats Interface
export interface MarketingEmployeeTraineesStats {
  employeeId: number;
  employeeName: string;
  totalTrainees: number;
  traineesByProgram: {
    programId: number;
    programName: string;
    count: number;
  }[];
  traineesByStatus: {
    status: string;
    count: number;
  }[];
  traineesByMonth: {
    month: number;
    year: number;
    count: number;
  }[];
  recentTrainees: Trainee[];
}

// Marketing Employee Trainees Filters Interface
export interface MarketingEmployeeTraineesFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  programId?: number;
  startDate?: string;
  endDate?: string;
  gender?: string;
  enrollmentType?: string;
}

// Marketing Employee Trainees Summary Interface
export interface MarketingEmployeeTraineesSummary {
  employeeId: number;
  employeeName: string;
  totalTrainees: number;
  thisMonthTrainees: number;
  lastMonthTrainees: number;
  growthRate: number;
  topPrograms: {
    programId: number;
    programName: string;
    count: number;
    percentage: number;
  }[];
  monthlyTrend: {
    month: number;
    year: number;
    count: number;
  }[];
}

// Error Response Interface
export interface MarketingEmployeeTraineesErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Success Response Interface
export interface MarketingEmployeeTraineesSuccessResponse {
  success: boolean;
  message: string;
  data: MarketingEmployeeTraineesResponse;
}
