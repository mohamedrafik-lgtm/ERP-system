# إعداد صفحة إدارة حسابات المتدربين

## متطلبات التشغيل

### 1. الباك إند
يجب أن يكون الباك إند يعمل على:
```
http://localhost:4000
```

### 2. الـ Endpoints المطلوبة

#### **GET** `/api/trainee-platform/accounts`
جلب قائمة حسابات المتدربين
- **Query Parameters:**
  - `search` (string): البحث بالاسم أو الرقم القومي
  - `isActive` (boolean): تصفية حسب حالة التفعيل
  - `programId` (number): تصفية حسب البرنامج
  - `page` (number): رقم الصفحة (افتراضي: 1)
  - `limit` (number): عدد العناصر (افتراضي: 10)
  - `sortBy` (string): الترتيب حسب (افتراضي: 'createdAt')
  - `sortOrder` ('asc' | 'desc'): نوع الترتيب (افتراضي: 'desc')

- **Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nationalId": "string",
      "birthDate": "date",
      "isActive": boolean,
      "lastLoginAt": "date",
      "trainee": {
        "id": number,
        "nameAr": "string",
        "nameEn": "string",
        "email": "string",
        "phone": "string",
        "program": {
          "id": number,
          "nameAr": "string",
          "nameEn": "string"
        }
      }
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number,
    "hasNext": boolean,
    "hasPrev": boolean
  }
}
```

#### **GET** `/api/trainee-platform/accounts/stats`
جلب إحصائيات الحسابات
- **Response:**
```json
{
  "totalAccounts": number,
  "activeAccounts": number,
  "inactiveAccounts": number,
  "averageAccountAgeInDays": number
}
```

#### **GET** `/api/trainee-platform/accounts/:id`
جلب تفاصيل حساب محدد

#### **PATCH** `/api/trainee-platform/accounts/:id/status`
تحديث حالة التفعيل
- **Body:**
```json
{
  "isActive": boolean
}
```

#### **POST** `/api/trainee-platform/accounts/:id/reset-password`
إعادة تعيين كلمة المرور

#### **DELETE** `/api/trainee-platform/accounts/:id`
حذف الحساب

## التشغيل

### 1. شغّل الباك إند
```bash
# في مجلد الباك إند
npm run dev
# أو
yarn dev
```

### 2. شغّل الفرونت إند
```bash
# في مجلد الفرونت إند
npm run dev
# أو
yarn dev
```

### 3. افتح المتصفح
```
http://localhost:3000/AccountManagement
```

## استكشاف الأخطاء

### الخطأ: "لا يمكن الاتصال بالخادم"
**الحل:**
1. تأكد من تشغيل الباك إند على المنفذ 4000
2. تأكد من عدم وجود Firewall يمنع الاتصال
3. تحقق من أن الباك إند يستمع على جميع الواجهات (0.0.0.0)

### الخطأ: "401 Unauthorized"
**الحل:**
1. تأكد من تسجيل الدخول
2. تحقق من صلاحية الـ token
3. تأكد من أن الـ token يُرسل في الـ headers

### الخطأ: "404 Not Found"
**الحل:**
1. تأكد من أن الـ endpoint موجود في الباك إند
2. تحقق من المسار الصحيح في API

### الخطأ: "CORS Error"
**الحل:**
1. تأكد من إعداد CORS في الباك إند
2. أضف `http://localhost:3000` إلى allowed origins

## البيانات التجريبية (Mock Data)

إذا كنت تريد اختبار الصفحة بدون باك إند، يمكنك استخدام البيانات التجريبية في:
```
src/data/mockTraineeAccounts.ts
```

لاستخدامها، قم بتعديل API في:
```
src/lip/features/trainee-platform/traineeAccountsApi.ts
```
