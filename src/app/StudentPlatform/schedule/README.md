# صفحة الجدول الدراسي للطالب

## نظرة عامة
صفحة الجدول الدراسي تسمح للطالب بعرض جدول المحاضرات والدروس الأسبوعية باستخدام API endpoint `/api/trainee-auth/my-schedule`.

## الميزات
- عرض الجدول الأسبوعي الكامل
- معلومات الفصل الدراسي
- تفاصيل المحاضرات (نظرية/عملية)
- معلومات المدرسين والأماكن
- إشعارات الإلغاء
- تصميم متجاوب وجذاب

## الملفات المطلوبة

### 1. Types (src/types/schedule.ts)
يحتوي على جميع الـ interfaces المطلوبة للـ API response:
- `Instructor`: معلومات المدرس
- `Content`: معلومات المادة
- `DistributionRoom`: معلومات القاعة
- `ScheduleSlot`: تفاصيل المحاضرة
- `Classroom`: معلومات الفصل
- `WeekSchedule`: الجدول الأسبوعي
- `MyScheduleResponse`: استجابة الـ API

### 2. API Integration (src/lip/features/trainee-auth/traineeAuthApi.ts)
- إضافة `getMySchedule` query
- تصدير `useGetMyScheduleQuery` hook

### 3. Custom Hook (src/hooks/useMySchedule.ts)
- استخدام RTK Query
- آلية fallback إلى mock data
- معالجة الأخطاء

### 4. Mock Data (src/data/mockSchedule.ts)
- بيانات تجريبية شاملة
- جميع الـ types المطلوبة
- بيانات واقعية للاختبار

## الاستخدام

```tsx
import { useMySchedule } from '@/hooks/useMySchedule';

const MyComponent = () => {
  const { scheduleData, loading, error, refetch } = useMySchedule();
  
  // استخدام البيانات
  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  
  return (
    <div>
      <h1>الجدول الدراسي</h1>
      {/* عرض الجدول */}
    </div>
  );
};
```

## البيانات المعروضة

### معلومات الفصل
- اسم الفصل
- رقم الفصل
- تاريخ البداية والنهاية

### الجدول الأسبوعي
- **الأحد إلى السبت**: جميع أيام الأسبوع
- **الوقت**: من 8:00 صباحاً إلى 6:00 مساءً
- **المحاضرات**: تفاصيل كل محاضرة

### تفاصيل المحاضرة
- **اسم المادة**: اسم المادة الدراسية
- **كود المادة**: رمز المادة
- **نوع المحاضرة**: نظرية أو عملية
- **المدرس**: اسم المدرس
- **الوقت**: وقت البداية والنهاية
- **المكان**: القاعة أو المختبر
- **حالة الإلغاء**: إذا كانت ملغية

## التصميم

### 1. **Header Section**
- عنوان الصفحة
- زر تحديث الجدول
- معلومات الفصل الدراسي

### 2. **Schedule Table**
- جدول أسبوعي منظم
- ألوان مميزة لكل نوع محاضرة
- معلومات مفصلة لكل محاضرة

### 3. **Legend**
- مفتاح الألوان
- شرح الرموز المستخدمة

## الألوان المستخدمة

### 1. **أنواع المحاضرات**
```css
/* محاضرة نظرية */
bg-blue-100 text-blue-800 border-blue-200

/* درس عملي */
bg-green-100 text-green-800 border-green-200

/* محاضرة ملغية */
bg-red-100 text-red-800 border-red-200
```

### 2. **حالات الإلغاء**
```css
/* محاضرة ملغية */
opacity-50 bg-red-50 border-red-200
```

## الميزات المتقدمة

### 1. **Responsive Design**
- تصميم متجاوب لجميع الأجهزة
- جدول قابل للتمرير أفقياً
- تخطيط محسن للهواتف

### 2. **Interactive Elements**
- زر تحديث الجدول
- عرض تفاصيل المحاضرات
- إشعارات الإلغاء

### 3. **Error Handling**
- معالجة أخطاء التحميل
- رسائل خطأ واضحة
- زر إعادة المحاولة

### 4. **Mock Data Support**
- بيانات تجريبية للاختبار
- fallback تلقائي عند فشل API
- تجربة مستخدم سلسة

## API Endpoint

### GET `/api/trainee-auth/my-schedule`
```typescript
// Request Headers
Authorization: Bearer <token>
Content-Type: application/json

// Response
{
  "success": true,
  "classroom": {
    "id": 1,
    "name": "فصل البرمجة المتقدم",
    "classNumber": 1,
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-06-15T00:00:00.000Z"
  },
  "schedule": {
    "SUNDAY": [...],
    "MONDAY": [...],
    // ... باقي الأيام
  }
}
```

## المتطلبات
- Next.js 15+
- TypeScript
- Tailwind CSS
- Lucide React (للأيقونات)
- RTK Query
- API endpoint: `/api/trainee-auth/my-schedule`

## النتيجة

✅ **صفحة جدول دراسي كاملة** مع:
- ✅ **عرض الجدول الأسبوعي** بشكل منظم وجذاب
- ✅ **معلومات مفصلة** لكل محاضرة
- ✅ **تصميم متجاوب** يعمل على جميع الأجهزة
- ✅ **معالجة الأخطاء** مع fallback إلى mock data
- ✅ **تجربة مستخدم ممتازة** مع تفاعل سلس

الصفحة جاهزة للاستخدام! 🎉
