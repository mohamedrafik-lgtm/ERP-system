import { notFound } from 'next/navigation';

// إضافة generateStaticParams للصفحات الديناميكية
export async function generateStaticParams() {
  // إرجاع قائمة فارغة للصفحات الديناميكية
  return [];
}

export default function EditTraineePage() {
  // إعادة توجيه إلى صفحة أخرى أو عرض رسالة خطأ
  notFound();
}