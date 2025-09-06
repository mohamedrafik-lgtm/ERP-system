// Single Responsibility Principle - مسؤولية واحدة: التحقق من صحة بيانات الطالب
import { IStudentFormValidation, IStudentFormData, ValidationResult, Gender, Religion, MaritalStatus, EnrollmentType, ProgramType, TraineeStatus, ClassLevel } from '@/types/student.types';

export class StudentFormValidator implements IStudentFormValidation {
  validateBasicInfo(data: Partial<IStudentFormData>): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.nameAr?.trim()) {
      errors.nameAr = 'الاسم بالعربية مطلوب';
    }

    if (!data.nameEn?.trim()) {
      errors.nameEn = 'الاسم بالإنجليزية مطلوب';
    }

    if (!data.nationalId?.trim()) {
      errors.nationalId = 'رقم الهوية الوطنية مطلوب';
    } else if (!this.isValidNationalId(data.nationalId)) {
      errors.nationalId = 'رقم الهوية الوطنية غير صحيح';
    }

    if (!data.birthDate) {
      errors.birthDate = 'تاريخ الميلاد مطلوب';
    } else if (!this.isValidDate(data.birthDate)) {
      errors.birthDate = 'تاريخ الميلاد غير صحيح';
    }

    if (!data.gender || !Object.values(Gender).includes(data.gender)) {
      errors.gender = 'الجنس مطلوب';
    }

    if (!data.religion || !Object.values(Religion).includes(data.religion)) {
      errors.religion = 'الدين مطلوب';
    }

    if (!data.maritalStatus || !Object.values(MaritalStatus).includes(data.maritalStatus)) {
      errors.maritalStatus = 'الحالة الاجتماعية مطلوبة';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validateContactInfo(data: Partial<IStudentFormData>): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.phone?.trim()) {
      errors.phone = 'رقم الهاتف مطلوب';
    } else if (!this.isValidPhone(data.phone)) {
      errors.phone = 'رقم الهاتف غير صحيح';
    }

    if (data.email && !this.isValidEmail(data.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!data.address?.trim()) {
      errors.address = 'العنوان مطلوب';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validateAcademicInfo(data: Partial<IStudentFormData>): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.enrollmentType || !Object.values(EnrollmentType).includes(data.enrollmentType)) {
      errors.enrollmentType = 'نوع التسجيل مطلوب';
    }

    if (!data.programType || !Object.values(ProgramType).includes(data.programType)) {
      errors.programType = 'نوع البرنامج مطلوب';
    }

    if (!data.traineeStatus || !Object.values(TraineeStatus).includes(data.traineeStatus)) {
      errors.traineeStatus = 'حالة المتدرب مطلوبة';
    }

    if (!data.classLevel || !Object.values(ClassLevel).includes(data.classLevel)) {
      errors.classLevel = 'المستوى الدراسي مطلوب';
    }

    if (!data.programId) {
      errors.programId = 'البرنامج مطلوب';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private isValidNationalId(nationalId: string): boolean {
    // التحقق من صحة رقم الهوية الوطنية (14 رقم)
    return /^\d{14}$/.test(nationalId);
  }

  private isValidPhone(phone: string): boolean {
    // التحقق من صحة رقم الهاتف المصري
    return /^(01[0-9]{9})$/.test(phone);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
