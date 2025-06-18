import React, { ReactNode } from "react";

export interface IAddStudent {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  id: string;
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