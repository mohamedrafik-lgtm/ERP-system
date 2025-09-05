# تحديث TraineeFees API - إزالة Mock Data

## 📋 ملخص التغييرات

تم تحديث ملف `src/lip/features/traineeFees/traineeFeesApi.ts` لإزالة الموك داتا والاتصال بالباك اند الحقيقي.

## 🔄 التغييرات المطبقة

### 1. إزالة Mock Data
- ✅ حذف جميع البيانات الوهمية `mockTraineeFees`
- ✅ إزالة `queryFn` المخصص
- ✅ استخدام `query` العادي للاتصال بالباك اند

### 2. تحديث Base URL
```typescript
// قبل
baseUrl: 'http://localhost:4000'

// بعد
baseUrl: 'http://localhost:4000/api/finances'
```

### 3. تحديث Authentication
```typescript
// إضافة التوكن للمصادقة
const token = Cookies.get('access_token') || Cookies.get('auth_token');
if (token) {
  headers.set('Authorization', `Bearer ${token}`);
}
headers.set('Content-Type', 'application/json');
```

### 4. تحديث Endpoint
```typescript
getTraineeFees: builder.query<TraineeFeesResponse, void>({
  query: () => ({
    url: '/trainee-fees',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }),
  keepUnusedDataFor: 0,
  providesTags: ['TraineeFees'],
})
```

## 🎯 النتائج

- ✅ **اتصال حقيقي** بالباك اند
- ✅ **بيانات ديناميكية** من قاعدة البيانات
- ✅ **مصادقة صحيحة** مع التوكن
- ✅ **عدم استخدام الكاش** لضمان البيانات الحديثة
- ✅ **إزالة كاملة** للموك داتا

## 📡 API Endpoint

```
GET http://localhost:4000/api/finances/trainee-fees
```

## 🔐 Headers المطلوبة

```
Authorization: Bearer <token>
Content-Type: application/json
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

## ✅ التحقق من النجاح

- لا توجد أخطاء في الكود
- الاتصال بالباك اند يعمل بشكل صحيح
- البيانات تظهر من قاعدة البيانات الحقيقية
