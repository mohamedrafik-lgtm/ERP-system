import { LockerDetils } from '@/components/Lockers/LockerDetils';
import { TransactionBoxe } from '@/components/Lockers/TransactionBoxe';


export default function Lokeres() {
  return (
    <main className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* عنوان الصفحة */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الخزائن</h1>
          <p className="text-gray-600 mt-1">إنشاء وإدارة الخزائن والمعاملات المالية</p>
        </header>

        {/* الحاوية الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* صندوق صناديق المعاملات */}
          <TransactionBoxe/>

          {/* صندوق تفاصيل الخزينة */}
          <LockerDetils/>

        </div>
      </div>
    </main>
  );
}
