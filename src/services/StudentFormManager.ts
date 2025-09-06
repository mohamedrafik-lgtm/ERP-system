// Single Responsibility Principle - مسؤولية واحدة: إدارة نموذج الطالب
import { IStudentFormManager, IStudentFormData, ValidationResult } from '@/types/student.types';
import { StudentFormValidator } from './StudentFormValidator';

export class StudentFormManager implements IStudentFormManager {
  private formData: Partial<IStudentFormData> = {};
  private validator: StudentFormValidator;

  constructor() {
    this.validator = new StudentFormValidator();
  }

  resetForm(): void {
    this.formData = {};
  }

  setFieldValue(field: keyof IStudentFormData, value: any): void {
    this.formData = {
      ...this.formData,
      [field]: value
    };
  }

  getFieldValue(field: keyof IStudentFormData): any {
    return this.formData[field];
  }

  getAllFormData(): Partial<IStudentFormData> {
    return { ...this.formData };
  }

  validateForm(): ValidationResult {
    const basicValidation = this.validator.validateBasicInfo(this.formData);
    const contactValidation = this.validator.validateContactInfo(this.formData);
    const academicValidation = this.validator.validateAcademicInfo(this.formData);

    const allErrors = {
      ...basicValidation.errors,
      ...contactValidation.errors,
      ...academicValidation.errors
    };

    return {
      isValid: Object.keys(allErrors).length === 0,
      errors: allErrors
    };
  }

  // Open/Closed Principle - يمكن إضافة أنواع تحقق جديدة دون تعديل الكود
  validateSpecificSection(section: 'basic' | 'contact' | 'academic'): ValidationResult {
    switch (section) {
      case 'basic':
        return this.validator.validateBasicInfo(this.formData);
      case 'contact':
        return this.validator.validateContactInfo(this.formData);
      case 'academic':
        return this.validator.validateAcademicInfo(this.formData);
      default:
        return { isValid: true, errors: {} };
    }
  }

  // Dependency Inversion Principle - يمكن استبدال الـ validator
  setValidator(validator: StudentFormValidator): void {
    this.validator = validator;
  }

  // Utility methods
  hasField(field: keyof IStudentFormData): boolean {
    return field in this.formData && this.formData[field] !== undefined;
  }

  isEmpty(): boolean {
    return Object.keys(this.formData).length === 0;
  }

  getFieldCount(): number {
    return Object.keys(this.formData).length;
  }

  // Strategy Pattern for different validation strategies
  validateWithStrategy(strategy: ValidationStrategy): ValidationResult {
    return strategy.validate(this.formData);
  }
}

// Strategy Pattern implementation
export interface ValidationStrategy {
  validate(data: Partial<IStudentFormData>): ValidationResult;
}

export class QuickValidationStrategy implements ValidationStrategy {
  validate(data: Partial<IStudentFormData>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.nameAr?.trim()) errors.nameAr = 'الاسم بالعربية مطلوب';
    if (!data.nationalId?.trim()) errors.nationalId = 'رقم الهوية مطلوب';
    if (!data.phone?.trim()) errors.phone = 'رقم الهاتف مطلوب';
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export class StrictValidationStrategy implements ValidationStrategy {
  private validator = new StudentFormValidator();

  validate(data: Partial<IStudentFormData>): ValidationResult {
    const basicValidation = this.validator.validateBasicInfo(data);
    const contactValidation = this.validator.validateContactInfo(data);
    const academicValidation = this.validator.validateAcademicInfo(data);

    const allErrors = {
      ...basicValidation.errors,
      ...contactValidation.errors,
      ...academicValidation.errors
    };

    return {
      isValid: Object.keys(allErrors).length === 0,
      errors: allErrors
    };
  }
}
