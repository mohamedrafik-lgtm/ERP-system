// Interface Segregation Principle - تقسيم interfaces كبيرة

// Base API Response
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// Pagination
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Authentication
export interface ILoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions?: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  token: string;
  expiresIn: number;
}

// Student API
export interface IStudentCreateRequest {
  nameArabic: string;
  nameEnglish: string;
  nationalId: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  nationality: string;
  religion: string;
  maritalState: string;
  admissionSystem: string;
  marketer: string;
  programType: string;
  program: string;
  releaseDate: string;
  expirationDate: string;
  photoUrl?: string;
  // Contact info
  The_state: string;
  Governorate: string;
  city: string;
  address: string;
  mobileNumber: string;
  email: string;
  ParentMobile: string;
  ParentEmail: string;
  GuardianJob: string;
  RelationshipWithTheGuardian: string;
  NationalIDOfTheGuardian: string;
  Landline?: string;
  whatsapp?: string;
  facebook?: string;
  // Education info
  TypeOfEducation: string;
  School_Center_Name: string;
  DateOfObtainingTheQualification: string;
  HighSchoolTotal: string;
  HighSchoolPercentage: string;
  // Additional info
  SportsActivity?: string;
  CulturalAndArtisticActivity?: string;
  ScientificActivity?: string;
  comments?: string;
}

export interface IStudentUpdateRequest extends Partial<IStudentCreateRequest> {
  id: number;
}

export interface IStudentListRequest extends IPaginationParams {
  search?: string;
  program?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Program API
export interface IProgram {
  id: number;
  name: string;
  description?: string;
  duration: number;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProgramCreateRequest {
  name: string;
  description?: string;
  duration: number;
  type: string;
}

export interface IProgramUpdateRequest extends Partial<IProgramCreateRequest> {
  id: number;
}

// Financial API
export interface IFinancialAccount {
  id: string;
  name: string;
  description?: string;
  type: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'FEE' | 'PAYMENT';
  amount: number;
  description?: string;
  fromAccountId?: string;
  toAccountId?: string;
  reference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITransactionCreateRequest {
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'FEE' | 'PAYMENT';
  amount: number;
  description?: string;
  fromAccountId?: string;
  toAccountId?: string;
  reference?: string;
}

// Error Handling
export interface IApiError {
  message: string;
  code?: string;
  field?: string;
  details?: any;
}

export interface IValidationError {
  field: string;
  message: string;
  value?: any;
}

// File Upload
export interface IFileUploadRequest {
  file: File;
  type: 'image' | 'document' | 'other';
  folder?: string;
}

export interface IFileUploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    filename: string;
    size: number;
    type: string;
  };
}

// Search
export interface ISearchRequest {
  query: string;
  type?: string;
  filters?: Record<string, any>;
  pagination?: IPaginationParams;
}

export interface ISearchResponse<T> extends IPaginatedResponse<T> {
  query: string;
  suggestions?: string[];
  filters?: Record<string, any>;
}
