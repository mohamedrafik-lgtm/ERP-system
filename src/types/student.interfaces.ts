// Interface Segregation Principle - تقسيم interfaces كبيرة
import { ReactNode } from "react";

// Basic Student Information
export interface IStudentBasicInfo {
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
  photoUrl?: string | null;
}

// Contact Information
export interface IStudentContactInfo {
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
  Landline?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
}

// Education Information
export interface IStudentEducationInfo {
  TypeOfEducation: string;
  School_Center_Name: string;
  DateOfObtainingTheQualification: string;
  HighSchoolTotal: string;
  HighSchoolPercentage: string;
}

// Additional Information
export interface IStudentAdditionalInfo {
  SportsActivity?: string | null;
  CulturalAndArtisticActivity?: string | null;
  ScientificActivity?: string | null;
  comments?: string | null;
}

// Complete Student Data
export interface IStudentCompleteData extends 
  IStudentBasicInfo, 
  IStudentContactInfo, 
  IStudentEducationInfo, 
  IStudentAdditionalInfo {}

// Form Input Interfaces
export interface IFormInput {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  id: string;
  options?: { value: string | number; label: string }[];
}

export interface IFormFieldProps {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  children: ReactNode;
}

// Student Request for API
export interface IStudentRequest extends IStudentCompleteData {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Student Response from API
export interface IStudentResponse extends IStudentRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Student List Item (for tables)
export interface IStudentListItem {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nationalId: string;
  mobileNumber: string;
  program: string;
  status: string;
  createdAt: string;
}

// Student Search/Filter
export interface IStudentSearchFilters {
  name?: string;
  nationalId?: string;
  program?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Student Statistics
export interface IStudentStatistics {
  total: number;
  active: number;
  inactive: number;
  graduated: number;
  byProgram: Record<string, number>;
  byGender: Record<string, number>;
}
