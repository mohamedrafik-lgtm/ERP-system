import React from "react";

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
export  type IFormValues = {
  // BasicDataInput
  nameArabic: string;
  nameEnglish: string;
  admission_system: string;
  marital_state: string;
  markter: string;
  national_id: string;
  release_date: string;
  exprtation_date: string;
  program_type: string;
  gender: string;
  nationalty: string;
  dateOf_Birth: string;
  placeOfBirth: string;
  Religion: string;
  program: string;

  // ContactInformationInput
  The_state: string;
  Governorate: string;
  city: string;
  address: string;
  mobileNumber: string;
  email: string;
  "Parent's_mobile": string;
  "Parent's_email": string;
  "Guardian's_job": string;
  "Relationship_with_the_guardian:": string;
  "National-ID-of-the-guardian": string;
  Landline: string;
  whatsapp: string;
  facebook: string;

  // EducationData
  "Type-of-education": string;
  "School/Center Name": string;
  "Date-of-obtaining-the-qualification": string;
  "High-school-total": string;
  "High-school-percentage": string;

  // AdditionalData
  "Sports-activity": string;
  "Cultural-and-artistic-activity": string;
  "Scientific-activity": string;
  comments: string;
};


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