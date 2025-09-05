# إصلاح API صفحة TraineePayments

## المشكلة
كانت صفحة TraineePayments تستخدم mock data بدلاً من الاتصال بـ API الحقيقي، مما يمنع جلب البيانات الفعلية من الخادم.

## الحلول المطبقة

### 1. إزالة Mock Data
- ✅ تم إزالة جميع mock data من `traineePaymentsApi.ts`
- ✅ تم حذف البيانات الوهمية والاعتماد على API الحقيقي

### 2. تحديث API Endpoints
- ✅ تم تحديث base URL إلى `http://localhost:4000/api/finances`
- ✅ تم تحديث endpoint إلى `/trainee-fees` كما هو مطلوب
- ✅ تم إضافة جميع العمليات CRUD:
  - `GET /trainee-fees` - جلب جميع المدفوعات
  - `POST /trainee-fees` - إضافة دفعة جديدة
  - `PUT /trainee-fees/:id` - تحديث دفعة موجودة
  - `DELETE /trainee-fees/:id` - حذف دفعة

### 3. إصلاح نظام المصادقة
- ✅ تم تحديث نظام المصادقة لاستخدام `js-cookie`
- ✅ تم إضافة التوكن في header `Authorization: Bearer {token}`
- ✅ تم دعم كل من `access_token` و `auth_token`

### 4. تحسين معالجة الأخطاء
- ✅ تم إضافة معالجة شاملة للأخطاء
- ✅ تم إضافة رسائل خطأ واضحة باللغة العربية
- ✅ تم إضافة إمكانية إعادة المحاولة

## الملفات المعدلة

### 1. `src/lip/features/traineePayments/traineePaymentsApi.ts`
```typescript
// قبل التعديل
const mockTraineePayments = [...]; // mock data
queryFn: async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { data: mockTraineePayments, error: undefined };
}

// بعد التعديل
query: () => '/trainee-fees',
```

### 2. إضافة اختبارات شاملة
- ✅ تم إنشاء `src/__tests__/features/traineePayments/traineePaymentsApi.test.ts`
- ✅ تم اختبار جميع العمليات CRUD
- ✅ تم اختبار نظام المصادقة
- ✅ تم اختبار معالجة الأخطاء

## كيفية الاستخدام

### 1. جلب المدفوعات
```typescript
const { data, isLoading, error, refetch } = useGetTraineePaymentsQuery();
```

### 2. إضافة دفعة جديدة
```typescript
const [addPayment] = useAddTraineePaymentMutation();

await addPayment({
  traineeId: 1,
  amount: 1000,
  safeId: '1',
  notes: 'دفعة جديدة'
});
```

### 3. تحديث دفعة موجودة
```typescript
const [updatePayment] = useUpdateTraineePaymentMutation();

await updatePayment({
  id: 1,
  amount: 2000,
  safeId: '2',
  notes: 'تحديث الدفعة'
});
```

### 4. حذف دفعة
```typescript
const [deletePayment] = useDeleteTraineePaymentMutation();

await deletePayment(1);
```

## متطلبات الخادم

يجب أن يكون الخادم يدعم:

### 1. Endpoint: `GET /api/finances/trainee-fees`
**Response:**
```json
[
  {
    "id": 1,
    "amount": 2500,
    "status": "PAID",
    "paidAmount": 2500,
    "paidAt": "2024-01-15T10:30:00Z",
    "notes": "دفعة كاملة",
    "fee": {
      "id": 1,
      "name": "رسوم البرمجة المتقدمة",
      "amount": 2500,
      "type": "TRAINING"
    },
    "trainee": {
      "id": 1,
      "name": "أحمد محمد"
    },
    "safe": {
      "id": "1",
      "name": "الخزينة الرئيسية"
    },
    "transactions": [
      {
        "id": "1",
        "amount": 2500,
        "type": "PAYMENT",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
]
```

### 2. Endpoint: `POST /api/finances/trainee-fees`
**Request Body:**
```json
{
  "traineeId": 1,
  "amount": 1000,
  "safeId": "1",
  "notes": "دفعة جديدة"
}
```

### 3. Endpoint: `PUT /api/finances/trainee-fees/:id`
**Request Body:**
```json
{
  "amount": 2000,
  "safeId": "2",
  "notes": "تحديث الدفعة"
}
```

### 4. Endpoint: `DELETE /api/finances/trainee-fees/:id`
**Response:** `204 No Content`

## المصادقة

يجب أن يدعم الخادم JWT authentication:
- Header: `Authorization: Bearer {token}`
- يجب أن يكون التوكن صالحاً ومفعل

## اختبار التكامل

```bash
# تشغيل الاختبارات
npm test src/__tests__/features/traineePayments/traineePaymentsApi.test.ts

# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات مع التغطية
npm run test:coverage
```

## ملاحظات مهمة

1. **تأكد من تشغيل الخادم** على `http://localhost:4000`
2. **تأكد من صحة التوكن** في cookies
3. **تأكد من دعم CORS** في الخادم
4. **تأكد من صحة response format** من الخادم

## استكشاف الأخطاء

### 1. خطأ 401 Unauthorized
- تحقق من صحة التوكن في cookies
- تحقق من إرسال التوكن في header

### 2. خطأ 404 Not Found
- تحقق من صحة URL endpoint
- تحقق من تشغيل الخادم

### 3. خطأ 500 Internal Server Error
- تحقق من logs الخادم
- تحقق من صحة البيانات المرسلة

### 4. مشاكل CORS
- تأكد من إعداد CORS في الخادم
- تأكد من السماح بـ `http://localhost:3000`

## التحسينات المستقبلية

1. **إضافة Pagination** للبيانات الكبيرة
2. **إضافة Filtering** متقدم
3. **إضافة Real-time updates** مع WebSocket
4. **إضافة Caching** للبيانات
5. **إضافة Offline support** مع Service Worker

---

✅ **تم إصلاح المشكلة بنجاح!** 

الآن صفحة TraineePayments تتصل بـ API الحقيقي على `/api/finances/trainee-fees` بدلاً من استخدام mock data.
