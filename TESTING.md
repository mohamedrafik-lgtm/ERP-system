# دليل الاختبارات - نظام إدارة الموارد المؤسسية (ERP System)

## نظرة عامة

هذا الدليل يوضح كيفية تشغيل وإدارة الاختبارات في مشروع نظام إدارة الموارد المؤسسية.

## المتطلبات

المشروع يحتوي بالفعل على جميع المكتبات المطلوبة للاختبارات:

- **Jest**: إطار عمل الاختبارات
- **@testing-library/react**: مكتبة اختبار مكونات React
- **@testing-library/jest-dom**: توسعات Jest للـ DOM
- **@testing-library/user-event**: محاكاة تفاعلات المستخدم
- **ts-jest**: دعم TypeScript في Jest

## تشغيل الاختبارات

### تشغيل جميع الاختبارات
```bash
npm test
# أو
yarn test
```

### تشغيل الاختبارات في وضع المراقبة
```bash
npm run test:watch
# أو
yarn test:watch
```

### تشغيل الاختبارات مع تقرير التغطية
```bash
npm run test:coverage
# أو
yarn test:coverage
```

### تشغيل الاختبارات في بيئة CI
```bash
npm run test:ci
# أو
yarn test:ci
```

## هيكل الاختبارات

```
src/
├── __tests__/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.test.tsx
│   │   └── page.test.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.test.tsx
│   │   │   ├── AuthGuard.test.tsx
│   │   │   ├── Spinner.test.tsx
│   │   │   └── Skeleton.test.tsx
│   │   └── input.test.tsx
│   ├── lip/
│   │   ├── store.test.ts
│   │   └── features/
│   │       └── auth/
│   │           ├── authSlice.test.ts
│   │           └── login.test.ts
│   ├── Schema/
│   │   └── login.test.ts
│   ├── data/
│   │   └── index.test.ts
│   └── interface/
│       └── index.test.ts
├── jest.config.js
└── jest.setup.js
```

## أنواع الاختبارات

### 1. اختبارات المكونات (Component Tests)
- **Navbar.test.tsx**: اختبار شريط التنقل الرئيسي
- **AuthGuard.test.tsx**: اختبار حارس المصادقة
- **Spinner.test.tsx**: اختبار مؤشر التحميل
- **Skeleton.test.tsx**: اختبار هيكل الصفحة
- **input.test.tsx**: اختبار مكون الإدخال

### 2. اختبارات الصفحات (Page Tests)
- **page.test.tsx**: اختبار الصفحة الرئيسية
- **login/page.test.tsx**: اختبار صفحة تسجيل الدخول

### 3. اختبارات Redux (Redux Tests)
- **store.test.ts**: اختبار متجر Redux
- **authSlice.test.ts**: اختبار شريحة المصادقة
- **login.test.ts**: اختبار API تسجيل الدخول

### 4. اختبارات البيانات (Data Tests)
- **data/index.test.ts**: اختبار البيانات والنماذج
- **interface/index.test.ts**: اختبار الواجهات TypeScript

### 5. اختبارات المخططات (Schema Tests)
- **Schema/login.test.ts**: اختبار مخطط التحقق من تسجيل الدخول

## إعدادات Jest

### jest.config.js
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
```

### jest.setup.js
```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
}))
```

## أمثلة على الاختبارات

### اختبار مكون بسيط
```typescript
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from '@/components/ui/Spinner'

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('animate-spin')
    expect(spinner).toHaveClass('rounded-full')
    expect(spinner).toHaveClass('h-12')
    expect(spinner).toHaveClass('w-12')
  })
})
```

### اختبار مكون مع Redux
```typescript
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Navbar } from '@/components/ui/Navbar'
import authReducer from '@/lip/features/auth/authSlice'

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        },
        token: 'mock-token',
        isAuthenticated: true,
        ...initialState,
      },
    },
  })
}

describe('Navbar Component', () => {
  it('renders user profile section', () => {
    const store = createMockStore()
    
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    )
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })
})
```

### اختبار Redux Slice
```typescript
import authReducer, {
  setCredentials,
  logout,
  checkAuthState,
} from '@/lip/features/auth/authSlice'

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
  }

  it('should set user credentials and authenticate', () => {
    const mockLoginResponse = {
      access_token: 'mock-token-123',
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      },
      success: true,
    }

    const state = authReducer(initialState, setCredentials(mockLoginResponse))
    
    expect(state.user).toEqual(mockLoginResponse.user)
    expect(state.token).toBe('mock-token-123')
    expect(state.isAuthenticated).toBe(true)
  })
})
```

## تغطية الاختبارات

المشروع يهدف إلى تحقيق تغطية اختبارات بنسبة 70% على الأقل:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## أفضل الممارسات

### 1. تسمية الاختبارات
- استخدم أسماء وصفية وواضحة
- اتبع نمط "should" أو "it should"
- اكتب باللغة العربية أو الإنجليزية حسب السياق

### 2. تنظيم الاختبارات
- استخدم `describe` لتجميع الاختبارات ذات الصلة
- استخدم `beforeEach` و `afterEach` للإعداد والتنظيف
- افصل الاختبارات المستقلة عن بعضها

### 3. Mocking
- استخدم Mock للتبعيات الخارجية
- استخدم Mock للـ APIs والـ Redux
- استخدم Mock للـ Next.js components

### 4. اختبارات التفاعل
- اختبر النقر على الأزرار
- اختبر تغيير القيم في الحقول
- اختبر النماذج والتحقق من الصحة

### 5. اختبارات الحالة
- اختبر الحالات المختلفة للمكونات
- اختبر حالات التحميل والأخطاء
- اختبر حالات المصادقة

## استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في Mock**: تأكد من أن جميع الـ Mocks محددة بشكل صحيح
2. **خطأ في Redux**: تأكد من أن المتجر Mock يعمل بشكل صحيح
3. **خطأ في Next.js**: تأكد من أن الـ Image component و Router مموكين

### حل المشاكل

1. تحقق من ملف `jest.setup.js`
2. تأكد من أن جميع الـ imports صحيحة
3. تحقق من أن الـ TypeScript types صحيحة
4. اقرأ رسائل الخطأ بعناية

## إضافة اختبارات جديدة

### 1. إنشاء ملف اختبار جديد
```bash
touch src/__tests__/components/NewComponent.test.tsx
```

### 2. كتابة الاختبارات
```typescript
import React from 'react'
import { render, screen } from '@testing-library/react'
import { NewComponent } from '@/components/NewComponent'

describe('NewComponent', () => {
  it('should render correctly', () => {
    render(<NewComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 3. تشغيل الاختبارات
```bash
npm test NewComponent.test.tsx
```

## الخلاصة

هذا المشروع يحتوي على نظام اختبارات شامل يغطي:

- ✅ جميع المكونات الرئيسية
- ✅ جميع الصفحات
- ✅ Redux store و slices
- ✅ APIs و schemas
- ✅ البيانات والواجهات
- ✅ المكونات المساعدة

الاختبارات مكتوبة بأفضل الممارسات وتوفر تغطية شاملة للكود، مما يضمن جودة عالية واستقرار التطبيق.
