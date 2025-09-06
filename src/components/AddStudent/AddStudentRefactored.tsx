"use client";

import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from '@/Schema/AddStudent';
import { IStudentFormData } from '@/types/student.types';
import { useAddTraineeMutation } from '@/lip/features/trainees/traineesApi';
import toast from 'react-hot-toast';

// Services - Dependency Injection (DIP)
import { StudentFormManager } from '@/services/StudentFormManager';
import { StudentImageHandler } from '@/services/StudentImageHandler';
import { StudentFormValidator } from '@/services/StudentFormValidator';

// Components - Single Responsibility
import BasicInformationForm from './BasicInformationForm';
import ContactInformationForm from './ContactInformationForm';
import AcademicInformationForm from './AcademicInformationForm';
import StudentImageUpload from './StudentImageUpload';
import { Card } from './Card';

// Open/Closed Principle - يمكن إضافة أنواع تحقق جديدة
import { QuickValidationStrategy, StrictValidationStrategy } from '@/services/StudentFormManager';

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

export default function AddStudentRefactored() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dependency Injection - DIP
  const formManager = useMemo(() => new StudentFormManager(), []);
  const imageHandler = useMemo(() => new StudentImageHandler(), []);
  const validator = useMemo(() => new StudentFormValidator(), []);

  // Redux mutation
  const [addTrainee, { isLoading }] = useAddTraineeMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IStudentFormData>({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      enrollmentType: 'REGULAR' as any,
      maritalStatus: 'SINGLE' as any,
      programType: 'SUMMER' as any,
      gender: 'MALE' as any,
      religion: 'ISLAM' as any,
      traineeStatus: 'NEW' as any,
      classLevel: 'FIRST' as any,
      photoUrl: '',
    },
  });

  // Form data from hook form
  const formData = watch();

  // Callbacks for performance
  const handleFieldChange = useCallback((field: keyof IStudentFormData, value: any) => {
    setValue(field, value);
    formManager.setFieldValue(field, value);
  }, [setValue, formManager]);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const imageUrl = await imageHandler.handleImageUpload(file);
      handleFieldChange('photoUrl', imageUrl);
      toast.success('تم رفع الصورة بنجاح');
    } catch (error: any) {
      toast.error(error.message || 'فشل في رفع الصورة');
    }
  }, [imageHandler, handleFieldChange]);

  const handleNextStep = useCallback(() => {
    // Validation using injected validator
    const validation = formManager.validateSpecificSection(
      currentStep === 1 ? 'basic' : currentStep === 2 ? 'contact' : 'academic'
    );
    
    if (validation.isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      // Show first error
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError);
    }
  }, [currentStep, formManager]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const onSubmit = useCallback(async (data: IStudentFormData) => {
    setIsSubmitting(true);
    
    try {
      // Final validation using strict strategy
      const strictValidator = new StrictValidationStrategy();
      const validation = strictValidator.validate(data);
      
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        toast.error(firstError);
        return;
      }

      // Submit data
      await addTrainee(data).unwrap();
      toast.success('تم إضافة الطالب بنجاح');
      reset();
      setCurrentStep(1);
    } catch (error: any) {
      toast.error(error?.data?.message || 'حدث خطأ في إضافة الطالب');
    } finally {
      setIsSubmitting(false);
    }
  }, [addTrainee, reset]);

  const handleReset = useCallback(() => {
    reset();
    formManager.resetForm();
    setCurrentStep(1);
  }, [reset, formManager]);

  // Memoized components for performance
  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationForm
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
            onImageUpload={handleImageUpload}
          />
        );
      case 2:
        return (
          <ContactInformationForm
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
      case 3:
        return (
          <AcademicInformationForm
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
      default:
        return null;
    }
  }, [currentStep, formData, errors, handleFieldChange, handleImageUpload]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إضافة طالب جديد</h1>
          <p className="text-gray-600">أدخل بيانات الطالب في الخطوات التالية</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              الخطوة {currentStep} من 3
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            {stepContent}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              السابق
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                إعادة تعيين
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting || isLoading ? 'جاري الحفظ...' : 'حفظ الطالب'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
