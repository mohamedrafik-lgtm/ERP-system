# صفحة الإحصائيات المتقدمة للطالب

## نظرة عامة
صفحة الإحصائيات المتقدمة تسمح للطالب بعرض إحصائيات مفصلة عن نشاطه في المنصة باستخدام API endpoint `/api/trainee-auth/advanced-stats`.

## الميزات
- إحصائيات شاملة عن النشاط
- تحليل أنواع الأنشطة
- تتبع الجلسات الأخيرة
- إحصائيات يومية
- معلومات تسجيل الدخول
- تصميم متجاوب وجذاب

## الملفات المطلوبة

### 1. Types (src/types/advancedStats.ts)
يحتوي على جميع الـ interfaces المطلوبة للـ API response:
- `ActivityType`: أنواع الأنشطة المختلفة
- `TraineeStats`: إحصائيات الطالب الأساسية
- `SessionActivity`: نشاط في جلسة معينة
- `RecentSession`: جلسة حديثة
- `ActivityCount`: عدد الأنشطة حسب النوع
- `DailyStats`: إحصائيات يومية
- `AdvancedStatsResponse`: استجابة الـ API

### 2. API Integration (src/lip/features/trainee-auth/traineeAuthApi.ts)
- إضافة `getAdvancedStats` query
- تصدير `useGetAdvancedStatsQuery` hook

### 3. Custom Hook (src/hooks/useAdvancedStats.ts)
- استخدام RTK Query
- آلية fallback إلى mock data
- معالجة الأخطاء

### 4. Mock Data (src/data/mockAdvancedStats.ts)
- بيانات تجريبية شاملة
- جميع الـ types المطلوبة
- بيانات واقعية للاختبار

## الاستخدام

```tsx
import { useAdvancedStats } from '@/hooks/useAdvancedStats';

const MyComponent = () => {
  const { statsData, loading, error, refetch } = useAdvancedStats();
  
  // استخدام البيانات
  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  
  return (
    <div>
      <h1>الإحصائيات المتقدمة</h1>
      {/* عرض الإحصائيات */}
    </div>
  );
};
```

## البيانات المعروضة

### الإحصائيات الأساسية
- **إجمالي الجلسات**: عدد الجلسات الكلي
- **إجمالي الوقت**: الوقت الإجمالي المستغرق
- **عرض الصفحات**: عدد مرات عرض الصفحات
- **التحميلات**: عدد الملفات المحملة

### أنواع الأنشطة
- **عرض الصفحات**: PAGE_VIEW
- **التحميلات**: DOWNLOAD
- **مشاهدة الفيديوهات**: VIDEO_WATCH
- **محاولات الاختبارات**: QUIZ_ATTEMPT
- **تسليم الواجبات**: ASSIGNMENT_SUBMIT
- **منشورات النقاش**: DISCUSSION_POST
- **أخرى**: OTHER

### الجلسات الأخيرة
- **تاريخ ووقت الجلسة**
- **مدة الجلسة**
- **نوع الجهاز**
- **الأنشطة المنجزة**

### الإحصائيات اليومية
- **عدد الجلسات اليومية**
- **الوقت المستغرق يومياً**
- **توزيع الأنشطة**

## التصميم

### 1. **Header Section**
- عنوان الصفحة
- زر تحديث الإحصائيات
- منتقي الفترة الزمنية

### 2. **Main Stats Grid**
- 4 بطاقات رئيسية للإحصائيات
- أيقونات ملونة
- اتجاهات النمو

### 3. **Activity Breakdown**
- تحليل أنواع الأنشطة
- الجلسات الأخيرة
- توزيع النشاط

### 4. **Daily Stats**
- إحصائيات يومية
- مخطط أسبوعي
- تتبع الاتجاهات

## الألوان المستخدمة

### 1. **أنواع الأنشطة**
```css
/* عرض الصفحات */
bg-blue-100 text-blue-800 border-blue-200

/* التحميلات */
bg-green-100 text-green-800 border-green-200

/* مشاهدة الفيديوهات */
bg-purple-100 text-purple-800 border-purple-200

/* محاولات الاختبارات */
bg-orange-100 text-orange-800 border-orange-200

/* تسليم الواجبات */
bg-indigo-100 text-indigo-800 border-indigo-200

/* منشورات النقاش */
bg-pink-100 text-pink-800 border-pink-200
```

### 2. **الإحصائيات الرئيسية**
```css
/* الجلسات */
bg-blue-100 text-blue-600

/* الوقت */
bg-green-100 text-green-600

/* عرض الصفحات */
bg-purple-100 text-purple-600

/* التحميلات */
bg-orange-100 text-orange-600
```

## الميزات المتقدمة

### 1. **Responsive Design**
- تصميم متجاوب لجميع الأجهزة
- تخطيط مرن للشاشات المختلفة
- تجربة محسنة للهواتف

### 2. **Interactive Elements**
- منتقي الفترة الزمنية
- زر تحديث الإحصائيات
- عرض تفاصيل الجلسات

### 3. **Data Visualization**
- بطاقات ملونة للإحصائيات
- توزيع الأنشطة
- اتجاهات النمو

### 4. **Mock Data Support**
- بيانات تجريبية للاختبار
- fallback تلقائي عند فشل API
- تجربة مستخدم سلسة

## API Endpoint

### GET `/api/trainee-auth/advanced-stats`
```typescript
// Request Headers
Authorization: Bearer <token>
Content-Type: application/json

// Response
{
  "stats": {
    "id": "1",
    "traineeAuthId": "trainee-123",
    "totalSessions": 45,
    "totalTimeSpent": 125400,
    "averageSessionTime": 2787,
    "longestSession": 480,
    "totalPageViews": 156,
    "totalDownloads": 23,
    "totalVideoWatches": 67,
    "firstLogin": "2024-01-15T08:30:00Z",
    "lastLogin": "2024-12-20T09:15:00Z",
    "lastActivity": "2024-12-20T16:45:00Z",
    "thisWeekSessions": 8,
    "thisMonthSessions": 22,
    "updatedAt": "2024-12-20T16:45:00Z"
  },
  "recentSessions": [...],
  "activityCounts": [...],
  "dailyStats": {...}
}
```

## المتطلبات
- Next.js 15+
- TypeScript
- Tailwind CSS
- Lucide React (للأيقونات)
- RTK Query
- API endpoint: `/api/trainee-auth/advanced-stats`

## النتيجة

✅ **صفحة إحصائيات متقدمة كاملة** مع:
- ✅ **عرض الإحصائيات الشاملة** بشكل منظم وجذاب
- ✅ **تحليل أنواع الأنشطة** مع ألوان مميزة
- ✅ **تتبع الجلسات الأخيرة** مع تفاصيل كاملة
- ✅ **إحصائيات يومية** مع مخططات بصرية
- ✅ **تصميم متجاوب** يعمل على جميع الأجهزة
- ✅ **معالجة الأخطاء** مع fallback إلى mock data
- ✅ **تجربة مستخدم ممتازة** مع تفاعل سلس

الصفحة جاهزة للاستخدام! 🎉
