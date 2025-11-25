# 💡 أمثلة عملية للبرمجة - نظام إدارة التدريب

## 📚 نظرة عامة

هذا الملف يحتوي على أمثلة عملية وواقعية من المشروع لمساعدتك على فهم كيفية تطبيق المبادئ والأنماط المستخدمة.

---

## 🎯 مثال 1: تطبيق SOLID Principles

### Single Responsibility Principle (SRP)

```typescript
// ✅ GOOD: كل class له مسؤولية واحدة فقط
// src/services/PaymentValidator.ts
export class PaymentValidator implements IPaymentValidator {
  validateAmount(amount: number, maxAmount: number): ValidationResult {
    if (amount <= 0) {
      return { isValid: false, error: 'المبلغ يجب أن يكون أكبر من صفر' };
    }
    if (amount > maxAmount) {
      return { 
        isValid: false, 
        error: `المبلغ لا يمكن أن يتجاوز ${maxAmount}` 
      };
    }
    return { isValid: true };
  }
  
  validatePaymentCount(paymentCount: number): ValidationResult {
    if (paymentCount < 1 || paymentCount > 12) {
      return { isValid: false, error: 'عدد الدفعات يجب أن يكون بين 1 و 12' };
    }
    return { isValid: true };
  }
}

// src/services/PaymentCalculator.ts
export class PaymentCalculator implements IPaymentCalculator {
  calculatePaymentSplit(amount: number, paymentCount: number): IPaymentSplit | null {
    if (paymentCount <= 0 || amount <= 0) return null;
    
    const amountPerPayment = Math.floor(amount / paymentCount);
    const remainder = amount % paymentCount;
    const payments = Array(paymentCount).fill(amountPerPayment);
    
    if (remainder > 0) {
      payments[0] += remainder;
    }
    
    return {
      amountPerPayment,
      remainder,
      payments,
      totalAmount: amount,
      paymentCount
    };
  }
}
```

### Open/Closed Principle (OCP)

```typescript
// ✅ مفتوح للتوسع، مغلق للتعديل
interface IPaymentProcessor {
  processPayment(data: PaymentData): Promise<PaymentResult>;
}

class HttpPaymentProcessor implements IPaymentProcessor {
  async processPayment(data: PaymentData): Promise<PaymentResult> {
    const response = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

class MockPaymentProcessor implements IPaymentProcessor {
  async processPayment(data: PaymentData): Promise<PaymentResult> {
    return {
      success: true,
      message: 'Mock payment processed',
      data: { id: 1, ...data }
    };
  }
}
```

### Dependency Inversion Principle (DIP)

```typescript
// ✅ الاعتماد على abstraction وليس implementation
interface IApiClient {
  post<T>(url: string, data: any): Promise<T>;
}

class PaymentService {
  constructor(private apiClient: IApiClient) {} // Dependency Injection
  
  async processPayment(data: PaymentData) {
    return this.apiClient.post('/payments', data);
  }
}

// يمكن استخدام أي implementation
const httpClient = new HttpClient();
const mockClient = new MockClient();

const paymentService1 = new PaymentService(httpClient);
const paymentService2 = new PaymentService(mockClient);
```

---

## 🎯 مثال 2: إنشاء RTK Query API

```typescript
// src/lip/features/traineePayments/traineePaymentsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const traineePaymentsApi = createApi({
  reducerPath: 'traineePaymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/finances',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['TraineePayment'],
  endpoints: (builder) => ({
    getTraineePayments: builder.query<TraineePaymentResponse[], void>({
      query: () => '/trainee-payments',
      providesTags: ['TraineePayment'],
    }),
    createPayment: builder.mutation<PaymentResponse, PaymentData>({
      query: (data) => ({
        url: '/trainee-payments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TraineePayment'],
    }),
  }),
});

export const {
  useGetTraineePaymentsQuery,
  useCreatePaymentMutation,
} = traineePaymentsApi;
```

---

## 🎯 مثال 3: Custom Hook Pattern

```typescript
// src/hooks/useTraineeAccountActions.ts
import { useState, useCallback } from 'react';
import { useUpdateTraineeAccountStatusMutation } from '@/lip/features/trainee-platform/traineeAccountsApi';
import toast from 'react-hot-toast';

export function useTraineeAccountActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus] = useUpdateTraineeAccountStatusMutation();

  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      await updateStatus({ id, isActive: !currentStatus }).unwrap();
      toast.success(currentStatus ? 'تم إلغاء التفعيل' : 'تم التفعيل');
    } catch (error) {
      toast.error('حدث خطأ');
    } finally {
      setIsLoading(false);
    }
  }, [updateStatus]);

  return { isLoading, handleToggleStatus };
}
```

---

## 🎯 مثال 4: Component with State Management

```typescript
// src/app/TraineePayments/page.tsx
"use client";

import { useState, useMemo } from 'react';
import { useGetTraineePaymentsQuery } from '@/lip/features/traineePayments/traineePaymentsApi';

export default function TraineePayments() {
  const { data: payments, isLoading, error } = useGetTraineePaymentsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics
  const stats = useMemo(() => {
    if (!payments?.length) return { total: 0, paid: 0, remaining: 0 };
    
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const paid = payments.reduce((sum, p) => sum + p.paidAmount, 0);
    
    return { total, paid, remaining: total - paid };
  }, [payments]);

  // Filter payments
  const filteredPayments = useMemo(() => {
    if (!searchTerm) return payments || [];
    return payments?.filter(p => 
      p.trainee.nameAr.includes(searchTerm)
    ) || [];
  }, [payments, searchTerm]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">مدفوعات المتدربين</h1>
      
      <input
        type="text"
        placeholder="البحث..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded"
      />
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="الإجمالي" value={stats.total} />
        <StatCard title="المدفوع" value={stats.paid} />
        <StatCard title="المتبقي" value={stats.remaining} />
      </div>
      
      <PaymentsTable payments={filteredPayments} />
    </div>
  );
}
```

---

## 🎯 مثال 5: Validation Schema

```typescript
// src/Schema/login.ts
import * as yup from "yup";

export const LoginSchema = yup.object({
  nationalId: yup
    .string()
    .required("الرقم القومي مطلوب")
    .matches(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقم"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
}).required();

// Usage with React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nationalId')} />
      {errors.nationalId && <span>{errors.nationalId.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">تسجيل الدخول</button>
    </form>
  );
}
```

---

## 🎯 مثال 6: Error Handling

```typescript
// Centralized error handling
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'حدث خطأ غير متوقع';
}

// Usage
async function handleSubmit(data: FormData) {
  try {
    await submitData(data);
    toast.success('تم الحفظ بنجاح');
  } catch (error) {
    const message = handleApiError(error);
    toast.error(message);
  }
}
```

---

## 🎯 مثال 7: Performance Optimization

```typescript
// Using useMemo and useCallback
function PaymentsList({ payments }: { payments: Payment[] }) {
  // Memoize expensive calculations
  const stats = useMemo(() => ({
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    count: payments.length
  }), [payments]);

  // Memoize callbacks
  const handleDelete = useCallback((id: number) => {
    deletePayment(id);
  }, []);

  return (
    <div>
      <div>Total: {stats.total}</div>
      {payments.map(p => (
        <PaymentItem 
          key={p.id} 
          payment={p} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
}
```

---

## 📝 ملاحظات مهمة

### عند إضافة ميزة جديدة:
1. ✅ أنشئ Types أولاً
2. ✅ أنشئ API Slice
3. ✅ سجل API في Store
4. ✅ أنشئ Components
5. ✅ أنشئ Page
6. ✅ أضف الرابط في Sidebar

### Best Practices:
- استخدم TypeScript بشكل صارم
- اتبع مبادئ SOLID
- استخدم Custom Hooks للمنطق المشترك
- استخدم useMemo و useCallback للأداء
- اكتب Tests للكود الجديد

---

**للمزيد من التفاصيل، راجع:**
- `PROJECT_ARCHITECTURE.md` - المعمارية الكاملة
- `DEVELOPER_GUIDE.md` - دليل المطور الشامل

**تاريخ التحديث:** 24 نوفمبر 2024