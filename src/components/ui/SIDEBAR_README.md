# Sidebar Component

## 📝 نظرة عامة

الـ **Sidebar** هو مكون تنقل جانبي عصري وديناميكي يحل محل الـ Navbar التقليدي. تم تصميمه ليكون قابلاً للطي والتوسع، مع دعم كامل للأجهزة المحمولة.

---

## ✨ الميزات الرئيسية

### 1. قابل للطي والتوسع
- **وضع موسّع (72rem)**: يعرض جميع النصوص والأيقونات
- **وضع مصغّر (20rem)**: يعرض الأيقونات فقط
- انتقال سلس بين الوضعين

### 2. قوائم قابلة للطي
- كل قسم يمكن فتحه/إغلاقه
- حفظ حالة الأقسام المفتوحة
- رسوم متحركة سلسة

### 3. تصميم متجاوب
- **Desktop**: Sidebar ثابت على الجانب
- **Mobile**: قائمة منبثقة مع overlay
- زر hamburger للأجهزة الصغيرة

### 4. تمييز الصفحة النشطة
- الرابط النشط له خلفية gradient ملونة
- تأثيرات hover للروابط الأخرى

### 5. قسم المستخدم
- عرض اسم وبريد المستخدم
- زر تسجيل خروج مميز
- تصميم مختلف للوضع المصغّر

---

## 🎨 التصميم

### الألوان
```css
- خلفية: gradient from-white to-gray-50
- رابط نشط: gradient from-orange-500 to-blue-500
- رابط عادي: gray-700
- hover: gray-100
```

### الأبعاد
```css
- وضع موسّع: w-72 (288px)
- وضع مصغّر: w-20 (80px)
- ارتفاع: h-screen (100vh)
```

---

## 🗂️ بنية الأقسام

### 1. المتدربين
- إضافة متدرب
- البحث في المتدربين
- إدارة المحتوى التدريبي
- السكاشن
- أرشيف المتدربين

### 2. المستخدمين والصلاحيات
- المستخدمين
- الصلاحيات

### 3. التسويق
- المسوقين
- إضافة مسوق
- تحديد التارجت
- الحملات التسويقية
- العمولات

### 4. المالية
- رسوم المتدربين
- المدفوعات
- شجرة القيود المالية
- البيانات المالية
- تقارير المتدربين المالية
- طلبات الصرف والدفع

### 5. إدارة الكرنيهات
- إدارة الكرنيهات
- إحصائيات الكرنيهات
- طباعة الكرنيهات
- تصميمات الكرنيهات

### 6. منصة المتدربين
- إدارة حسابات المتدربين
- إحصائيات المنصة الشاملة
- إحصائيات منصة المتدربين

---

## 🔧 الاستخدام

### في `protected-layout.tsx`
```typescript
import Sidebar from "@/components/ui/Sidebar";

return (
  <AuthGuard>
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  </AuthGuard>
);
```

### State Management
```typescript
const [isOpen, setIsOpen] = useState(true); // حالة الفتح/الإغلاق
const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["المتدربين"])); // الأقسام المفتوحة
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // قائمة الموبايل
```

---

## 📱 الدعم للأجهزة المختلفة

### Desktop (lg وأكبر)
```typescript
- Sidebar ثابت على الجانب الأيمن
- زر toggle للطي والتوسع
- لا يوجد overlay
```

### Mobile (أصغر من lg)
```typescript
- زر hamburger في أعلى اليسار
- Sidebar منبثق من اليمين
- overlay داكن في الخلفية
- يغلق عند الضغط خارج السidebar
```

---

## 🎯 الوظائف الرئيسية

### 1. toggleSection
```typescript
const toggleSection = (title: string) => {
  setExpandedSections((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(title)) {
      newSet.delete(title);
    } else {
      newSet.add(title);
    }
    return newSet;
  });
};
```

### 2. isActive
```typescript
const isActive = (url: string) => pathname === url;
```

### 3. handleLogout
```typescript
const handleLogout = useCallback(() => {
  dispatch(logout());
  router.push("/login");
  if (typeof window !== "undefined") {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}, [dispatch, router]);
```

---

## 🎨 التخصيص

### إضافة قسم جديد
```typescript
{
  title: "القسم الجديد",
  items: [
    {
      name: "عنصر جديد",
      svg: <YourIcon className="w-5 h-5" />,
      url: "/new-item",
    },
  ],
},
```

### تغيير الألوان
```typescript
// في الـ className للرابط النشط
className={`... ${
  isActive(item.url)
    ? "bg-gradient-to-r from-your-color to-your-other-color text-white"
    : "text-gray-600 hover:bg-gray-100"
}`}
```

### تغيير العرض
```typescript
// في الـ aside className
className={`... ${
  isOpen ? "w-your-expanded-width" : "w-your-collapsed-width"
}`}
```

---

## 🔄 الانتقالات والرسوم المتحركة

### Sidebar Toggle
```css
transition-all duration-300
```

### Section Expand/Collapse
```css
transition-transform (للأيقونة)
```

### Link Hover
```css
transition-all (للخلفية والألوان)
```

### Mobile Menu
```css
translate-x-full lg:translate-x-0 (للظهور/الاختفاء)
```

---

## 📊 الحالات المختلفة

### 1. الحالة الافتراضية
- Sidebar مفتوح
- قسم "المتدربين" موسّع
- لا توجد صفحة نشطة

### 2. حالة الطي
- Sidebar مغلق (عرض 80px)
- الأيقونات فقط ظاهرة
- tooltips عند الـ hover (في الوضع المصغّر)

### 3. حالة Mobile
- Sidebar مخفي افتراضياً
- يظهر عند الضغط على زر hamburger
- overlay في الخلفية

---

## 🐛 استكشاف الأخطاء

### المشكلة: Sidebar لا يظهر على Mobile
**الحل:**
```typescript
// تأكد من أن الـ className يحتوي على:
className={`... ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
```

### المشكلة: الأقسام لا تفتح/تغلق
**الحل:**
```typescript
// تحقق من أن toggleSection يتم استدعاؤه صحيحاً
onClick={() => toggleSection(section.title)}
```

### المشكلة: الصفحة النشطة لا تتمييز
**الحل:**
```typescript
// تأكد من استخدام usePathname() من next/navigation
const pathname = usePathname();
const isActive = (url: string) => pathname === url;
```

---

## 💡 نصائح الأداء

### 1. استخدام useMemo
```typescript
const menuSections: MenuSection[] = useMemo(() => [...], []);
```

### 2. استخدام useCallback
```typescript
const handleLogout = useCallback(() => {...}, [dispatch, router]);
```

### 3. Lazy Loading للأيقونات
```typescript
// إذا كان لديك الكثير من الأيقونات، استخدم dynamic import
const Icon = dynamic(() => import('@heroicons/react/24/outline'));
```

---

## 📝 ملاحظات مهمة

1. ⚠️ **RTL Support**: الـ Sidebar مصمم للعمل مع `dir="rtl"`
2. 🎨 **Custom Scrollbar**: يحتاج إلى CSS مخصص في `globals.css`
3. 📱 **Mobile First**: تصميم متجاوب من الأساس
4. 🔒 **Protected**: يستخدم مع `AuthGuard` للحماية
5. 🎯 **Active Link**: يتطلب `usePathname()` من Next.js

---

## 🔜 تحسينات مستقبلية

- [ ] إضافة search في القائمة
- [ ] إضافة shortcuts للصفحات
- [ ] إضافة notifications counter
- [ ] إضافة dark mode
- [ ] إضافة keyboard navigation
- [ ] إضافة drag-to-reorder للأقسام

---

**تاريخ الإنشاء:** 21 يناير 2024  
**الحالة:** ✅ مكتمل ويعمل  
**النسخة:** 1.0.0  
**المطور:** ERP System Team

