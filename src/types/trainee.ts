// Enums
export enum AccountType {
  STAFF = 'STAFF',
  INSTRUCTOR = 'INSTRUCTOR'
}

export enum EnrollmentType {
  REGULAR = 'REGULAR',
  DISTANCE = 'DISTANCE',
  BOTH = 'BOTH'
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}

export enum ProgramType {
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
  ANNUAL = 'ANNUAL'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Religion {
  ISLAM = 'ISLAM',
  CHRISTIANITY = 'CHRISTIANITY',
  JUDAISM = 'JUDAISM'
}

export enum EducationType {
  PREPARATORY = 'PREPARATORY',
  INDUSTRIAL_SECONDARY = 'INDUSTRIAL_SECONDARY',
  COMMERCIAL_SECONDARY = 'COMMERCIAL_SECONDARY',
  AGRICULTURAL_SECONDARY = 'AGRICULTURAL_SECONDARY',
  AZHAR_SECONDARY = 'AZHAR_SECONDARY',
  GENERAL_SECONDARY = 'GENERAL_SECONDARY',
  UNIVERSITY = 'UNIVERSITY',
  INDUSTRIAL_APPRENTICESHIP = 'INDUSTRIAL_APPRENTICESHIP'
}

export enum TraineeStatus {
  NEW = 'NEW',
  CURRENT = 'CURRENT',
  GRADUATE = 'GRADUATE',
  WITHDRAWN = 'WITHDRAWN'
}

export enum Year {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH'
}

export enum SessionType {
  THEORY = 'THEORY',
  PRACTICAL = 'PRACTICAL'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export enum FeeType {
  TUITION = 'TUITION',
  SERVICES = 'SERVICES',
  TRAINING = 'TRAINING',
  ADDITIONAL = 'ADDITIONAL'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  CANCELLED = 'CANCELLED'
}

export enum DocumentType {
  PERSONAL_PHOTO = 'PERSONAL_PHOTO',
  ID_CARD_FRONT = 'ID_CARD_FRONT',
  ID_CARD_BACK = 'ID_CARD_BACK',
  QUALIFICATION_FRONT = 'QUALIFICATION_FRONT',
  QUALIFICATION_BACK = 'QUALIFICATION_BACK',
  EXPERIENCE_CERT = 'EXPERIENCE_CERT',
  MINISTRY_CERT = 'MINISTRY_CERT',
  PROFESSION_CARD = 'PROFESSION_CARD',
  SKILL_CERT = 'SKILL_CERT'
}

// Main Interfaces
export interface TrainingProgram {
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  description?: string;
  numberOfClassrooms: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingContent {
  id: number;
  code: string;
  name: string;
  programId: number;
  classroomId: number;
  instructorId: string;
  theorySessionsPerWeek: number;
  practicalSessionsPerWeek: number;
  chaptersCount: number;
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: number;
  title: string;
  type: SessionType;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  chapter: number;
  notes?: string;
  contentId: number;
  createdAt: Date;
  updatedAt: Date;
  content: TrainingContent;
}

export interface AttendanceRecord {
  id: number;
  sessionId: number;
  traineeId: number;
  status: AttendanceStatus;
  arrivalTime?: Date;
  notes?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  session: Session;
}

export interface TraineeFee {
  id: number;
  name: string;
  amount: number;
  type: FeeType;
  academicYear: string;
  allowMultipleApply: boolean;
  programId: number;
  safeId: string;
  isApplied: boolean;
  appliedAt?: Date;
  appliedById?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TraineePayment {
  id: number;
  amount: number;
  status: PaymentStatus;
  feeId: number;
  traineeId: number;
  safeId: string;
  paidAmount: number;
  paidAt?: Date;
  paidById?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  fee: TraineeFee;
}

export interface TraineeDocument {
  id: string;
  traineeId: number;
  documentType: DocumentType;
  fileName: string;
  filePath: string;
  cloudinaryId?: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: Date;
  uploadedById: string;
  notes?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedById?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trainee {
  id: number;
  nameAr: string;
  nameEn: string;
  enrollmentType: EnrollmentType;
  maritalStatus: MaritalStatus;
  nationalId: string;
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
  whatsapp?: string;
  facebook?: string;
  educationType: EducationType;
  schoolName: string;
  graduationDate: Date;
  totalGrade?: number;
  gradePercentage?: number;
  sportsActivity?: string;
  culturalActivity?: string;
  educationalActivity?: string;
  notes?: string;
  traineeStatus: TraineeStatus;
  classLevel: Year;
  academicYear?: string;
  createdAt: Date;
  updatedAt: Date;
  program: TrainingProgram;
  attendanceRecords: AttendanceRecord[];
  traineePayments: TraineePayment[];
  documents: TraineeDocument[];
}

export interface TraineeAuth {
  id: string;
  nationalId: string;
  birthDate: Date;
  isActive: boolean;
  lastLoginAt?: Date;
  traineeId: number;
  createdAt: Date;
  updatedAt: Date;
  trainee: Trainee;
}

// Main Response Interface
export interface TraineeProfileResponse {
  id: string;
  nationalId: string;
  birthDate: Date;
  isActive: boolean;
  lastLoginAt?: Date;
  traineeId: number;
  createdAt: Date;
  updatedAt: Date;
  trainee: Trainee;
}
