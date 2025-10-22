# دليل البدء السريع - إدارة حسابات المتدربين

## 🚀 البدء السريع (3 خطوات)

### الخيار 1: مع الباك إند (الموصى به)

#### 1️⃣ شغل الباك إند
```bash
cd path/to/backend
npm run dev
```

#### 2️⃣ تأكد من تشغيله
افتح في المتصفح:
```
http://localhost:4000/api/trainee-platform/accounts/stats
```

#### 3️⃣ افتح صفحة إدارة الحسابات
```
http://localhost:3000/AccountManagement
```

✅ **يجب أن ترى الإحصائيات الحقيقية!**

---

### الخيار 2: بدون الباك إند (للاختبار فقط)

#### 1️⃣ افتح الملف
```
src/app/AccountManagement/page.tsx
```

#### 2️⃣ عدّل السطر 3
```typescript
// من:
import { useGetTraineeAccountStatsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi';

// إلى:
import { useGetTraineeAccountStatsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi.mock-simple';
```

#### 3️⃣ احفظ وانتظر إعادة التحميل

✅ **يجب أن ترى بيانات تجريبية!**

⚠️ **لا تنسَ**: عند تشغيل الباك إند، أعد الـ import للأصلي!

---

## 🔍 تحقق من المشاكل

### المشكلة: رسالة خطأ "لا يمكن تحميل الإحصائيات"

#### ✔️ الحل السريع:
```bash
# في PowerShell
netstat -an | findstr :4000
```

**النتيجة المتوقعة:** يجب أن ترى `LISTENING` على المنفذ 4000

**إذا لم ترى شيئاً:**
- الباك إند غير مشغل → شغله!

**إذا رأيت `LISTENING`:**
- افتح: `http://localhost:4000/api/trainee-platform/accounts/stats`
- إذا رأيت JSON → كل شيء يعمل!
- إذا رأيت خطأ → راجع `TROUBLESHOOTING.md`

---

## 📊 البيانات المتوقعة

### إحصائيات الحسابات
```json
{
  "totalAccounts": 1247,       // العدد الإجمالي
  "activeAccounts": 892,       // النشطة
  "inactiveAccounts": 355,     // غير النشطة
  "averageAccountAgeInDays": 145  // المتوسط بالأيام
}
```

---

## 🎯 الوصول للصفحة

### من Dashboard
```
الصفحة الرئيسية → إدارة حسابات المتدربين
```

### من Navbar
```
Navbar → منصة المتدربين → إدارة حسابات المتدربين
```

### مباشرة
```
http://localhost:3000/AccountManagement
```

---

## 💡 نصيحة للمطورين

### للتطوير بدون باك إند:
1. استخدم Mock Data
2. طور الـ UI
3. اختبر التفاعلات
4. عند جاهزية الباك إند، أعد الـ import الأصلي

### للإنتاج:
- استخدم الـ API الحقيقي فقط
- أزل أي mock imports
- اختبر مع بيانات حقيقية

---

## 🆘 محتاج مساعدة؟

1. راجع `TROUBLESHOOTING.md` للحلول التفصيلية
2. راجع `README.md` للتوثيق الكامل
3. راجع `API_ENDPOINTS.md` لتفاصيل الـ API

---

**وقت القراءة:** دقيقتان ⏱️  
**مستوى الصعوبة:** سهل 🟢  
**الحالة:** ✅ جاهز للاستخدام

