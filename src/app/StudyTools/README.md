# 🛠️ نظام إدارة الأدوات الدراسية

## 📋 نظرة عامة

نظام متكامل لإدارة الأدوات والمستلزمات الدراسية مع تتبع التسليم والإرجاع للمتدربين.

---

## 🎯 الميزات

### 1. إدارة الأدوات الدراسية (`/StudyTools`)
- ✅ عرض قائمة الأدوات الدراسية
- ✅ إضافة أداة جديدة
- ✅ تعديل بيانات الأداة
- ✅ حذف أداة
- ✅ البحث والفلترة (حسب الاسم، الفئة، الحالة)
- ✅ عرض إحصائيات شاملة
- ✅ تتبع المخزون (متوفر، مخزون منخفض، نفذ المخزون)

### 2. تتبع التسليم (`/DeliveryTracking`)
- ✅ عرض سجلات التسليم
- ✅ تسجيل تسليم جديد
- ✅ تسجيل إرجاع الأدوات
- ✅ تتبع الحالة (مسلم، مرتجع، متأخر)
- ✅ البحث والفلترة
- ✅ عرض إحصائيات التسليم

---

## 📡 API Endpoints

### Study Tools Endpoints

#### 1. Get All Study Tools
```
GET /api/study-tools
```

**Query Parameters:**
- `search` (string, optional): البحث في الاسم
- `category` (string, optional): الفئة
- `status` (string, optional): الحالة (available, low_stock, out_of_stock)
- `page` (number, optional): رقم الصفحة
- `limit` (number, optional): عدد العناصر في الصفحة
- `sortBy` (string, optional): الترتيب حسب
- `sortOrder` (string, optional): اتجاه الترتيب (asc, desc)

**Response:**
```typescript
{
  "data": [
    {
      "id": 1,
      "name": "كتاب البرمجة",
      "nameEn": "Programming Book",
      "category": "كتب",
      "quantity": 50,
      "availableQuantity": 45,
      "price": 100,
      "description": "كتاب تعليمي للبرمجة",
      "status": "available",
      "imageUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

#### 2. Get Study Tool by ID
```
GET /api/study-tools/:id
```

#### 3. Create Study Tool
```
POST /api/study-tools
```

**Request Body:**
```typescript
{
  "name": "كتاب البرمجة",
  "nameEn": "Programming Book",
  "category": "كتب",
  "quantity": 50,
  "price": 100,
  "description": "كتاب تعليمي للبرمجة",
  "imageUrl": "https://..."
}
```

#### 4. Update Study Tool
```
PATCH /api/study-tools/:id
```

**Request Body:** (جميع الحقول اختيارية)
```typescript
{
  "name": "كتاب البرمجة المحدث",
  "quantity": 60,
  "price": 120
}
```

#### 5. Delete Study Tool
```
DELETE /api/study-tools/:id
```

#### 6. Get Study Tools Statistics
```
GET /api/study-tools/stats
```

**Response:**
```typescript
{
  "totalTools": 50,
  "totalQuantity": 500,
  "totalValue": 50000,
  "lowStockCount": 5,
  "outOfStockCount": 2,
  "categoriesCount": 8
}
```

---

### Delivery Tracking Endpoints

#### 1. Get All Deliveries
```
GET /api/delivery-tracking
```

**Query Parameters:**
- `search` (string, optional): البحث في اسم المتدرب أو الأداة
- `traineeId` (number, optional): معرف المتدرب
- `studyToolId` (number, optional): معرف الأداة
- `status` (string, optional): الحالة (delivered, returned, overdue)
- `startDate` (string, optional): من تاريخ
- `endDate` (string, optional): إلى تاريخ
- `page` (number, optional): رقم الصفحة
- `limit` (number, optional): عدد العناصر

**Response:**
```typescript
{
  "data": [
    {
      "id": 1,
      "traineeId": 123,
      "studyToolId": 456,
      "quantity": 2,
      "deliveryDate": "2024-01-01T00:00:00.000Z",
      "returnDate": null,
      "status": "delivered",
      "notes": "تسليم عادي",
      "deliveredBy": "أحمد محمد",
      "trainee": {
        "id": 123,
        "nameAr": "محمد أحمد",
        "nameEn": "Mohamed Ahmed",
        "phone": "01234567890",
        "program": {
          "id": 1,
          "nameAr": "برنامج البرمجة"
        }
      },
      "studyTool": {
        "id": 456,
        "name": "كتاب البرمجة",
        "category": "كتب"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

#### 2. Get Delivery by ID
```
GET /api/delivery-tracking/:id
```

#### 3. Create Delivery
```
POST /api/delivery-tracking
```

**Request Body:**
```typescript
{
  "traineeId": 123,
  "studyToolId": 456,
  "quantity": 2,
  "deliveryDate": "2024-01-01T00:00:00.000Z",
  "notes": "تسليم عادي"
}
```

#### 4. Update Delivery (Mark as Returned)
```
PATCH /api/delivery-tracking/:id
```

**Request Body:**
```typescript
{
  "status": "returned",
  "returnDate": "2024-01-15T00:00:00.000Z",
  "notes": "تم الإرجاع بحالة جيدة"
}
```

#### 5. Delete Delivery
```
DELETE /api/delivery-tracking/:id
```

#### 6. Get Delivery Statistics
```
GET /api/delivery-tracking/stats
```

**Response:**
```typescript
{
  "totalDeliveries": 150,
  "activeDeliveries": 45,
  "returnedDeliveries": 100,
  "overdueDeliveries": 5,
  "totalToolsDelivered": 300
}
```

---

## 🗂️ هيكل الملفات

```
src/
├── types/
│   └── studyTools.ts                    # TypeScript Types
├── lip/features/studyTools/
│   └── studyToolsApi.ts                 # RTK Query API
├── app/
│   ├── StudyTools/
│   │   ├── page.tsx                     # صفحة الأدوات الدراسية
│   │   └── README.md                    # هذا الملف
│   └── DeliveryTracking/
│       └── page.tsx                     # صفحة تتبع التسليم
└── components/ui/
    └── Sidebar.tsx                      # القائمة الجانبية (محدثة)
```

---

## 🎨 الاستخدام

### في Component

```typescript
import {
  useGetStudyToolsQuery,
  useCreateStudyToolMutation,
  useUpdateStudyToolMutation,
  useDeleteStudyToolMutation,
} from '@/lip/features/studyTools/studyToolsApi';

function MyComponent() {
  // Get all tools
  const { data, isLoading, error } = useGetStudyToolsQuery({
    search: 'كتاب',
    category: 'كتب',
    status: 'available',
  });

  // Create tool
  const [createTool] = useCreateStudyToolMutation();
  
  const handleCreate = async () => {
    try {
      await createTool({
        name: 'كتاب جديد',
        category: 'كتب',
        quantity: 50,
        price: 100,
      }).unwrap();
      toast.success('تم الإضافة بنجاح');
    } catch (error) {
      toast.error('حدث خطأ');
    }
  };

  return <div>...</div>;
}
```

---

## 🔧 التخصيص

### إضافة فئة جديدة

في ملف `src/app/StudyTools/page.tsx`:

```typescript
<select>
  <option value="">جميع الفئات</option>
  <option value="كتب">كتب</option>
  <option value="أقلام">أقلام</option>
  <option value="أدوات مختبر">أدوات مختبر</option>
  <option value="فئة جديدة">فئة جديدة</option> {/* أضف هنا */}
</select>
```

### تعديل حالات الأدوات

في ملف `src/types/studyTools.ts`:

```typescript
export interface StudyTool {
  // ...
  status: 'available' | 'low_stock' | 'out_of_stock' | 'new_status'; // أضف حالة جديدة
}
```

---

## 🐛 استكشاف الأخطاء

### المشكلة: لا تظهر البيانات

**الحل:**
1. تأكد من تشغيل الباك إند على `http://localhost:4000`
2. تحقق من الـ API endpoints في الباك إند
3. افتح Developer Tools وتحقق من Network tab

### المشكلة: خطأ في التسجيل

**الحل:**
1. تأكد من صحة البيانات المرسلة
2. تحقق من الـ validation في الباك إند
3. راجع الـ console للأخطاء

---

## 📝 ملاحظات

- جميع التواريخ بصيغة ISO 8601
- الأسعار بالجنيه المصري
- الكميات أرقام صحيحة موجبة
- الحالة `low_stock` تظهر عندما تكون الكمية المتاحة أقل من 10
- الحالة `out_of_stock` تظهر عندما تكون الكمية المتاحة = 0
- الحالة `overdue` تظهر عندما يتأخر الإرجاع عن الموعد المحدد

---

## 🚀 التطوير المستقبلي

- [ ] إضافة نظام الإشعارات للتسليمات المتأخرة
- [ ] إضافة تقارير مفصلة
- [ ] إضافة نظام الباركود للأدوات
- [ ] إضافة صور للأدوات
- [ ] إضافة نظام الحجز المسبق
- [ ] إضافة تكامل مع نظام المخزون

---

**تاريخ الإنشاء:** 24 نوفمبر 2024  
**الإصدار:** 1.0.0  
**الحالة:** ✅ جاهز للاستخدام