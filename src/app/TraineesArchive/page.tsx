"use client";
import { useGetTraineesStatsQuery, useGetTraineesQuery, useGetTraineeDocumentsQuery } from "@/lip/features/trainees/traineesApi";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function TraineesArchivePage() {
  const { data, isLoading, error, refetch } = useGetTraineesStatsQuery();
  const { data: trainees = [] } = useGetTraineesQuery();
  const [selectedTraineeId, setSelectedTraineeId] = useState<number | null>(null);
  const { data: docs } = useGetTraineeDocumentsQuery(selectedTraineeId as number, { skip: !selectedTraineeId });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">أرشيف المتدربين</h1>
          <button onClick={() => refetch()} className="px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            حدث خطأ أثناء جلب الإحصائيات
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي المتدربين</p>
              <p className="text-4xl font-extrabold text-gray-900">{data.totalTrainees}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">النشطون</p>
              <p className="text-4xl font-extrabold text-blue-700">{data.activeTrainees}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">الجدد هذا الشهر</p>
              <p className="text-4xl font-extrabold text-emerald-700">{data.newTrainees}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">المتخرجون</p>
              <p className="text-4xl font-extrabold text-purple-700">{data.graduates}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">نسبة التخرج</p>
              <p className="text-4xl font-extrabold text-orange-700">{data.graduationRate}%</p>
            </div>
          </div>
        )}

        {/* Trainees list */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-base font-semibold mb-3">المتدربون</h2>
            <div className="space-y-2 max-h-[480px] overflow-auto">
              {trainees.map((t: any) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTraineeId(t.id)}
                  className={`w-full text-right p-3 rounded-lg border ${selectedTraineeId === t.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100" />
                    <div>
                      <p className="font-semibold">{t.nameAr}</p>
                      <p className="text-xs text-gray-500">ID: {t.id}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-base font-semibold mb-3">مستندات المتدرب</h2>
            {!selectedTraineeId && <p className="text-gray-500">اختر متدرباً لعرض مستنداته.</p>}
            {selectedTraineeId && !docs && <p className="text-gray-500">جاري التحميل...</p>}
            {docs && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">نسبة الإكمال</p>
                    <p className="text-2xl font-extrabold text-gray-900">{docs.stats.completionPercentage}%</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    موثق: {docs.stats.verifiedCount}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {docs.documents.map((d) => (
                    <div key={`${d.type}`} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{d.nameAr}</p>
                        <span className={`text-xs px-2 py-1 rounded-full border ${d.required ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>{d.required ? 'مطلوب' : 'اختياري'}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {d.isUploaded ? (
                          <>
                            <p>تم الرفع: {d.document?.fileName}</p>
                            <p>الحالة: {d.isVerified ? 'موثق' : 'غير موثق'}</p>
                          </>
                        ) : (
                          <p className="text-orange-600">لم يتم رفع المستند</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


