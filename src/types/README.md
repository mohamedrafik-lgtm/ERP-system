# 📋 أنواع البيانات (Types)

هذا المجلد يحتوي على جميع أنواع البيانات المستخدمة في المشروع.

## 📁 الملفات

### `traineeFees.ts`
أنواع البيانات الخاصة برسوم المتدربين:

#### **FeeType (Enum)**
أنواع الرسوم المختلفة:
- `TUITION` - رسوم دراسية أساسية
- `SERVICES` - خدمات
- `TRAINING` - تدريب
- `ADDITIONAL` - رسوم إضافية

#### **TrainingProgram**
بيانات البرنامج التدريبي:
```typescript
interface TrainingProgram {
  id: number;
  nameAr: string;           // الاسم بالعربية
  nameEn: string;           // الاسم بالإنجليزية
  price: number;            // سعر البرنامج
  description?: string;     // وصف البرنامج
  createdAt: Date;          // تاريخ الإنشاء
  updatedAt: Date;          // تاريخ التحديث
}
```

#### **Safe**
بيانات الخزينة:
```typescript
interface Safe {
  id: string;               // معرف الخزينة
  name: string;             // اسم الخزينة
  description?: string;     // وصف الخزينة
  balance: number;          // الرصيد الحالي
  currency: string;         // العملة (افتراضي: EGP)
  isActive: boolean;        // حالة الخزينة
  createdAt: Date;          // تاريخ الإنشاء
  updatedAt: Date;          // تاريخ التحديث
}
```

#### **TraineeFee**
البيانات الرئيسية لرسوم المتدربين:
```typescript
interface TraineeFee {
  id: number;                           // معرف الرسوم
  name: string;                         // اسم الرسوم
  amount: number;                       // قيمة الرسوم
  type: FeeType;                        // نوع الرسوم
  academicYear: string;                 // العام الدراسي
  allowMultipleApply: boolean;          // السماح بتطبيق الرسوم أكثر من مرة
  programId: number;                    // معرف البرنامج التدريبي
  safeId: string;                       // معرف الخزينة
  isApplied: boolean;                   // حالة التطبيق
  appliedAt?: Date;                     // تاريخ التطبيق (اختياري)
  appliedById?: string;                 // معرف من قام بالتطبيق (اختياري)
  createdAt: Date;                      // تاريخ الإنشاء
  updatedAt: Date;                      // تاريخ التحديث
  program: TrainingProgram;             // بيانات البرنامج التدريبي الكاملة
  safe: Safe;                          // بيانات الخزينة الكاملة
}
```

#### **TraineeFeesResponse**
نوع الاستجابة من API:
```typescript
type TraineeFeesResponse = TraineeFee[];
```

#### **TraineeFeesApiResponse**
نوع الاستجابة الكاملة من API:
```typescript
interface TraineeFeesApiResponse {
  data: TraineeFee[];
  success: boolean;
  message?: string;
}
```

## 🔗 الاستيراد

يمكن استيراد جميع الأنواع من:
```typescript
import { TraineeFee, FeeType, TrainingProgram, Safe } from '@/types/traineeFees';
// أو
import { TraineeFee, FeeType, TrainingProgram, Safe } from '@/interface';
```

## 📡 API Integration

تم إنشاء API slice في `src/lip/features/traineeFees/traineeFeesApi.ts` مع الـ endpoints التالية:

- `GET /api/finances/trainee-fees` - جلب جميع الرسوم
- `GET /api/finances/trainee-fees/{id}` - جلب رسوم محددة
- `POST /api/finances/trainee-fees` - إنشاء رسوم جديدة
- `PATCH /api/finances/trainee-fees/{id}` - تحديث رسوم
- `DELETE /api/finances/trainee-fees/{id}` - حذف رسوم
- `POST /api/finances/trainee-fees/{id}/apply` - تطبيق الرسوم
- `POST /api/finances/trainee-fees/{id}/unapply` - إلغاء تطبيق الرسوم

## 🎯 الاستخدام

```typescript
import { useGetTraineeFeesQuery, useCreateTraineeFeeMutation } from '@/lip/features/traineeFees/traineeFeesApi';

function MyComponent() {
  const { data: fees, isLoading, error } = useGetTraineeFeesQuery();
  const [createFee] = useCreateTraineeFeeMutation();
  
  // استخدام البيانات...
}
```
