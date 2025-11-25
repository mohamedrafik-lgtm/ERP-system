# 🔧 إعداد API للأسئلة

## ✅ ما تم إصلاحه

### 🗑️ **حذف الـ Backend الافتراضي:**
- ✅ حذف `src/app/api/questions/route.ts`
- ✅ حذف `src/app/api/questions/stats/route.ts`

### 🔄 **تحديث الـ API للاتصال بالـ Endpoint الحقيقي:**
- ✅ تحديث `baseUrl` في `questionsApi` لاستخدام الـ endpoint الحقيقي
- ✅ إضافة دعم للـ environment variable `NEXT_PUBLIC_API_URL`
- ✅ تحسين error handling مع تفاصيل الخطأ

---

## 🚀 **خطوات الإعداد:**

### 1. **إنشاء ملف `.env.local` في root المشروع:**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# أو استخدم الـ URL الحقيقي للـ API
# NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### 2. **تأكد من أن الـ API endpoints متاحة:**
- `GET /api/questions` - لجلب جميع الأسئلة
- `GET /api/questions/stats` - لجلب إحصائيات الأسئلة
- `GET /api/questions/:id` - لجلب سؤال واحد
- `POST /api/questions` - لإضافة سؤال جديد
- `PUT /api/questions/:id` - لتحديث سؤال
- `DELETE /api/questions/:id` - لحذف سؤال

### 3. **تأكد من أن الـ API يعيد البيانات بالشكل الصحيح:**

#### **Response للأسئلة (`/api/questions`):**
```json
[
  {
    "id": 1,
    "text": "ما هو تعريف الذكاء الاصطناعي؟",
    "type": "MULTIPLE_CHOICE",
    "skill": "RECALL",
    "difficulty": "EASY",
    "chapter": 1,
    "contentId": 1,
    "createdById": "1",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "options": [
      {
        "id": 1,
        "text": "علم دراسة الحاسوب",
        "isCorrect": false,
        "questionId": 1
      }
    ],
    "content": {
      "name": "تكنولوجيا معلومات",
      "code": "IT-101"
    },
    "createdBy": {
      "name": "أحمد محمد",
      "email": "ahmed@example.com"
    }
  }
]
```

#### **Response للإحصائيات (`/api/questions/stats`):**
```json
{
  "total": 8,
  "byType": {
    "MULTIPLE_CHOICE": 5,
    "TRUE_FALSE": 3
  },
  "byDifficulty": {
    "EASY": 2,
    "MEDIUM": 2,
    "HARD": 2,
    "VERY_HARD": 2
  },
  "bySkill": {
    "RECALL": 2,
    "COMPREHENSION": 4,
    "DEDUCTION": 2
  },
  "byContent": [
    {
      "contentId": 1,
      "contentName": "تكنولوجيا معلومات",
      "count": 3
    }
  ]
}
```

---

## 🔍 **تشخيص الأخطاء:**

### **إذا ظهر خطأ "خطأ في تحميل البيانات":**

1. **تحقق من Console في المتصفح:**
   - افتح Developer Tools (F12)
   - اذهب إلى Console
   - ابحث عن رسائل الخطأ

2. **تحقق من Network Tab:**
   - اذهب إلى Network tab
   - ابحث عن requests للـ `/api/questions`
   - تحقق من status code

3. **تحقق من الـ API URL:**
   - تأكد من أن الـ API server يعمل
   - تأكد من أن الـ URL صحيح
   - تأكد من أن الـ endpoints متاحة

### **أخطاء شائعة:**

#### **404 Not Found:**
- الـ API endpoint غير موجود
- الـ URL غير صحيح

#### **500 Internal Server Error:**
- خطأ في الـ API server
- مشكلة في قاعدة البيانات

#### **CORS Error:**
- الـ API لا يسمح بالطلبات من هذا الـ domain
- تحتاج إضافة CORS headers في الـ API

#### **Network Error:**
- الـ API server غير متاح
- مشكلة في الشبكة

---

## 🛠️ **إصلاح المشاكل:**

### **1. إذا كان الـ API غير متاح:**
```typescript
// في questionsApi.ts، يمكن إضافة fallback data
baseQuery: fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  // إضافة retry logic
  fetchFn: async (...args) => {
    try {
      return await fetch(...args);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
}),
```

### **2. إذا كان هناك مشكلة في الـ authentication:**
```typescript
// في prepareHeaders
prepareHeaders: (headers) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
  
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  
  // إضافة headers أخرى مطلوبة
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  
  return headers;
},
```

---

## 📝 **ملاحظات مهمة:**

### ✅ **الكود جاهز للاستخدام:**
- الـ questionsApi محدث للاتصال بالـ endpoint الحقيقي
- Error handling محسن مع تفاصيل الخطأ
- Debug logs مضافة للـ console

### 🔧 **ما تحتاج فعله:**
1. إنشاء ملف `.env.local` مع الـ API URL الصحيح
2. التأكد من أن الـ API server يعمل
3. التأكد من أن الـ endpoints متاحة وتعيد البيانات بالشكل الصحيح

### 🚀 **الخطوات التالية:**
1. **اختبر الـ API** في Postman أو curl
2. **تحقق من Console** في المتصفح للأخطاء
3. **أخبرني بالخطأ المحدد** إذا استمر

---

**تاريخ الإصلاح:** 21 يناير 2024  
**الحالة:** ✅ مكتمل  
**الوقت المستغرق:** ~15 دقيقة  
**التقييم:** ⭐⭐⭐⭐⭐

🎊 **تم إصلاح الكود للاتصال بالـ API الحقيقي!** 🎊

