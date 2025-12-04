// Undistributed Trainees Types

export interface UndistributedTrainee {
  // بيانات المتدرب الأساسية
  id: number;
  nameAr: string;
  nameEn: string;
  enrollmentType: "REGULAR" | "DISTANCE" | "BOTH";
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  nationalId: string;
  idIssueDate: Date | string;
  idExpiryDate: Date | string;
  programType: "SUMMER" | "WINTER" | "ANNUAL";
  nationality: string;
  gender: "MALE" | "FEMALE";
  birthDate: Date | string;
  residenceAddress: string;
  photoUrl: string | null;
  photoCloudinaryId: string | null;
  religion: "ISLAM" | "CHRISTIANITY" | "JUDAISM";
  programId: number;
  country: string;
  governorate: string | null;
  city: string;
  address: string;
  phone: string;
  email: string | null;
  guardianPhone: string;
  guardianEmail: string | null;
  guardianJob: string | null;
  guardianRelation: string;
  guardianName: string;
  landline: string | null;
  whatsapp: string | null;
  facebook: string | null;
  educationType: "PREPARATORY" | "INDUSTRIAL_SECONDARY" | "COMMERCIAL_SECONDARY" | "AGRICULTURAL_SECONDARY" | "AZHAR_SECONDARY" | "GENERAL_SECONDARY" | "UNIVERSITY" | "INDUSTRIAL_APPRENTICESHIP";
  schoolName: string;
  graduationDate: Date | string;
  totalGrade: number | null;
  gradePercentage: number | null;
  sportsActivity: string | null;
  culturalActivity: string | null;
  educationalActivity: string | null;
  notes: string | null;
  traineeStatus: "NEW" | "CURRENT" | "GRADUATE" | "WITHDRAWN";
  classLevel: "FIRST" | "SECOND" | "THIRD" | "FOURTH";
  academicYear: string | null;
  marketingEmployeeId: number | null;
  firstContactEmployeeId: number | null;
  secondContactEmployeeId: number | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // بيانات البرنامج
  program: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface UndistributedTraineesResponse {
  trainees: UndistributedTrainee[];
  pagination: PaginationInfo;
}

export interface UndistributedTraineesQueryParams {
  page?: number;
  limit?: number;
}
