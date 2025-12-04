 

"use client";
import { useRouter, useParams } from "next/navigation";
import { useGetStudentQuery } from "@/lip/features/student/student";
import { Printer } from "lucide-react";

export default function EnrollmentCertificatePage() {
  const router = useRouter();
  const params = useParams();
  const traineeId = parseInt(params.traineeId as string);
  const { data: trainee, isLoading, error } = useGetStudentQuery({ id: traineeId });
  
  const handlePrint = () => {
    window.print();
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  
  if (error || !trainee) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 mb-2">حدث خطأ</h3>
          <p className="text-gray-600 mb-4">لم يتم العثور على بيانات المتدرب</p>
          <button onClick={() => router.back()} className="px-6 py-2 bg-blue-600 text-white rounded-lg">رجوع</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="print:hidden fixed top-4 left-4 z-50">
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg font-semibold">
          <Printer className="w-5 h-5" />
          طباعة إثبات القيد
        </button>
      </div>
      
      <div className="max-w-3xl mx-auto p-12" dir="rtl">
        <div className="bg-white p-16 border-2 border-gray-300">
          <div className="text-center mb-12">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-bold mb-6 hover:bg-blue-700 transition-colors">
              طباعة إثبات القيد
            </button>
            <h1 className="text-4xl font-black text-gray-900 mb-4">مقيد/ة لدينا بالمركز</h1>
          </div>
          
          <div className="text-center space-y-6 mb-12">
            <p className="text-xl text-gray-800 leading-relaxed">
              و قد اعطيت له هذه الشهادة بناء على طلبه و تحت مسئوليته الشخصية الى من يهمه الامر
            </p>
            <p className="text-xl text-gray-800">من يومه الامر</p>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-2xl font-bold text-gray-900">تحريراً في: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 mb-16">
            <div className="text-right">
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="font-bold text-xl text-gray-900">الاسم:</span>
                <span className="text-xl text-gray-800">{trainee.nameAr}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="font-bold text-xl text-gray-900">القسم:</span>
                <span className="text-xl text-gray-800">{trainee.program?.nameAr || 'غير محدد'}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="font-bold text-xl text-gray-900">الرقم القومي:</span>
                <span className="text-xl text-gray-800 font-mono">{trainee.nationalId}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="font-bold text-xl text-gray-900">مساعد خدمات صحية</span>
                <span className="text-xl text-gray-800"></span>
              </div>
            </div>
            <div className="text-right col-span-2">
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="font-bold text-xl text-gray-900">العام التدريبي:</span>
                <span className="text-xl text-gray-800">2025/2026</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-24 mt-20">
            <div className="text-center">
              <div className="border-t-4 border-gray-800 pt-3 inline-block min-w-[250px]"></div>
              <p className="font-bold text-xl text-gray-900 mt-2">مدير المركز</p>
              <p className="text-base text-gray-600 mt-1">مركز لدينا موثق</p>
            </div>
            <div className="text-center">
              <div className="border-t-4 border-gray-800 pt-3 inline-block min-w-[250px]"></div>
              <p className="font-bold text-xl text-gray-900 mt-2">شئون المتدربين</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </div>
  );
}
