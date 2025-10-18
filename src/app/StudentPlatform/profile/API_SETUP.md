# إعداد API للبروفايل

## المشكلة
```
GET http://localhost:3000/api/trainee-auth/profile 404 (Not Found)
```

## الحل

### 1. تأكد من تشغيل الخادم الخلفي
الـ API endpoints موجودة على port 4000، تأكد من تشغيل الخادم الخلفي:

```bash
# تأكد من تشغيل الخادم على port 4000
# يجب أن يكون متاح على: http://localhost:4000
```

### 2. متغيرات البيئة
تأكد من وجود متغير البيئة الصحيح:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. الـ API Endpoints المطلوبة

#### GET `/api/trainee-auth/profile`
```typescript
// Request Headers
Authorization: Bearer <token>
Content-Type: application/json

// Response
{
  "id": "string",
  "nationalId": "string",
  "birthDate": "2023-01-01T00:00:00.000Z",
  "isActive": true,
  "lastLoginAt": "2023-01-01T00:00:00.000Z",
  "traineeId": 123,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "trainee": {
    // Trainee object with all fields
  }
}
```

#### PUT `/api/trainee-auth/profile`
```typescript
// Request Body
{
  "trainee": {
    "nameAr": "string",
    "nameEn": "string",
    "phone": "string",
    "email": "string",
    // ... other updatable fields
  }
}

// Response
{
  // Updated TraineeProfileResponse
}
```

### 4. Authentication
تأكد من أن الـ token موجود في الـ cookies:

```typescript
// يجب أن يكون موجود في الـ cookies
access_token: "your-jwt-token"
// أو
auth_token: "your-jwt-token"
```

### 5. اختبار الـ API

#### باستخدام curl:
```bash
# GET Profile
curl -X GET "http://localhost:4000/api/trainee-auth/profile" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

# PUT Profile
curl -X PUT "http://localhost:4000/api/trainee-auth/profile" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"trainee": {"nameAr": "اسم جديد"}}'
```

#### باستخدام Postman:
1. **GET Request**: `http://localhost:4000/api/trainee-auth/profile`
2. **Headers**: 
   - `Authorization: Bearer YOUR_TOKEN`
   - `Content-Type: application/json`

### 6. استكشاف الأخطاء

#### خطأ 404:
- تأكد من تشغيل الخادم الخلفي على port 4000
- تأكد من وجود الـ endpoint في الخادم الخلفي

#### خطأ 401:
- تأكد من وجود الـ token في الـ cookies
- تأكد من صحة الـ token

#### خطأ 500:
- تحقق من logs الخادم الخلفي
- تأكد من صحة البيانات المرسلة

### 7. التطوير المحلي

#### تشغيل الخادم الخلفي:
```bash
# في مجلد الخادم الخلفي
npm start
# أو
yarn start
# أو
node server.js
```

#### تشغيل Frontend:
```bash
# في مجلد المشروع الحالي
npm run dev
# أو
yarn dev
```

### 8. التحقق من الاتصال

افتح Developer Tools في المتصفح وتحقق من:
1. **Network Tab**: هل الـ requests تذهب إلى port 4000؟
2. **Console**: هل توجد أخطاء JavaScript؟
3. **Application Tab**: هل الـ cookies موجودة؟

### 9. حلول بديلة

إذا لم يكن الخادم الخلفي متاح، يمكنك:

#### أ. استخدام Mock Data:
```typescript
// في useTraineeProfile.ts
const mockProfile = {
  id: "1",
  nationalId: "12345678901234",
  birthDate: new Date("1995-01-01"),
  isActive: true,
  traineeId: 1,
  trainee: {
    // Mock trainee data
  }
};

// استخدام Mock data في التطوير
if (process.env.NODE_ENV === 'development') {
  return { profile: mockProfile, loading: false, error: null };
}
```

#### ب. إنشاء API Route في Next.js:
```typescript
// src/app/api/trainee-auth/profile/route.ts
export async function GET() {
  // Mock implementation
  return Response.json(mockProfile);
}
```

### 10. ملاحظات مهمة

1. **CORS**: تأكد من إعداد CORS في الخادم الخلفي
2. **Authentication**: تأكد من صحة نظام المصادقة
3. **Database**: تأكد من اتصال قاعدة البيانات
4. **Logs**: راجع logs الخادم الخلفي للأخطاء

## الدعم

إذا استمرت المشكلة، تحقق من:
- [ ] الخادم الخلفي يعمل على port 4000
- [ ] الـ endpoint موجود في الخادم الخلفي
- [ ] الـ token صحيح ومتوفر
- [ ] CORS مُعد بشكل صحيح
- [ ] قاعدة البيانات متصلة
