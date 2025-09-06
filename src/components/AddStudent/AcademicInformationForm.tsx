"use client";

import { memo, useCallback } from 'react';
import { IStudentFormData, EnrollmentType, ProgramType, TraineeStatus, ClassLevel } from '@/types/student.types';
import FormField from './FormField';
import SelectWithTransition from './Menu';
import ProgramSelect from '@/components/Program/SelectProgram';

interface AcademicInformationFormProps {
  formData: Partial<IStudentFormData>;
  errors: Record<string, string>;
  onFieldChange: (field: keyof IStudentFormData, value: any) => void;
}

const AcademicInformationForm = memo(({
  formData,
  errors,
  onFieldChange
}: AcademicInformationFormProps) => {
  const handleInputChange = useCallback((field: keyof IStudentFormData) => 
    (value: any) => onFieldChange(field, value), [onFieldChange]
  );

  const enrollmentTypeOptions = [
    { value: EnrollmentType.REGULAR, label: 'انتظام' },
    { value: EnrollmentType.PART_TIME, label: 'انتساب' }
  ];

  const programTypeOptions = [
    { value: ProgramType.SUMMER, label: 'صيفي' },
    { value: ProgramType.WINTER, label: 'شتوي' },
    { value: ProgramType.YEARLY, label: 'سنوي' }
  ];

  const traineeStatusOptions = [
    { value: TraineeStatus.NEW, label: 'جديد' },
    { value: TraineeStatus.CONTINUING, label: 'مستمر' },
    { value: TraineeStatus.GRADUATED, label: 'خريج' }
  ];

  const classLevelOptions = [
    { value: ClassLevel.FIRST, label: 'الأول' },
    { value: ClassLevel.SECOND, label: 'الثاني' },
    { value: ClassLevel.THIRD, label: 'الثالث' },
    { value: ClassLevel.FOURTH, label: 'الرابع' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">المعلومات الأكاديمية</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="نوع التسجيل"
          error={errors.enrollmentType}
          required
        >
          <SelectWithTransition
            label="نوع التسجيل"
            options={enrollmentTypeOptions}
            value={formData.enrollmentType || ''}
            onChange={handleInputChange('enrollmentType')}
          />
        </FormField>

        <FormField
          label="نوع البرنامج"
          error={errors.programType}
          required
        >
          <SelectWithTransition
            label="نوع البرنامج"
            options={programTypeOptions}
            value={formData.programType || ''}
            onChange={handleInputChange('programType')}
          />
        </FormField>

        <FormField
          label="حالة المتدرب"
          error={errors.traineeStatus}
          required
        >
          <SelectWithTransition
            label="حالة المتدرب"
            options={traineeStatusOptions}
            value={formData.traineeStatus || ''}
            onChange={handleInputChange('traineeStatus')}
          />
        </FormField>

        <FormField
          label="المستوى الدراسي"
          error={errors.classLevel}
          required
        >
          <SelectWithTransition
            label="المستوى الدراسي"
            options={classLevelOptions}
            value={formData.classLevel || ''}
            onChange={handleInputChange('classLevel')}
          />
        </FormField>

        <div className="md:col-span-2">
          <FormField
            label="البرنامج"
            error={errors.programId}
            required
          >
            <ProgramSelect
              value={formData.programId || 0}
              onChange={handleInputChange('programId')}
              label="اختر البرنامج"
              programs={[]}
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField
            label="ملاحظات إضافية"
            error={errors.notes}
          >
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes')(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أضف أي ملاحظات إضافية"
              rows={3}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});

AcademicInformationForm.displayName = 'AcademicInformationForm';

export default AcademicInformationForm;
