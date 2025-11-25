# 🏗️ معمارية المشروع - نظام إدارة التدريب (ERP System)

## 📋 نظرة عامة

هذا المشروع هو نظام ERP متكامل لإدارة التدريب مبني باستخدام **Next.js 15** مع **TypeScript** و **Redux Toolkit**. يتبع المشروع مبادئ **SOLID** وأنماط التصميم الحديثة لضمان قابلية الصيانة والتوسع.

---

## 🎯 التقنيات الأساسية

### Frontend Stack
```typescript
{
  "framework": "Next.js 15.3.3",
  "language": "TypeScript 5",
  "ui": "React 19",
  "styling": "Tailwind CSS 4.1.10",
  "stateManagement": "Redux Toolkit 2.8.2 + RTK Query",
  "forms": "React Hook Form 7.58.1 + Yup 1.6.1",
  "animations": "Framer Motion 12.18.1",
  "notifications": "React Hot Toast 2.5.2",
  "icons": "Lucide React + Heroicons",
  "testing": "Jest 30 + React Testing Library"
}
```

### Build & Development
```typescript
{
  "runtime": "Node.js",
  "packageManager": "npm",
  "linting": "ESLint 9",
  "mobile": "Capacitor 7.4.4 (Android)"
}
```

---

## 📁 هيكل المشروع

```
ERP-system/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root Layout
│   │   ├── protected-layout.tsx     # Protected Routes Layout
│   │   ├── page.tsx                 # Dashboard
│   │   ├── login/                   # Authentication Pages
│   │   ├── TraineePayments/         # Trainee Payments Module
│   │   ├── TraineeFees/             # Trainee Fees Module
│   │   ├── AccountManagement/       # Account Management
│   │   ├── PlatformStatistics/      # Platform Statistics
│   │   └── [other-modules]/         # Other Feature Modules
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                      # UI Components (Navbar, Sidebar, etc.)
│   │   ├── TraineePayments/         # Payment Components
│   │   ├── TraineeFees/             # Fees Components
│   │   └── [feature-components]/    # Feature-specific Components
│   │
│   ├── lip/                         # Redux Store (State Management)
│   │   ├── store.ts                 # Store Configuration
│   │   ├── StoreProvider.tsx        # Redux Provider
│   │   └── features/                # Feature Slices
│   │       ├── auth/                # Authentication
│   │       ├── traineePayments/     # Trainee Payments API
│   │       ├── traineeFees/         # Trainee Fees API
│   │       ├── trainee-platform/    # Trainee Platform API
│   │       └── [other-features]/    # Other Feature APIs
│   │
│   ├── services/                    # Business Logic Layer
│   │   ├── abstract/                # Abstract Classes & Interfaces
│   │   │   ├── BaseApiService.ts    # Base API Service
│   │   │   └── StudentApiService.ts # Student API Interface
│   │   ├── implementations/         # Concrete Implementations
│   │   │   ├── HttpStudentApiService.ts
│   │   │   └── MockStudentApiService.ts
│   │   ├── PaymentValidator.ts      # Payment Validation Service
│   │   ├── PaymentCalculator.ts     # Payment Calculation Service
│   │   ├── PaymentProcessor.ts      # Payment Processing Service
│   │   ├── NotificationService.ts   # Notification Service
│   │   └── [other-services]/        # Other Business Services
│   │
│   ├── types/                       # TypeScript Type Definitions
│   │   ├── payment.types.ts         # Payment Types
│   │   ├── api.interfaces.ts        # API Interfaces
│   │   ├── student.types.ts         # Student Types
│   │   ├── trainee-platform.ts      # Trainee Platform Types
│   │   └── [other-types]/           # Other Type Definitions
│   │
│   ├── Schema/                      # Validation Schemas
│   │   ├── login.ts                 # Login Validation
│   │   ├── AddStudent.ts            # Student Form Validation
│   │   └── [other-schemas]/         # Other Validation Schemas
│   │
│   ├── utils/                       # Utility Functions
│   │   ├── traineePaymentUtils.ts   # Payment Utilities
│   │   ├── dateUtils.ts             # Date Utilities
│   │   └── [other-utils]/           # Other Utilities
│   │
│   ├── data/                        # Mock Data & Constants
│   │   ├── mockPlatformStats.ts     # Mock Statistics
│   │   └── [other-mock-data]/       # Other Mock Data
│   │
│   ├── mappers/                     # Data Mappers
│   │   ├── TraineeAccountMapper.ts  # Account Data Mapper
│   │   └── TraineeStatsMapper.ts    # Statistics Mapper
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   └── useTraineeAccountActions.ts
│   │
│   └── middleware.ts                # Next.js Middleware
│
├── public/                          # Static Assets
├── scripts/                         # Build & Test Scripts
├── __tests__/                       # Test Files
└── [config-files]                   # Configuration Files
```

---

## 🏛️ المعمارية العامة

### 1. **Layered Architecture (معمارية الطبقات)**

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (Components, Pages, UI)            │
├─────────────────────────────────────┤
│     State Management Layer          │
│  (Redux Store, RTK Query)           │
├─────────────────────────────────────┤
│     Business Logic Layer            │
│  (Services, Validators, Calculators)│
├─────────────────────────────────────┤
│     Data Access Layer               │
│  (API Services, Mappers)            │
├─────────────────────────────────────┤
│     External APIs                   │
│  (Backend REST APIs)                │
└─────────────────────────────────────┘
```

### 2. **Feature-Based Organization**

كل ميزة (Feature) لها:
- **API Slice** في `lip/features/`
- **Components** في `components/[feature]/`
- **Types** في `types/`
- **Services** في `services/`
- **Pages** في `app/[feature]/`

---

## 🎨 مبادئ SOLID المطبقة

### 1. **Single Responsibility Principle (SRP)**
كل class/service له مسؤولية واحدة فقط:

```typescript
// ✅ مثال: PaymentValidator - مسؤول فقط عن التحقق
export class PaymentValidator implements IPaymentValidator {
  validateAmount(amount: number, maxAmount: number): ValidationResult {
    // التحقق من المبلغ فقط
  }
  
  validatePaymentCount(paymentCount: number): ValidationResult {
    // التحقق من عدد الدفعات فقط
  }
}

// ✅ مثال: PaymentCalculator - مسؤول فقط عن الحسابات
export class PaymentCalculator implements IPaymentCalculator {
  calculatePaymentSplit(amount: number, paymentCount: number): IPaymentSplit {
    // حساب تقسيم الدفعات فقط
  }
}
```

### 2. **Open/Closed Principle (OCP)**
مفتوح للتوسع، مغلق للتعديل:

```typescript
// ✅ يمكن إضافة implementations جديدة دون تعديل الـ interface
export interface IPaymentProcessor {
  processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult>;
}

// Implementation 1: HTTP Payment Processor
export class HttpPaymentProcessor implements IPaymentProcessor {
  async processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult> {
    // معالجة عبر HTTP
  }
}

// Implementation 2: Mock Payment Processor (للاختبار)
export class MockPaymentProcessor implements IPaymentProcessor {
  async processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult> {
    // معالجة وهمية للاختبار
  }
}
```

### 3. **Liskov Substitution Principle (LSP)**
يمكن استبدال الـ implementations دون تأثير:

```typescript
// ✅ BaseStudentApiService يمكن استبداله بأي implementation
export abstract class BaseStudentApiService {
  abstract createStudent(data: IStudentCreateRequest): Promise<IStudentResponse>;
  abstract updateStudent(id: number, data: IStudentUpdateRequest): Promise<IStudentResponse>;
}

// يمكن استخدام HttpStudentApiService
const apiService: BaseStudentApiService = new HttpStudentApiService();

// أو استخدام MockStudentApiService
const apiService: BaseStudentApiService = new MockStudentApiService();
```

### 4. **Interface Segregation Principle (ISP)**
interfaces صغيرة ومتخصصة:

```typescript
// ✅ بدلاً من interface واحد كبير، نقسمه إلى interfaces صغيرة
export interface IPaymentValidator {
  validateAmount(amount: number, maxAmount: number): ValidationResult;
  validatePaymentCount(paymentCount: number): ValidationResult;
}

export interface IPaymentCalculator {
  calculatePaymentSplit(amount: number, paymentCount: number): IPaymentSplit;
  generateQuickAmounts(remainingAmount: number): IQuickAmount[];
}

export interface IAmountFormatter {
  formatAmount(amount: number, currency?: string): string;
  formatCurrency(amount: number, currency: string): string;
}
```

### 5. **Dependency Inversion Principle (DIP)**
الاعتماد على abstractions وليس implementations:

```typescript
// ✅ الاعتماد على IBaseApiService وليس implementation محدد
export interface IBaseApiService {
  get<T>(url: string, params?: Record<string, any>): Promise<IApiResponse<T>>;
  post<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  put<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  patch<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  delete<T>(url: string): Promise<IApiResponse<T>>;
}

// Component يعتمد على interface وليس implementation
function useApiService(): IBaseApiService {
  // يمكن إرجاع أي implementation
  return new HttpApiService(); // أو MockApiService
}
```

---

## 🔄 إدارة الحالة (State Management)

### Redux Toolkit + RTK Query

```typescript
// Store Configuration
export const store = configureStore({
  reducer: {
    // RTK Query APIs
    [traineePaymentsApi.reducerPath]: traineePaymentsApi.reducer,
    [traineeAccountsApi.reducerPath]: traineeAccountsApi.reducer,
    [traineeFeesApi.reducerPath]: traineeFeesApi.reducer,
    // ... other APIs
    
    // Regular Slices
    auth: authReducer,
    lockers: lockersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      traineePaymentsApi.middleware,
      traineeAccountsApi.middleware,
      // ... other middlewares
    ),
});
```

### RTK Query API Pattern

```typescript
// مثال: traineePaymentsApi
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
    // ... other endpoints
  }),
});
```

---

## 🌐 طبقة API

### 1. **RTK Query APIs** (Recommended)
```typescript
// استخدام RTK Query للـ data fetching
const { data, isLoading, error } = useGetTraineePaymentsQuery();
```

### 2. **Service Layer Pattern**
```typescript
// للعمليات المعقدة
export class PaymentProcessor {
  constructor(
    private validator: IPaymentValidator,
    private calculator: IPaymentCalculator
  ) {}
  
  async processPayment(data: PaymentData): Promise<PaymentResult> {
    // 1. Validate
    const validation = this.validator.validateFormData(data);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    
    // 2. Calculate
    const split = this.calculator.calculatePaymentSplit(data.amount, data.count);
    
    // 3. Process
    return await this.submitPayment(split);
  }
}
```

---

## 🔐 نظام المصادقة

### Authentication Flow

```typescript
// 1. Login
const [login] = useLoginMutation();
await login({ nationalId, password });

// 2. Store Token
Cookies.set('access_token', token);

// 3. Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('access_token');
    },
  },
});

// 4. Protected Routes
// في protected-layout.tsx
const token = Cookies.get('access_token');
if (!token) {
  router.push('/login');
}
```

---

## 🎨 أنماط التصميم المستخدمة

### 1. **Repository Pattern**
```typescript
// Abstract Repository
export abstract class BaseStudentApiService {
  abstract getStudents(): Promise<IStudentResponse[]>;
  abstract getStudent(id: number): Promise<IStudentResponse>;
  abstract createStudent(data: IStudentCreateRequest): Promise<IStudentResponse>;
}

// Concrete Implementation
export class HttpStudentApiService extends BaseStudentApiService {
  async getStudents(): Promise<IStudentResponse[]> {
    // HTTP implementation
  }
}
```

### 2. **Factory Pattern**
```typescript
// Service Factory
export class ServiceFactory {
  static createPaymentService(type: 'http' | 'mock'): IPaymentProcessor {
    if (type === 'http') {
      return new HttpPaymentProcessor();
    }
    return new MockPaymentProcessor();
  }
}
```

### 3. **Strategy Pattern**
```typescript
// مثال: مختلف استراتيجيات الدفع
interface PaymentStrategy {
  process(amount: number): Promise<PaymentResult>;
}

class CashPaymentStrategy implements PaymentStrategy {
  async process(amount: number): Promise<PaymentResult> {
    // معالجة الدفع النقدي
  }
}

class CardPaymentStrategy implements PaymentStrategy {
  async process(amount: number): Promise<PaymentResult> {
    // معالجة الدفع بالبطاقة
  }
}
```

### 4. **Observer Pattern**
```typescript
// Redux هو تطبيق لـ Observer Pattern
// Components تشترك في الـ store وتتلقى التحديثات تلقائياً
const payments = useSelector((state) => state.payments);
```

### 5. **Mapper Pattern**
```typescript
// تحويل البيانات من API إلى Domain Models
export class TraineeAccountMapper {
  static toDomain(apiData: ApiTraineeAccount): TraineeAccount {
    return {
      id: apiData.id,
      name: apiData.trainee.nameAr,
      // ... mapping logic
    };
  }
}
```

---

## 📝 Validation & Schema

### Yup Schemas
```typescript
// مثال: Login Schema
export const LoginSchema = yup.object({
  nationalId: yup
    .string()
    .required("الرقم القومي مطلوب")
    .matches(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقم"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});
```

### React Hook Form Integration
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(LoginSchema)
});
```

---

## 🧪 Testing Strategy

### Test Structure
```
src/__tests__/
├── app/                    # Page Tests
├── components/             # Component Tests
├── services/              # Service Tests
├── utils/                 # Utility Tests
└── lip/features/          # API Tests
```

### Testing Tools
- **Jest**: Test Runner
- **React Testing Library**: Component Testing
- **MSW**: API Mocking (if needed)

---

## 🎯 Best Practices المطبقة

### 1. **Type Safety**
```typescript
// ✅ استخدام TypeScript بشكل صارم
interface TraineePayment {
  id: number;
  amount: number;
  trainee: Trainee;
}

// ❌ تجنب any
// const data: any = ...
```

### 2. **Error Handling**
```typescript
// ✅ معالجة الأخطاء بشكل صحيح
try {
  const result = await processPayment(data);
  toast.success('تم الدفع بنجاح');
} catch (error) {
  toast.error(error.message || 'حدث خطأ');
}
```

### 3. **Code Reusability**
```typescript
// ✅ استخدام Custom Hooks
export function useTraineeAccountActions() {
  const [updateStatus] = useUpdateTraineeAccountStatusMutation();
  const [resetPassword] = useResetTraineeAccountPasswordMutation();
  
  return { updateStatus, resetPassword };
}
```

### 4. **Performance Optimization**
```typescript
// ✅ استخدام useMemo & useCallback
const filteredPayments = useMemo(() => {
  return payments.filter(p => p.status === 'PENDING');
}, [payments]);

const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

### 5. **Accessibility**
```typescript
// ✅ استخدام semantic HTML
<button aria-label="إضافة دفعة جديدة">
  <Plus className="w-4 h-4" />
  إضافة
</button>
```

---

## 📦 Module Organization

### Feature Module Structure
```
TraineePayments/
├── page.tsx                 # Main Page
├── [traineeId]/
│   └── page.tsx            # Detail Page
├── components/
│   ├── PaymentHeader.tsx
│   ├── PaymentStats.tsx
│   ├── PaymentFilters.tsx
│   └── TraineePaymentsTable.tsx
├── types/
│   └── payment.ts
├── services/
│   ├── PaymentValidator.ts
│   ├── PaymentCalculator.ts
│   └── PaymentProcessor.ts
└── utils/
    └── traineePaymentUtils.ts
```

---

## 🚀 Performance Considerations

### 1. **Code Splitting**
```typescript
// Next.js automatic code splitting
// كل page يتم تحميله بشكل منفصل
```

### 2. **Image Optimization**
```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  width={120} 
  height={120} 
  alt="Logo"
  priority // للصور المهمة
/>
```

### 3. **API Caching**
```typescript
// RTK Query automatic caching
endpoints: (builder) => ({
  getTraineePayments: builder.query({
    query: () => '/trainee-payments',
    keepUnusedDataFor: 60, // Cache for 60 seconds
  }),
})
```

---

## 🔧 Configuration Files

### Key Configuration Files
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `eslint.config.mjs` - ESLint configuration
- `capacitor.config.ts` - Mobile app configuration

---

## 📚 Documentation Files

- `README.md` - Project overview
- `PROJECT_ARCHITECTURE.md` - This file
- `FINAL_SUMMARY.md` - Feature implementation summary
- `SIDEBAR_MIGRATION_SUMMARY.md` - Sidebar migration details
- `src/types/README.md` - Types documentation
- `src/app/[feature]/README.md` - Feature-specific docs

---

## 🎓 للمطورين الجدد

### Quick Start Checklist
1. ✅ فهم هيكل المجلدات
2. ✅ قراءة مبادئ SOLID المطبقة
3. ✅ فهم Redux Toolkit + RTK Query
4. ✅ مراجعة أمثلة الـ Services
5. ✅ فهم نظام الـ Types
6. ✅ مراجعة أنماط التصميم المستخدمة

### Adding a New Feature
انظر إلى `DEVELOPER_GUIDE.md` (سيتم إنشاؤه في الخطوة التالية)

---

**تاريخ التوثيق:** 24 نوفمبر 2024  
**الإصدار:** 1.0  
**الحالة:** ✅ مكتمل  
**المؤلف:** Architecture Team