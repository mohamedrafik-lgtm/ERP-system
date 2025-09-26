import { useAddTraineeDocumentMutation } from '@/lip/features/trainees/traineesApi';

export interface DocumentUploadData {
  documentType: 'PERSONAL_PHOTO' | 'ID_CARD_FRONT' | 'ID_CARD_BACK' | 'QUALIFICATION_FRONT' | 'QUALIFICATION_BACK' | 'EXPERIENCE_CERT' | 'MINISTRY_CERT' | 'PROFESSION_CARD' | 'SKILL_CERT';
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  notes?: string;
}

export interface FileUploadResult {
  success: boolean;
  message: string;
  document?: any;
  error?: string;
}

export class DocumentUploadService {
  /**
   * تحويل الملف إلى base64
   */
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // إزالة prefix "data:image/jpeg;base64," أو ما شابه
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * رفع ملف إلى الخادم
   */
  static async uploadFile(file: File): Promise<{ filePath: string; fileName: string }> {
    try {
      // في التطبيق الحقيقي، ستحتاج لرفع الملف إلى خادم الملفات أولاً
      // هنا سنحاكي العملية بإرجاع مسار مؤقت
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `/uploads/documents/${fileName}`;
      
      // محاكاة رفع الملف (في التطبيق الحقيقي، استخدم FormData أو API مخصص)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { filePath, fileName };
    } catch (error) {
      throw new Error('فشل في رفع الملف');
    }
  }

  /**
   * إضافة وثيقة لمتدرب
   */
  static async addDocumentToTrainee(
    traineeId: number,
    file: File,
    documentType: DocumentUploadData['documentType'],
    notes?: string
  ): Promise<FileUploadResult> {
    try {
      // رفع الملف أولاً
      const { filePath, fileName } = await this.uploadFile(file);
      
      // إعداد بيانات الوثيقة
      const documentData: DocumentUploadData = {
        documentType,
        fileName,
        filePath,
        fileSize: file.size,
        mimeType: file.type,
        notes
      };

      // إرسال البيانات إلى API
      const response = await fetch(`http://localhost:4000/api/trainees/${traineeId}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(documentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: 'تم رفع الوثيقة بنجاح',
        document: result.document
      };
    } catch (error) {
      return {
        success: false,
        message: 'فشل في رفع الوثيقة',
        error: error instanceof Error ? error.message : 'خطأ غير معروف'
      };
    }
  }

  /**
   * الحصول على التوكن من الكوكيز
   */
  private static getAuthToken(): string {
    if (typeof window === 'undefined') return '';
    
    // محاولة الحصول على التوكن من الكوكيز
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'access_token') {
        return value;
      }
    }
    
    return '';
  }

  /**
   * التحقق من صحة نوع الملف
   */
  static validateFileType(file: File, documentType: DocumentUploadData['documentType']): boolean {
    const allowedTypes = {
      'PERSONAL_PHOTO': ['image/jpeg', 'image/jpg', 'image/png'],
      'ID_CARD_FRONT': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'ID_CARD_BACK': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'QUALIFICATION_FRONT': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'QUALIFICATION_BACK': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'EXPERIENCE_CERT': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'MINISTRY_CERT': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'PROFESSION_CARD': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      'SKILL_CERT': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    };

    return allowedTypes[documentType]?.includes(file.type) || false;
  }

  /**
   * التحقق من حجم الملف
   */
  static validateFileSize(file: File, maxSizeMB: number = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }

  /**
   * الحصول على اسم نوع الوثيقة بالعربية
   */
  static getDocumentTypeName(documentType: DocumentUploadData['documentType']): string {
    const names = {
      'PERSONAL_PHOTO': 'الصورة الشخصية',
      'ID_CARD_FRONT': 'الهوية الشخصية - الوجه الأمامي',
      'ID_CARD_BACK': 'الهوية الشخصية - الوجه الخلفي',
      'QUALIFICATION_FRONT': 'الشهادة - الوجه الأمامي',
      'QUALIFICATION_BACK': 'الشهادة - الوجه الخلفي',
      'EXPERIENCE_CERT': 'شهادة الخبرة',
      'MINISTRY_CERT': 'شهادة الوزارة',
      'PROFESSION_CARD': 'البطاقة المهنية',
      'SKILL_CERT': 'شهادة المهارات'
    };

    return names[documentType] || documentType;
  }
}

export default DocumentUploadService;
