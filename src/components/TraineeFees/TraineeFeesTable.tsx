"use client";
import MenuComponent from "../ui/MenuReport";
import DialogReports from "../ui/Dialog";
import { useActivateFeeMutation, useGetFeesQuery } from "@/lip/features/Fees/Fees";
import toast from "react-hot-toast";
import { useEffect, useCallback, useMemo, memo } from "react";

const TraineeFeesCards = () => {
  const menuItems = useMemo(() => [
    { name: "متدربين مستحق عليهم الدفع", svgIcon: <svg>...</svg> },
    { name: "كشف المسدد", svgIcon: <svg>...</svg> },
    { name: "كشف المتخلفين عن السداد", svgIcon: <svg>...</svg> },
    { name: "تقارير القسط الحالي و المتأخر", svgIcon: <svg>...</svg> },
    { name: "تقرير تفصيلي" },
  ], []);
  const {data} = useGetFeesQuery();
  const [ActivateFee,{isLoading , isSuccess}] = useActivateFeeMutation()

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
      <div className="hidden lg:grid grid-cols-12 gap-6 font-bold bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm p-8 border-b border-gray-200/50">
        <div className="col-span-3 text-right text-gray-700 font-bold text-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          اسم الرسم
        </div>
        <div className="text-center col-span-2 text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          النوع
        </div>
        <div className="text-center text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          البرنامج
        </div>
        <div className="text-center text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          الخزينة
        </div>
        <div className="text-center text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          المبلغ
        </div>
        <div className="text-center text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          الحالة
        </div>
        <div className="text-center text-gray-700 font-bold text-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          الإجراءات
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 p-8">
        {data?.map((fee, idx) => (
          <div
            key={idx}
            className="group relative bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:shadow-2xl rounded-2xl p-6 shadow-lg border border-gray-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* اسم الرسم */}
              <div className="lg:col-span-3 text-center lg:text-right">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                  </div>
                </div>
              </div>

              {/* النوع */}
              <div className="lg:col-span-2 text-center">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300/50 shadow-sm">
                  {fee.type}
                </span>
              </div>

              {/* البرنامج */}
              <div className="lg:col-span-1 text-center">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 border border-green-200/50 shadow-sm">
                  <p className="font-bold text-green-800 text-sm">{fee.program.nameAr}</p>
                </div>
              </div>

              {/* الخزينة */}
              <div className="lg:col-span-1 text-center">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200/50 shadow-sm">
                  <p className="font-bold text-orange-800 text-sm">{fee.safe.balance}</p>
                </div>
              </div>

              {/* المبلغ */}
              <div className="lg:col-span-1 text-center">
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-3 border border-indigo-200/50 shadow-sm">
                  <p className="font-black text-indigo-800 text-lg">{fee.amount.toLocaleString()}</p>
                  <p className="text-xs text-indigo-600 font-bold">{fee.safe.currency}</p>
                </div>
              </div>

              {/* الحالة */}
              <div className="lg:col-span-1 text-center">
                <button
                  onClick={() => handleActivateFee(fee.id)}
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    fee.isApplied 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                  } ${isLoading ? 'cursor-not-allowed opacity-65' : 'hover:scale-105'}`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${fee.isApplied ? 'bg-green-300' : 'bg-red-300'}`}></div>
                  {fee.isApplied ? 'مفعل' : 'غير مفعل'}
                </button>
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
