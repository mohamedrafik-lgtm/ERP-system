// Single Responsibility Principle - مسؤولية واحدة: معالجة صور الطلاب
import { IStudentImageHandler, ValidationResult } from '@/types/student.types';

export class StudentImageHandler implements IStudentImageHandler {
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  private readonly maxDimensions = { width: 2000, height: 2000 };

  async handleImageUpload(file: File): Promise<string> {
    const validation = this.validateImage(file);
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      
      reader.onerror = () => {
        reject(new Error('فشل في قراءة الملف'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  validateImage(file: File): ValidationResult {
    const errors: Record<string, string> = {};

    if (!file) {
      errors.file = 'الملف مطلوب';
      return { isValid: false, errors };
    }

    if (!this.allowedTypes.includes(file.type)) {
      errors.type = 'نوع الملف غير مدعوم. يرجى اختيار صورة JPG أو PNG';
    }

    if (file.size > this.maxFileSize) {
      errors.size = 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  getImagePreview(file: File): string {
    if (!file) return '';
    
    return URL.createObjectURL(file);
  }

  async resizeImage(file: File, maxWidth: number = 800, maxHeight: number = 800): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // حساب الأبعاد الجديدة مع الحفاظ على النسبة
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error('فشل في تغيير حجم الصورة'));
          }
        }, file.type, 0.8);
      };

      img.onerror = () => reject(new Error('فشل في تحميل الصورة'));
      img.src = URL.createObjectURL(file);
    });
  }

  async compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('فشل في ضغط الصورة'));
          }
        }, file.type, quality);
      };

      img.onerror = () => reject(new Error('فشل في تحميل الصورة'));
      img.src = URL.createObjectURL(file);
    });
  }
}
