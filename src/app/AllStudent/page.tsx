"use client";
import { useGetTraineesStatsQuery } from "@/lip/features/trainees/traineesApi";
import { RefreshCw } from "lucide-react";

export default function TraineesArchivePage() {
  const { data, isLoading, error, refetch } = useGetTraineesStatsQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">أرشيف المتدربين</h1>
          <button onClick={() => refetch()} className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white/90 rounded-2xl shadow animate-pulse" />
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">إجمالي المتدربين</p>
              <p className="text-4xl font-extrabold text-gray-900">{data.totalTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">النشطون</p>
              <p className="text-4xl font-extrabold text-blue-700">{data.activeTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">الجدد هذا الشهر</p>
              <p className="text-4xl font-extrabold text-emerald-700">{data.newTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">المتخرجون</p>
              <p className="text-4xl font-extrabold text-purple-700">{data.graduates}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">نسبة التخرج</p>
              <p className="text-4xl font-extrabold text-orange-700">{data.graduationRate}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
