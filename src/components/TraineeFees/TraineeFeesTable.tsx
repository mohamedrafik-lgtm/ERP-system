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
    <div className="p-4 space-y-4" dir="rtl">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-10 gap-2 font-bold bg-white backdrop-blur p-3 rounded-lg border border-gray-300">
        <div className="col-span-3 text-center">اسم الرسم</div>
        <div className="text-center col-span-2">النوع</div>
        <div className="text-center">البرنامج</div>
        <div className="text-center">الخزينه</div>
        <div className="text-center">المبلغ</div>
        <div className="text-center">الحاله</div>
        <div className="text-center ">الإجراءات</div>
      </div>

      {/* Cards */}
      {data?.map((fee, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 sm:grid-cols-10 gap-2 items-center bg-white hover:bg-white/20 backdrop-blur-md rounded-xl p-4 shadow transition"
        >
          <div className="col-span-3 font-bold text-center">{fee.name}</div>
          <div className="text-center col-span-2">{fee.type}</div>
          <div className="text-center">{fee.program.nameAr}</div>
          <div className="text-center">{fee.amount} {fee.safe.currency}</div>
          <div className="text-center">{fee.safe.balance}</div>
          <button
          onClick={() => handleActivateFee(fee.id)}
          className={`text-center ${isLoading ? 'cursor-not-allowed opacity-65' : ''} cursor-pointer ${fee.isApplied ? 'text-green-500 bg-green-200 px-3 py-1 rounded-xl' : 'text-red-500 bg-red-200 px-3 py-1 rounded-xl'}`}>{fee.isApplied ? 'مفعل ' : 'غير مفعل'}</button>

          {/* التحكم */}
          <div className="flex justify-center gap-2 ">

            <MenuComponent  items={menuItems} svg={
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
           </svg>
           
            } />
            <DialogReports name={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            
            } />
            {/* <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TraineeFeesCards);
