# نظام إنشاء حساب المتدرب الكامل - ثلاث مراحل

## 🎯 نظرة عامة

تم إنجاز نظام إنشاء حساب المتدرب بالكامل مع ثلاث مراحل متكاملة، باستخدام Redux Toolkit Query وتطبيق مبادئ SOLID.

## 🏗️ الهيكل الكامل

### 📁 الملفات المنفذة

```
src/
├── types/
│   └── traineeAuth.ts                              # جميع الـ interfaces
├── lip/features/trainee-auth/
│   └── traineeAuthApi.ts                           # RTK Query API slice
├── Schema/
│   └── traineeAuth.ts                              # جميع الـ Yup schemas
└── app/register/student/
    ├── verify/
    │   └── page.tsx                                # المرحلة 1: التحقق من المتدرب
    ├── create-account/
    │   └── page.tsx                                # المرحلة 2: التحقق من الهاتف
    └── create-password/
        └── page.tsx                                # المرحلة 3: إنشاء كلمة المرور
```

## 🔧 التطبيق التقني

### **1. TypeScript Interfaces**

#### ✅ **traineeAuth.ts - جميع الـ interfaces**

```typescript
// ============================================
// Step 1: Verify Trainee
// ============================================
export interface VerifyTraineeRequest {
  nationalId: string;
  birthDate: string; // YYYY-MM-DD format
}

export interface VerifyTraineeResponse {
  traineeId: number;
  nationalId: string;
  name: string;
  hasAccount: boolean;
  phoneHint: string | null;
}

// ============================================
// Step 2: Verify Phone
// ============================================
export interface VerifyPhoneRequest {
  nationalId: string;
  phone: string;
}

export interface VerifyPhoneResponse {
  success: boolean;
  message: string;
}

// ============================================
// Step 3: Create Password
// ============================================
export interface CreatePasswordRequest {
  nationalId: string;
  birthDate: string; // YYYY-MM-DD format
  password: string; // min 6 chars, must contain letters and numbers
}

export interface CreatePasswordResponse {
  success: boolean;
  message: string;
}
```

### **2. RTK Query API Slice**

#### ✅ **traineeAuthApi.ts - جميع الـ endpoints**

```typescript
export const traineeAuthApi = createApi({
  reducerPath: 'traineeAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
      // معالجة الـ headers والتوكن
    },
  }),
  tagTypes: ['TraineeAuth'],
  endpoints: (builder) => ({
    // Step 1: Verify Trainee
    verifyTrainee: builder.mutation<VerifyTraineeResponse, VerifyTraineeRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/verify-trainee',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Step 2: Verify Phone
    verifyPhone: builder.mutation<VerifyPhoneResponse, VerifyPhoneRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/verify-phone',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Step 3: Create Password
    createPassword: builder.mutation<CreatePasswordResponse, CreatePasswordRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/create-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useVerifyTraineeMutation,
  useVerifyPhoneMutation,
  useCreatePasswordMutation,
} = traineeAuthApi;
```

### **3. Yup Validation Schemas**

#### ✅ **traineeAuth.ts - جميع الـ schemas**

```typescript
// ============================================
// Step 1: Verify Trainee Schema
// ============================================
export const VerifyTraineeSchema = yup.object().shape({
  nationalId: yup
    .string()
    .required('الرقم القومي مطلوب')
    .matches(/^[0-9]{14}$/, 'الرقم القومي يجب أن يكون 14 رقماً')
    .test('valid-national-id', 'الرقم القومي غير صحيح', (value) => {
      // التحقق من صحة الرقم القومي المصري
    }),
  birthDate: yup
    .string()
    .required('تاريخ الميلاد مطلوب')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'تاريخ الميلاد يجب أن يكون بصيغة YYYY-MM-DD')
    .test('valid-date', 'تاريخ الميلاد غير صحيح', (value) => {
      // التحقق من صحة التاريخ
    })
    .test('not-future', 'تاريخ الميلاد لا يمكن أن يكون في المستقبل', (value) => {
      // التحقق من أن التاريخ ليس في المستقبل
    })
    .test('minimum-age', 'يجب أن يكون العمر 10 سنوات على الأقل', (value) => {
      // التحقق من العمر
    }),
});

// ============================================
// Step 2: Verify Phone Schema
// ============================================
export const VerifyPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم الهاتف يجب أن يكون رقم مصري صحيح')
    .test('valid-egyptian-phone', 'رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015', (value) => {
      return /^01[0-2,5]{1}[0-9]{8}$/.test(value);
    }),
});

// ============================================
// Step 3: Create Password Schema
// ============================================
export const CreatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, 'كلمة المرور يجب أن تحتوي على أحرف وأرقام')
    .test('password-strength', 'كلمة المرور يجب أن تحتوي على أحرف وأرقام', (value) => {
      const hasLetter = /[A-Za-z]/.test(value);
      const hasNumber = /\d/.test(value);
      return hasLetter && hasNumber;
    }),
  confirmPassword: yup
    .string()
    .required('تأكيد كلمة المرور مطلوب')
    .oneOf([yup.ref('password')], 'كلمة المرور غير متطابقة'),
});
```

## 📊 التدفق الكامل

### **المرحلة الأولى: التحقق من المتدرب**
```
/register/student/verify
    ↓
إدخال الرقم القومي وتاريخ الميلاد
    ↓
POST /api/trainee-auth/verify-trainee
    ↓
معالجة الاستجابة:
- إذا hasAccount = true → /login/student
- إذا hasAccount = false → حفظ البيانات + /register/student/create-account
```

### **المرحلة الثانية: التحقق من رقم الهاتف**
```
/register/student/create-account
    ↓
عرض بيانات المتدرب من المرحلة الأولى
    ↓
إدخال رقم الهاتف
    ↓
POST /api/trainee-auth/verify-phone
    ↓
حفظ رقم الهاتف + /register/student/create-password
```

### **المرحلة الثالثة: إنشاء كلمة المرور**
```
/register/student/create-password
    ↓
عرض بيانات المتدرب من المراحل السابقة
    ↓
إدخال كلمة المرور وتأكيدها
    ↓
POST /api/trainee-auth/create-password
    ↓
مسح البيانات المؤقتة + /login/student
```

## 🎨 التصميم المطبق

### **الألوان الموحدة:**
- **خلفية**: `from-green-50 via-white to-blue-50`
- **أيقونة**: `from-green-600 to-blue-600`
- **زر**: `from-green-600 to-blue-600`
- **تركيز**: `border-green-500 ring-4 ring-green-100`

### **مؤشر التقدم:**
- **المرحلة 1**: التحقق من المتدرب
- **المرحلة 2**: التحقق من رقم الهاتف
- **المرحلة 3**: إنشاء كلمة المرور

### **المكونات المشتركة:**
- **Progress Indicator**: مؤشر التقدم (3 مراحل)
- **Input Fields**: حقول إدخال محسنة
- **Error Handling**: معالجة شاملة للأخطاء
- **Loading States**: حالات التحميل
- **Navigation**: أزرار العودة والتوجيه

## 🔧 الميزات التقنية

### **1. إدارة الحالة**
- **sessionStorage**: لحفظ البيانات بين المراحل
- **RTK Query**: لإدارة الطلبات والاستجابات
- **React Hook Form**: لإدارة النماذج
- **Yup**: للتحقق من صحة البيانات

### **2. معالجة الأخطاء**
- **404**: لم يتم العثور على المتدرب
- **400**: البيانات غير صحيحة
- **409**: كلمة المرور مستخدمة
- **429**: تجاوز عدد المحاولات
- **عام**: رسائل خطأ واضحة

### **3. تجربة المستخدم**
- **توجيه سلس**: بين المراحل
- **رسائل واضحة**: للمستخدم
- **تحققات فورية**: للبيانات
- **تصميم متجاوب**: لجميع الأجهزة

## ✅ الحالة الحالية

- ✅ **المرحلة 1**: التحقق من المتدرب - مكتملة
- ✅ **المرحلة 2**: التحقق من رقم الهاتف - مكتملة
- ✅ **المرحلة 3**: إنشاء كلمة المرور - مكتملة
- ✅ **RTK Query API**: جميع الـ endpoints
- ✅ **TypeScript Interfaces**: جميع الـ types
- ✅ **Yup Schemas**: جميع الـ validations
- ✅ **Error Handling**: معالجة شاملة
- ✅ **Responsive Design**: تصميم متجاوب
- ✅ **Arabic Support**: دعم كامل للعربية

## 🚀 النتائج المحققة

### **1. نظام متكامل**
- **ثلاث مراحل متكاملة**: من التحقق إلى إنشاء الحساب
- **تدفق سلس**: بين المراحل
- **معالجة شاملة**: للأخطاء والحالات

### **2. تقنية متقدمة**
- **RTK Query**: لإدارة الطلبات
- **TypeScript**: لأمان الأنواع
- **Yup**: للتحقق من البيانات
- **React Hook Form**: لإدارة النماذج

### **3. تجربة مستخدم ممتازة**
- **تصميم حديث**: مع تأثيرات بصرية
- **رسائل واضحة**: للمستخدم
- **تحققات فورية**: للبيانات
- **تصميم متجاوب**: لجميع الأجهزة

## 🎉 الخلاصة

تم إنجاز نظام إنشاء حساب المتدرب بالكامل مع:

- **ثلاث مراحل متكاملة** مع تدفق سلس
- **RTK Query Integration** كامل مع جميع الـ endpoints
- **Real API Data** استخدام البيانات الحقيقية
- **SOLID Principles** تطبيق مبادئ SOLID
- **Modern Components** مكونات حديثة ومتطورة
- **Comprehensive Validation** تحققات شاملة ومفصلة
- **Excellent UX** تجربة مستخدم ممتازة

النظام الآن جاهز للعمل مع الـ API الحقيقي! 🎉

## 📱 الصفحات المتاحة

- ✅ `/register/student/verify` - المرحلة 1
- ✅ `/register/student/create-account` - المرحلة 2  
- ✅ `/register/student/create-password` - المرحلة 3
- ✅ `/login/student` - تسجيل الدخول
- ✅ `/account-type` - اختيار نوع الحساب

النظام مكتمل وجاهز للاستخدام! 🚀
