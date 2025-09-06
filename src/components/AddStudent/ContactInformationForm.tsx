"use client";

import { memo, useCallback } from 'react';
import { IStudentFormData } from '@/types/student.types';
import FormField from './FormField';

interface ContactInformationFormProps {
  formData: Partial<IStudentFormData>;
  errors: Record<string, string>;
  onFieldChange: (field: keyof IStudentFormData, value: any) => void;
}

const ContactInformationForm = memo(({
  formData,
  errors,
  onFieldChange
}: ContactInformationFormProps) => {
  const handleInputChange = useCallback((field: keyof IStudentFormData) => 
    (value: any) => onFieldChange(field, value), [onFieldChange]
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات الاتصال</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="رقم الهاتف"
          error={errors.phone}
          required
        >
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="01xxxxxxxxx"
            maxLength={11}
          />
        </FormField>

        <FormField
          label="البريد الإلكتروني"
          error={errors.email}
        >
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@email.com"
          />
        </FormField>

        <div className="md:col-span-2">
          <FormField
            label="العنوان"
            error={errors.address}
            required
          >
            <textarea
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address')(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل العنوان الكامل"
              rows={3}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});

ContactInformationForm.displayName = 'ContactInformationForm';

export default ContactInformationForm;
