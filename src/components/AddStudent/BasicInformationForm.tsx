"use client";

import { memo, useCallback } from 'react';
import { IStudentFormData, Gender, Religion, MaritalStatus } from '@/types/student.types';
import FormField from './FormField';
import InputDate from './RenderInputs/InputDate';
import SelectWithTransition from './Menu';

interface BasicInformationFormProps {
  formData: Partial<IStudentFormData>;
  errors: Record<string, string>;
  onFieldChange: (field: keyof IStudentFormData, value: any) => void;
  onImageUpload: (file: File) => void;
}

const BasicInformationForm = memo(({
  formData,
  errors,
  onFieldChange,
  onImageUpload
}: BasicInformationFormProps) => {
  const handleInputChange = useCallback((field: keyof IStudentFormData) => 
    (value: any) => onFieldChange(field, value), [onFieldChange]
  );

  const genderOptions = [
    { value: Gender.MALE, label: 'ذكر' },
    { value: Gender.FEMALE, label: 'أنثى' }
  ];

  const religionOptions = [
    { value: Religion.ISLAM, label: 'الإسلام' },
    { value: Religion.CHRISTIANITY, label: 'المسيحية' },
    { value: Religion.OTHER, label: 'أخرى' }
  ];

  const maritalStatusOptions = [
    { value: MaritalStatus.SINGLE, label: 'أعزب/عزباء' },
    { value: MaritalStatus.MARRIED, label: 'متزوج/متزوجة' },
    { value: MaritalStatus.DIVORCED, label: 'مطلق/مطلقة' },
    { value: MaritalStatus.WIDOWED, label: 'أرمل/أرملة' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">المعلومات الأساسية</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="الاسم بالعربية"
          error={errors.nameAr}
          required
        >
          <input
            type="text"
            value={formData.nameAr || ''}
            onChange={(e) => handleInputChange('nameAr')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل الاسم بالعربية"
          />
        </FormField>

        <FormField
          label="الاسم بالإنجليزية"
          error={errors.nameEn}
          required
        >
          <input
            type="text"
            value={formData.nameEn || ''}
            onChange={(e) => handleInputChange('nameEn')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter name in English"
          />
        </FormField>

        <FormField
          label="رقم الهوية الوطنية"
          error={errors.nationalId}
          required
        >
          <input
            type="text"
            value={formData.nationalId || ''}
            onChange={(e) => handleInputChange('nationalId')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="14 رقم"
            maxLength={14}
          />
        </FormField>

        <FormField
          label="تاريخ الميلاد"
          error={errors.birthDate}
          required
        >
          <InputDate
            value={formData.birthDate || ''}
            onChange={handleInputChange('birthDate')}
          />
        </FormField>

        <FormField
          label="الجنس"
          error={errors.gender}
          required
        >
          <SelectWithTransition
            options={genderOptions}
            value={formData.gender || ''}
            onChange={handleInputChange('gender')}
          />
        </FormField>

        <FormField
          label="الدين"
          error={errors.religion}
          required
        >
          <SelectWithTransition
            options={religionOptions}
            value={formData.religion || ''}
            onChange={handleInputChange('religion')}
          />
        </FormField>

        <FormField
          label="الحالة الاجتماعية"
          error={errors.maritalStatus}
          required
        >
          <SelectWithTransition
            options={maritalStatusOptions}
            value={formData.maritalStatus || ''}
            onChange={handleInputChange('maritalStatus')}
          />
        </FormField>
      </div>
    </div>
  );
});

BasicInformationForm.displayName = 'BasicInformationForm';

export default BasicInformationForm;
