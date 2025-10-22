import { 
  EnrollmentType, 
  MaritalStatus, 
  ProgramType, 
  Gender, 
  Religion 
} from './prisma-enums';

// Interface للبرنامج التدريبي
export interface TrainingProgramInfo {
  id: number;
  nameAr: string;
  nameEn: string;
}

// Interface للمتدرب غير الموزع
export interface UndistributedTrainee {
  id: number;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  enrollmentType: EnrollmentType;
  maritalStatus: MaritalStatus;
  idIssueDate: Date;
  idExpiryDate: Date;
  programType: ProgramType;
  nationality: string;
  gender: Gender;
  birthDate: Date;
  residenceAddress: string;
  photoUrl?: string;
  photoCloudinaryId?: string;
  religion: Religion;
  programId: number;
  country: string;
  governorate?: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianJob?: string;
  guardianRelation: string;
  guardianName: string;
  landline?: string;
  program: TrainingProgramInfo;
}

// Interface لمعلومات التصفح
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Interface للـ response الرئيسي
export interface UndistributedTraineesResponse {
  trainees: UndistributedTrainee[];
  pagination: PaginationInfo;
}

// Interface للفلتر المستخدم في البحث
export interface UndistributedTraineesFilters {
  programId?: number;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}
