"use client";
import MenuComponent from "../ui/MenuReport";
import DialogReports from "../ui/Dialog";
import { useActivateFeeMutation, useGetFeesQuery } from "@/lip/features/Fees/Fees";
import { TraineeFee } from "@/types/traineeFees";
import toast from "react-hot-toast";
import { useEffect, useCallback, useMemo, memo } from "react";

interface TraineeFeesCardsProps {
  data?: any[]; // قبول أي نوع من البيانات مؤقتاً
}

const TraineeFeesCards = ({ data: propData }: TraineeFeesCardsProps) => {
  const menuItems = useMemo(() => [
    { name: "متدربين مستحق عليهم الدفع", svgIcon: <svg>...</svg> },
    { name: "كشف المسدد", svgIcon: <svg>...</svg> },
    { name: "كشف المتخلفين عن السداد", svgIcon: <svg>...</svg> },
    { name: "تقارير القسط الحالي و المتأخر", svgIcon: <svg>...</svg> },
    { name: "تقرير تفصيلي" },
  ], []);
  const {data} = useGetFeesQuery();
  const [ActivateFee,{isLoading , isSuccess}] = useActivateFeeMutation()
  
  // استخدام البيانات الممررة أو البيانات من API
  const feesData = propData || data || [];

  const handleActivateFee = useCallback(async (id: number) => {
    try {
      await ActivateFee({ id });
    } catch (error) {
      console.error('Error activating fee:', error);
    }
  }, [ActivateFee]);

  useEffect(() => {
    if(isSuccess){
      toast.success('تم تفعيل الرسم')
    }
  }, [isSuccess]);
  return (
    <div className="p-0" dir="rtl">
      {/* Header */}
      <div className="hidden lg:grid grid-cols-12 gap-4 font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-sm p-6 border-b border-slate-600">
        <div className="col-span-3 text-right text-white font-bold text-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          👤 بيانات المتدرب
        </div>
        <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          🎓 البرنامج التدريبي
        </div>
        <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          💰 البيانات المالية
        </div>
        <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          📊 الحالة
        </div>
        <div className="text-center col-span-3 text-white font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          ⚡ الإجراءات
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 p-8">
        {feesData?.map((fee, idx) => (
          <div
            key={idx}
            className="group relative bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:shadow-2xl rounded-2xl p-6 shadow-lg border border-gray-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* بيانات المتدرب */}
              <div className="lg:col-span-3 text-center lg:text-right">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-xl mb-1">{fee.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">رسم تدريبي</p>
                    <p className="text-xs text-gray-400">العام: {fee.academicYear}</p>
                  </div>
                </div>
              </div>

              {/* البرنامج التدريبي */}
              <div className="lg:col-span-2 text-center">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200/50 shadow-sm">
                  <p className="font-bold text-green-800 text-sm mb-1">{fee.program.nameAr}</p>
                  <p className="text-xs text-green-600 font-medium">{fee.program.nameEn}</p>
                  <p className="text-xs text-green-500 mt-1">السعر: {fee.program.price.toLocaleString()} {fee.safe.currency}</p>
                </div>
              </div>

              {/* البيانات المالية */}
              <div className="lg:col-span-2 text-center">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/50 shadow-sm">
                  <p className="font-black text-purple-800 text-lg mb-1">{fee.amount.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 font-bold mb-2">{fee.safe.currency}</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-purple-500 font-medium">الخزينة:</span>
                    <span className="text-xs text-purple-700 font-bold">{fee.safe.name}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-xs text-purple-500 font-medium">الرصيد:</span>
                    <span className="text-xs text-purple-700 font-bold">{fee.safe.balance.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* الحالة */}
              <div className="lg:col-span-2 text-center">
                <button
                  onClick={() => handleActivateFee(fee.id)}
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    fee.isApplied 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                  } ${isLoading ? 'cursor-not-allowed opacity-65' : 'hover:scale-105'}`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${fee.isApplied ? 'bg-green-300' : 'bg-red-300'}`}></div>
                  {fee.isApplied ? 'مفعل' : 'غير مفعل'}
                </button>
                {fee.appliedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(fee.appliedAt).toLocaleDateString('ar-SA')}
                  </p>
                )}
              </div>

              {/* الإجراءات */}
              <div className="lg:col-span-3 flex justify-center gap-2">
                <MenuComponent 
                  items={menuItems} 
                  svg={
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 group-hover:text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                      </svg>
                    </div>
                  } 
                />
                <DialogReports 
                  name={
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600 group-hover:text-blue-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </div>
                  } 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TraineeFeesCards);
