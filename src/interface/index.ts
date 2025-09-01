import React, { ReactNode } from "react";

export interface IAddStudent {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  id: string;
  options?: { value: string | number; label: string }[];
}

export interface FilterButtonProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    url: string;
    name: string;
    className?: string;
}
export type IFormValues = {
  // id:number;
  // BasicDataInput
  nameArabic: string;
  nameEnglish: string;
  admissionSystem: string;
  maritalState: string;
  marketer: string;
  nationalId: string;
  releaseDate: string;
  expirationDate: string;
  programType: string;
  gender: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  religion: string;
  program: string;
  
  // صورة الطالب
  photoUrl?: string | null;

  // ContactInformationInput
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

  // EducationData
  TypeOfEducation: string;
  School_Center_Name: string;
  DateOfObtainingTheQualification: string;
  HighSchoolTotal: string;
  HighSchoolPercentage: string;

  // AdditionalData
  SportsActivity?: string | null;
  CulturalAndArtisticActivity?: string | null;
  ScientificActivity?: string | null;
  comments?: string | null;
}



export type  BasicData = 
'nameEnglish'|
'nameArabic'|
'admission_system'|
   'marital_state'|
   "markter"|
    'national_id'|
    'release_date'|
    'exprtation_date'|
    'program_type'|
    'gender'|
    'nationalty'|
    'dateOf_Birth'|
    'placeOfBirth'|
    'Religion'|
    'program'



// export type BasicDataFormValues  ={
//   admission_system: string;
//   fullName: string;
//   marital_state: string;
//   markter: string;
//   national_id: string;
//   release_date: string; // أو Date إذا كنت تحوله
//   exprtation_date: string;
//   program_type: string;
//   gender: string;
//   nationalty: string;
//   dateOf_Birth: string;
//   placeOfBirth: string;
//   Religion: string;
//   program: string;
// }
export type ContactInformationSchema = 
  'The_state'|
  'Governorate'|
  'city'|
  'address'|
  'mobileNumber'|
  'email'|
  "Parent's_mobile"|
  "Parent's_email"|
  "Guardian's_job"|
  "Relationship_with_the_guardian:"|
  "National-ID-of-the-guardian"|
  'Landline'| 
  'whatsapp'| 
  'facebook';

export type EducationDataSchema = 
  "Type-of-education"|
  "School/Center Name"|
  "Date-of-obtaining-the-qualification"|
  "High-school-total"|
  "High-school-percentage";



export type AdditionalDataSchema = 
  "Sports-activity"|
  "Cultural-and-artistic-activity"|
  "Scientific-activity"|
  'comments';



export interface EntryFormData {
  fromAccount: string;
  toAccount: string;
  date: string;
  amount: string;
  notes: string;
  file: File | null;
}

export type Account = {
  id: number;
  name: string;
  code: string;
  debit: number;
  credit: number;
  type: string;
  parentId: number | null;
  balance: number; 
  hasChildren?: boolean;
};


export interface NavItem {
  label: string;
  url?: string;
  icon: ReactNode;
  children?: NavItem[];
}

export interface IAttendanceAndDeparture{
    id:number,
    DateOfAttendance:string,
    DepartureTime:string,
    day:string
}

export interface ProgramData {
  nameAr: string;
  nameEn: string;
  price: number;
  description: string;
}

export interface Program {
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  description: string;
  _count: {
    trainees:number
  }
}
export interface UpdateProgramPayload {
  id: number; // ID من الباث
  data: {
    nameAr: string;
    nameEn: string;
    price: number;
    description: string;
  };
}
export interface IProgram {
  name: string;
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudentResponce {
  id: number;
  nameAr: string;
  nameEn: string;
  enrollmentType: string;
  maritalStatus: string;
  nationalId: string;
  idIssueDate: string;
  idExpiryDate: string;
  programType: string;
  nationality: string;
  gender: string;
  birthDate: string;
  residenceAddress: string;
  photoUrl: string;
  religion: string;
  programId: number;
  country: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianJob: string;
  guardianRelation: string;
  guardianNationalId: string;
  landline: string;
  whatsapp: string;
  facebook: string;
  educationType: string;
  schoolName: string;
  graduationDate: string;
  totalGrade: number;
  gradePercentage: number;
  sportsActivity: string;
  culturalActivity: string;
  educationalActivity: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  program:IProgram
}
export interface IRequist{
  nameAr: string;
  nameEn: string;
  enrollmentType: string;
  maritalStatus: string;
  nationalId: string;
  idIssueDate: string;
  idExpiryDate: string;
  programType: string;
  nationality: string;
  gender: string;
  birthDate: string;
  residenceAddress: string;
  photoUrl: string;
  religion: string;
  programId: number;
  country: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianJob: string;
  guardianRelation: string;
  guardianNationalId: string;
  landline: string;
  whatsapp: string;
  facebook: string;
  educationType: string;
  schoolName: string;
  graduationDate: string;
  totalGrade: number;
  gradePercentage: number;
  sportsActivity: string;
  culturalActivity: string;
  educationalActivity: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  program: string;
}

// البرنامج لما تختار اختيار يرجع id الاختيار دا عشان هستقبل الاختيارات من الباك اند 
// المسوق-المحافظه - الجيندر -enrollmentType-city-
export enum enrollmentType  {
  REGULAR= 'REGULAR',
  DISTANCE='DISTANCE',
  BOTH='BOTH',
}
export enum maritalStatus  {
  SINGLE= 'SINGLE',
  MARRIED='MARRIED',
  DIVORCED='DIVORCED',
  WIDOWED='WIDOWED',
}
//  SUMMER, WINTER, ANNUAL
export enum programType  {
  SUMMER= 'SUMMER',
  WINTER='MARRIED',
  ANNUAL='ANNUAL',
}
export enum Gender  {
  MALE= 'MALE',
  FEMALE ='FEMALE ',
}
export enum Religion{
  //  ISLAM, CHRISTIANITY, JUDAISM
  ISLAM= "ISLAM",
 CHRISTIANITY = 'CHRISTIANITY',
 JUDAISM= 'JUDAISM'
}
export enum IEducationType{
  // PREPARATORY, INDUSTRIAL_SECONDARY, COMMERCIAL_SECONDARY, AGRICULTURAL_SECONDARY, AZHAR_SECONDARY,
//  GENERAL_SECONDARY, UNIVERSITY, INDUSTRIAL_APPRENTICESHIP 
  PREPARATORY = 'PREPARATORY',
  INDUSTRIAL_SECONDARY='INDUSTRIAL_SECONDARY',
  COMMERCIAL_SECONDARY='COMMERCIAL_SECONDARY',
  AGRICULTURAL_SECONDARY='AGRICULTURAL_SECONDARY',
  AZHAR_SECONDARY='AZHAR_SECONDARY',
  GENERAL_SECONDARY='GENERAL_SECONDARY',
  UNIVERSITY='UNIVERSITY',
  INDUSTRIAL_APPRENTICESHIP='INDUSTRIAL_APPRENTICESHIP',
  SECONDARY = "SECONDARY",
}

// NEW, CURRENT, GRADUATE, WITHDRAWN
export enum ITraineeStatus{
NEW='NEW',
CURRENT='CURRENT',
GRADUATE='GRADUATE',
WITHDRAWN='WITHDRAWN',
CONTINUING = "CONTINUING"
}
export enum IClassLevel{
  FIRST='FIRST',
   SECOND='SECOND',
    THIRD='THIRD',
     FOURTH='FOURTH'
}
// length 41
export interface IStudentRequest {
  nameAr: string;
  nameEn: string;
  enrollmentType: enrollmentType;
  maritalStatus: maritalStatus;
  nationalId: string;
  idIssueDate: string; // ISO Date
  idExpiryDate: string; // ISO Date
  programType: programType;
  nationality: string;
  gender: Gender;
  birthDate: string;
  residenceAddress: string;
  photoUrl: string;
  religion: Religion;
  programId: number;
  country: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianJob: string;
  guardianRelation: string;
  guardianNationalId: string;
  landline: string;
  whatsapp: string;
  facebook: string;
  educationType: IEducationType;
  schoolName: string;
  graduationDate: string;
  totalGrade: number;
  gradePercentage: number;
  traineeStatus:ITraineeStatus;
  classLevel:IClassLevel;
}


export enum Semester {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export enum Year {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FOURTH = "FOURTH",
}

export interface ITrainingContentRequest {
  code: string;
  name: string;
  semester: Semester;
  year: Year;
  programIds?: number[];
  instructorId: string;
  theoryAttendanceRecorderId?: string;
  practicalAttendanceRecorderId?: string;
  durationMonths: number;
  theorySessionsPerWeek: number;
  practicalSessionsPerWeek: number;
  chaptersCount: number;
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
}


// add traineng contetn types


export enum ISemester{
  // semester
  FIRST = 'FIRST',
  SECOND="SECOND"
}

export interface IAddTrainengContent{
  code:string;
  name:string;
  semester:ISemester;
  year:Year;
  programIds:number[];
  instructorId:string;
  theoryAttendanceRecorderId:string;
  practicalAttendanceRecorderId:string;
  durationMonths:number;
  theorySessionsPerWeek:number;
  practicalSessionsPerWeek:number;
  chaptersCount:number;
  yearWorkMarks:number;
  practicalMarks:number;
  writtenMarks:number;
  attendanceMarks:number;
  quizzesMarks:number;
  finalExamMarks:number
}



export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface ITrainingContent {
  id: number;
  code: string;
  name: string;
  semester: Semester;
  year: Year;
  programId: number;
  programIds: number[];
  instructorId: string;
  instructor: IUser;
  theoryAttendanceRecorderId: string;
  theoryAttendanceRecorder: IUser;
  practicalAttendanceRecorderId: string;
  practicalAttendanceRecorder: IUser;
  durationMonths: number;
  theorySessionsPerWeek: number;
  practicalSessionsPerWeek: number;
  chaptersCount: number;
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
  _count: {
      questions: number
    }
}


export enum IType {
   MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
   TRUE_FALSE = 'TRUE_FALSE'
}

export enum ISkill {
   RECALL = 'RECALL',
   COMPREHENSION = 'COMPREHENSION',
   DEDUCTION = 'DEDUCTION'
}

export enum IDifficulty {
   EASY = 'EASY',
   MEDIUM = 'MEDIUM',
   HARD = 'HARD',
   VERY_HARD = 'VERY_HARD'
}

export interface IOptions{
  text:string;
  isCorrect:boolean
}

export interface IAddQuestions{
  text:string;
  type: IType;
  skill:ISkill;
  difficulty:IDifficulty;
  chapter:number;
  contentId:number;
  options:IOptions[]
}

export interface IQuestionsResponce extends  IAddQuestions{
  id:number;
  createdById:string;
  createdAt:string
}


export enum ITypeLecture{
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  BOTH = 'BOTH'
}
export interface ILecture{
  title:string;
  description:string;
  // نوع المحاضره (فيديو - PDF - BOTH)
  type:ITypeLecture;
  chapter:number;
  youtubeUrl:string;
  pdfFile:string;
  // (order) هي رقم ترتيب المحاضره
  order:number;
  contentId:number; //id الماده ادراسيه
}
export interface IResponseLecture extends ILecture{
  id:number
}


export interface IUpdateTrainingContentRequest {
  code: string;
  name: string;
  semester: Semester;
  year: Year;
  programIds: number[];
  instructorId: string;
  theoryAttendanceRecorderId: string;
  practicalAttendanceRecorderId: string;
  durationMonths: number;
  theorySessionsPerWeek: number;
  practicalSessionsPerWeek: number;
  chaptersCount: number;
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
}

export interface CreateMarketerDto {
  name: string;          
  primaryPhone: string;  
  secondaryPhone?: string; 
  photoUrl?: string;
}


export interface Marketer {
  id: number;
  name: string;
  primaryPhone: string;
  secondaryPhone?: string | null;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}


export enum ICurrency{
  EGP = 'EGP',
  USD = 'USD',
  EUR = 'EUR',
  SAR = 'SAR'
}
export interface ILocker{
  name:string;
  description:string;
  balance:number;
  currency:ICurrency;
  isActive:boolean
}

export type TransactionType =
  | 'DEPOSIT'
  | 'WITHDRAW'
  | 'TRANSFER'
  | 'FEE'
  | 'PAYMENT';

export type AccountType = 'REVENUE' | 'EXPENSE' | 'DEBT';

export interface Transaction {
  id: string; // معرف التحويل
  amount: number; // قيمة التحويل
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'FEE' | 'PAYMENT'; // نوع التحويل
  description?: string; // وصف التحويل (اختياري)
  reference?: string; // رقم مرجعي (اختياري)
  sourceId?: string; // الحساب المصدر (للسحب والتحويل)
  targetId?: string; // الحساب الهدف (للإيداع والتحويل)
  traineeFeeId?: number; // معرف رسوم المتدربين (اختياري)
  traineePaymentId?: number; // معرف مدفوعات المتدربين (اختياري)
  createdById?: string; // المستخدم الذي أنشأ التحويل (اختياري)
  createdAt: Date; // تاريخ الإنشاء
  updatedAt: Date; // تاريخ التحديث
}

export interface FinancialAccount {
  id: string;
  name: string;
  description: string | null;
  type: AccountType;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  sourceTransactions: Transaction[];
  targetTransactions: Transaction[];
}

export enum ITransactionType {
  DEPOSIT = 'DEPOSIT',   // إيداع
  WITHDRAW = 'WITHDRAW', // سحب
  TRANSFER = 'TRANSFER', // تحويل بين حسابين
  FEE = 'FEE',           // رسوم متدربين
  PAYMENT = 'PAYMENT',   // دفع رسوم
}

export interface ITransactions{
   amount : number;
   type : ITransactionType;
   description : string;
   reference :string;
   sourceId : string;
   targetId : string;
}

export enum IFeesType{
  TUITION = 'TUITION',
  SERVICES = 'SERVICES',
  TRAIN = 'TRAIN',
  ING = 'ING',
  ADDITIONAL = 'ADDITIONAL',
}
export interface ITraineeFees{
  name: string;
  amount: number;
  type: IFeesType;
  academicYear: string;
  allowMultipleApply: boolean;
  programId: number;
  safeId: string;
}

export enum ITraineeFeeType{
  TUITION = "TUITION",
  SERVICES = 'SERVICES',
  TRAINING = 'TRAINING',
  ADDITIONAL = 'ADDITIONAL'
}
export interface ITraineeFeeWithRelations {
  id: number;
  name: string;
  amount: number;
  type: ITraineeFeeType;
  academicYear: string;
  allowMultipleApply: boolean;
  programId: number;
  safeId: string;
  isApplied: boolean;
  appliedAt: string | null;
  appliedById: string | null;
  createdAt: string;
  updatedAt: string;
  program: {
    id: number;
    nameAr: string;
    // ممكن تضيف باقي خصائص البرنامج هنا لو عندك
  };
  safe: {
    id: string;
    name: string;
    balance: number;
    currency: string;
    // ممكن تضيف باقي خصائص الخزنة هنا لو عندك
  };
}


// {
//   "feeId": 0,
//   "traineeId": 0,
//   "amount": 0,
//   "safeId": "string",
//   "notes": "string"
// }

export interface IPayTrainerFee{
  feeId : number;
  traineeId : number;
  amount : number;
  safeId : string;
  notes : string;
}

export interface CreateTransaction {
  amount: number; // قيمة المعاملة (مطلوبة)
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'FEE' | 'PAYMENT'; // نوع المعاملة (مطلوبة)
  description?: string; // وصف المعاملة (اختياري)
  sourceId?: string; // معرف الخزينة المصدر (اختياري - مطلوب في حالات السحب أو التحويل)
  targetId?: string; // معرف الخزينة الهدف (اختياري - مطلوب في حالات الإيداع أو التحويل)
}