// Interface Segregation Principle - تقسيم interfaces كبيرة
export interface IStudentFormData {
  // Basic Information
  nameAr: string;
  nameEn: string;
  nationalId: string;
  birthDate: string;
  gender: Gender;
  religion: Religion;
  maritalStatus: MaritalStatus;
  
  // Contact Information
  phone: string;
  email: string;
  address: string;
  
  // Academic Information
  enrollmentType: EnrollmentType;
  programType: ProgramType;
  traineeStatus: TraineeStatus;
  classLevel: ClassLevel;
  programId: number;
  
  // Additional Information
  photoUrl: string;
  notes?: string;
}

export interface IStudentFormValidation {
  validateBasicInfo(data: Partial<IStudentFormData>): ValidationResult;
  validateContactInfo(data: Partial<IStudentFormData>): ValidationResult;
  validateAcademicInfo(data: Partial<IStudentFormData>): ValidationResult;
}

export interface IStudentImageHandler {
  handleImageUpload(file: File): Promise<string>;
  validateImage(file: File): ValidationResult;
  getImagePreview(file: File): string;
}

export interface IStudentFormManager {
  resetForm(): void;
  setFieldValue(field: keyof IStudentFormData, value: any): void;
  getFieldValue(field: keyof IStudentFormData): any;
  validateForm(): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Religion {
  ISLAM = 'ISLAM',
  CHRISTIANITY = 'CHRISTIANITY',
  OTHER = 'OTHER'
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}

export enum EnrollmentType {
  REGULAR = 'REGULAR',
  PART_TIME = 'PART_TIME'
}

export enum ProgramType {
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
  YEARLY = 'YEARLY'
}

export enum TraineeStatus {
  NEW = 'NEW',
  CONTINUING = 'CONTINUING',
  GRADUATED = 'GRADUATED'
}

export enum ClassLevel {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH'
}
