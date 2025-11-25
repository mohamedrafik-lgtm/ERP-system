# 👨‍💻 دليل المطور - نظام إدارة التدريب

## 🎯 مقدمة

هذا الدليل موجه للمطورين الجدد الذين سينضمون إلى المشروع. يحتوي على كل ما تحتاجه لفهم المشروع والبدء في التطوير بسرعة.

---

## 📚 قبل البدء

### المتطلبات الأساسية
```bash
✅ Node.js 18+ installed
✅ npm or yarn installed
✅ Git installed
✅ VS Code (recommended)
✅ معرفة أساسية بـ TypeScript
✅ معرفة أساسية بـ React & Next.js
✅ معرفة أساسية بـ Redux
```

### الإعداد الأولي
```bash
# 1. Clone المشروع
git clone [repository-url]
cd ERP-system

# 2. تثبيت Dependencies
npm install

# 3. تشغيل المشروع
npm run dev

# 4. فتح المتصفح
# http://localhost:3000
```

---

## 🏗️ فهم البنية الأساسية

### 1. **هيكل المجلدات الرئيسية**

```
src/
├── app/              # الصفحات (Next.js App Router)
├── components/       # المكونات القابلة لإعادة الاستخدام
├── lip/             # Redux Store & APIs
├── services/        # Business Logic
├── types/           # TypeScript Types
├── utils/           # Utility Functions
└── Schema/          # Validation Schemas
```

### 2. **Flow البيانات**

```
User Action
    ↓
Component
    ↓
Redux Action / RTK Query
    ↓
API Service
    ↓
Backend API
    ↓
Response
    ↓
Redux Store Update
    ↓
Component Re-render
```

---

## 🎨 معايير الكود

### 1. **Naming Conventions**

```typescript
// ✅ Components: PascalCase
export default function TraineePaymentsTable() {}

// ✅ Functions: camelCase
function calculateTotalAmount() {}

// ✅ Constants: UPPER_SNAKE_CASE
const MAX_PAYMENT_AMOUNT = 10000;

// ✅ Interfaces: PascalCase with 'I' prefix
interface IPaymentData {}

// ✅ Types: PascalCase
type PaymentStatus = 'PAID' | 'PENDING';

// ✅ Files: kebab-case or PascalCase
// trainee-payments-table.tsx or TraineePaymentsTable.tsx
```

### 2. **TypeScript Best Practices**

```typescript
// ✅ استخدم Types بدلاً من any
interface User {
  id: number;
  name: string;
}

// ❌ تجنب any
const user: any = {};

// ✅ استخدم Union Types
type Status = 'active' | 'inactive' | 'pending';

// ✅ استخدم Optional Properties
interface Config {
  apiUrl: string;
  timeout?: number; // optional
}

// ✅ استخدم Generics
function getData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}
```

### 3. **Component Structure**

```typescript
// ✅ البنية الموصى بها
"use client"; // إذا كان client component

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Types
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

// Component
export default function MyComponent({ title, onSubmit }: Props) {
  // 1. Hooks
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector(state => state.data);
  
  // 2. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 3. Handlers
  const handleClick = () => {
    setIsOpen(true);
  };
  
  // 4. Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

---

## 🔧 إضافة ميزة جديدة

### خطوة بخطوة: إضافة صفحة جديدة

#### 1. **إنشاء Types**

```typescript
// src/types/my-feature.ts
export interface MyFeatureData {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface MyFeatureResponse {
  data: MyFeatureData[];
  total: number;
}

export interface MyFeatureFilters {
  search?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}
```

#### 2. **إنشاء API Slice**

```typescript
// src/lip/features/my-feature/myFeatureApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MyFeatureData, MyFeatureResponse, MyFeatureFilters } from '@/types/my-feature';
import Cookies from 'js-cookie';

export const myFeatureApi = createApi({
  reducerPath: 'myFeatureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['MyFeature'],
  endpoints: (builder) => ({
    // GET: جلب البيانات
    getMyFeatures: builder.query<MyFeatureResponse, MyFeatureFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.search) params.append('search', filters.search);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        
        return `/my-features?${params.toString()}`;
      },
      providesTags: ['MyFeature'],
    }),
    
    // GET: جلب عنصر واحد
    getMyFeatureById: builder.query<MyFeatureData, number>({
      query: (id) => `/my-features/${id}`,
      providesTags: (result, error, id) => [{ type: 'MyFeature', id }],
    }),
    
    // POST: إنشاء جديد
    createMyFeature: builder.mutation<MyFeatureData, Partial<MyFeatureData>>({
      query: (data) => ({
        url: '/my-features',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MyFeature'],
    }),
    
    // PATCH: تحديث
    updateMyFeature: builder.mutation<MyFeatureData, { id: number; data: Partial<MyFeatureData> }>({
      query: ({ id, data }) => ({
        url: `/my-features/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'MyFeature', id }, 'MyFeature'],
    }),
    
    // DELETE: حذف
    deleteMyFeature: builder.mutation<void, number>({
      query: (id) => ({
        url: `/my-features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyFeature'],
    }),
  }),
});

// Export hooks
export const {
  useGetMyFeaturesQuery,
  useGetMyFeatureByIdQuery,
  useCreateMyFeatureMutation,
  useUpdateMyFeatureMutation,
  useDeleteMyFeatureMutation,
} = myFeatureApi;
```

#### 3. **تسجيل API في Store**

```typescript
// src/lip/store.ts
import { myFeatureApi } from './features/my-feature/myFeatureApi';

export const store = configureStore({
  reducer: {
    // ... existing reducers
    [myFeatureApi.reducerPath]: myFeatureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // ... existing middlewares
      myFeatureApi.middleware,
    ),
});
```

#### 4. **إنشاء Components**

```typescript
// src/components/MyFeature/MyFeatureTable.tsx
"use client";

import { MyFeatureData } from '@/types/my-feature';

interface Props {
  data: MyFeatureData[];
  onEdit: (item: MyFeatureData) => void;
  onDelete: (id: number) => void;
}

export default function MyFeatureTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-right">الاسم</th>
            <th className="px-6 py-3 text-right">الحالة</th>
            <th className="px-6 py-3 text-right">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded ${
                  item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 ml-4"
                >
                  تعديل
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### 5. **إنشاء Page**

```typescript
// src/app/MyFeature/page.tsx
"use client";

import { useState } from 'react';
import { useGetMyFeaturesQuery, useDeleteMyFeatureMutation } from '@/lip/features/my-feature/myFeatureApi';
import MyFeatureTable from '@/components/MyFeature/MyFeatureTable';
import toast from 'react-hot-toast';

export default function MyFeaturePage() {
  const [filters, setFilters] = useState({ search: '', status: undefined });
  
  // RTK Query hooks
  const { data, isLoading, error, refetch } = useGetMyFeaturesQuery(filters);
  const [deleteItem] = useDeleteMyFeatureMutation();
  
  // Handlers
  const handleEdit = (item) => {
    console.log('Edit:', item);
    // Navigate to edit page or open modal
  };
  
  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      try {
        await deleteItem(id).unwrap();
        toast.success('تم الحذف بنجاح');
      } catch (error) {
        toast.error('حدث خطأ أثناء الحذف');
      }
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">حدث خطأ في تحميل البيانات</p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">إدارة الميزة</h1>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="البحث..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        />
        <select
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">الكل</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>
      
      {/* Table */}
      <MyFeatureTable
        data={data?.data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

#### 6. **إضافة الرابط في Sidebar**

```typescript
// src/components/ui/Sidebar.tsx
const menuSections = [
  // ... existing sections
  {
    title: "القسم الجديد",
    items: [
      {
        name: "إدارة الميزة",
        svg: <YourIcon />,
        url: "/MyFeature"
      }
    ]
  }
];
```

---

## 🎨 إنشاء Service Layer

### مثال: Payment Service

```typescript
// src/services/PaymentService.ts
import { IPaymentValidator, IPaymentCalculator } from '@/types/payment.types';

export class PaymentService {
  constructor(
    private validator: IPaymentValidator,
    private calculator: IPaymentCalculator
  ) {}
  
  async processPayment(data: PaymentData): Promise<PaymentResult> {
    // 1. Validate
    const validation = this.validator.validateFormData(data, data.maxAmount);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    
    // 2. Calculate
    const split = this.calculator.calculatePaymentSplit(
      data.amount, 
      data.paymentCount
    );
    
    if (!split) {
      throw new Error('فشل في حساب تقسيم الدفعات');
    }
    
    // 3. Process
    return {
      success: true,
      message: 'تم معالجة الدفع بنجاح',
      data: split
    };
  }
  
  formatPaymentAmount(amount: number): string {
    return this.calculator.formatAmount(amount, 'EGP');
  }
}

// Usage
const paymentService = new PaymentService(
  new PaymentValidator(),
  new PaymentCalculator()
);
```

---

## 🧪 كتابة Tests

### Component Test Example

```typescript
// src/__tests__/components/MyFeature/MyFeatureTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyFeatureTable from '@/components/MyFeature/MyFeatureTable';

describe('MyFeatureTable', () => {
  const mockData = [
    { id: 1, name: 'Test 1', status: 'active', createdAt: new Date() },
    { id: 2, name: 'Test 2', status: 'inactive', createdAt: new Date() },
  ];
  
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  
  it('renders table with data', () => {
    render(
      <MyFeatureTable 
        data={mockData} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button clicked', () => {
    render(
      <MyFeatureTable 
        data={mockData} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );
    
    const editButtons = screen.getAllByText('تعديل');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
  });
});
```

### Service Test Example

```typescript
// src/__tests__/services/PaymentService.test.ts
import { PaymentService } from '@/services/PaymentService';
import { PaymentValidator } from '@/services/PaymentValidator';
import { PaymentCalculator } from '@/services/PaymentCalculator';

describe('PaymentService', () => {
  let service: PaymentService;
  
  beforeEach(() => {
    service = new PaymentService(
      new PaymentValidator(),
      new PaymentCalculator()
    );
  });
  
  it('processes valid payment', async () => {
    const data = {
      amount: 1000,
      paymentCount: 2,
      maxAmount: 5000,
      safeId: 'safe-1'
    };
    
    const result = await service.processPayment(data);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
  
  it('throws error for invalid amount', async () => {
    const data = {
      amount: 6000,
      paymentCount: 2,
      maxAmount: 5000,
      safeId: 'safe-1'
    };
    
    await expect(service.processPayment(data)).rejects.toThrow();
  });
});
```

---

## 🎯 Best Practices

### 1. **استخدام Custom Hooks**

```typescript
// src/hooks/useMyFeature.ts
import { useState, useCallback } from 'react';
import { useGetMyFeaturesQuery, useCreateMyFeatureMutation } from '@/lip/features/my-feature/myFeatureApi';
import toast from 'react-hot-toast';

export function useMyFeature() {
  const [filters, setFilters] = useState({});
  const { data, isLoading, error, refetch } = useGetMyFeaturesQuery(filters);
  const [create] = useCreateMyFeatureMutation();
  
  const handleCreate = useCallback(async (data) => {
    try {
      await create(data).unwrap();
      toast.success('تم الإنشاء بنجاح');
      refetch();
    } catch (error) {
      toast.error('حدث خطأ');
    }
  }, [create, refetch]);
  
  return {
    data: data?.data || [],
    isLoading,
    error,
    filters,
    setFilters,
    handleCreate,
    refetch
  };
}

// Usage in component
function MyComponent() {
  const { data, isLoading, handleCreate } = useMyFeature();
  // ...
}
```

### 2. **Error Handling Pattern**

```typescript
// Consistent error handling
try {
  const result = await someAsyncOperation();
  toast.success('تم بنجاح');
  return result;
} catch (error) {
  const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
  toast.error(message);
  console.error('Error:', error);
  throw error; // Re-throw if needed
}
```

### 3. **Loading States**

```typescript
// Reusable loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// Usage
if (isLoading) return <LoadingSpinner />;
```

### 4. **Empty States**

```typescript
// Reusable empty state
function EmptyState({ message, action }: { message: string; action?: () => void }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 mb-4">{message}</p>
      {action && (
        <button onClick={action} className="bg-blue-600 text-white px-4 py-2 rounded">
          إضافة جديد
        </button>
      )}
    </div>
  );
}
```

---

## 🐛 Debugging Tips

### 1. **Redux DevTools**
```typescript
// تأكد من تثبيت Redux DevTools Extension
// يمكنك رؤية جميع الـ actions والـ state changes
```

### 2. **Console Logging**
```typescript
// استخدم console.log بحكمة
console.log('Data:', data);
console.table(arrayData); // للـ arrays
console.group('Payment Process'); // للتجميع
console.log('Step 1');
console.log('Step 2');
console.groupEnd();
```

### 3. **React DevTools**
```typescript
// استخدم React DevTools لفحص الـ components والـ props
```

---

## 📚 موارد إضافية

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Project Files
- `PROJECT_ARCHITECTURE.md` - معمارية المشروع
- `FINAL_SUMMARY.md` - ملخص الميزات
- `src/types/README.md` - توثيق الأنواع

---

## ❓ الأسئلة الشائعة

### Q: كيف أضيف endpoint جديد؟
A: أنشئ API slice جديد في `src/lip/features/` وسجله في `store.ts`

### Q: أين أضع Business Logic؟
A: في `src/services/` باستخدام classes تتبع SOLID principles

### Q: كيف أتعامل مع الأخطاء؟
A: استخدم try-catch مع toast notifications للمستخدم

### Q: كيف أختبر الكود؟
A: استخدم Jest + React Testing Library، انظر الأمثلة أعلاه

### Q: كيف أحسن الأداء؟
A: استخدم useMemo, useCallback, وتأكد من RTK Query caching

---

## 🎓 الخطوات التالية

1. ✅ اقرأ `PROJECT_ARCHITECTURE.md`
2. ✅ افهم مبادئ SOLID المطبقة
3. ✅ جرب إضافة ميزة بسيطة
4. ✅ اكتب tests للكود الجديد
5. ✅ راجع الكود مع الفريق

---

**مرحباً بك في الفريق! 🎉**

إذا كان لديك أي أسئلة، لا تتردد في السؤال.

**تاريخ التحديث:** 24 نوفمبر 2024  
**الإصدار:** 1.0