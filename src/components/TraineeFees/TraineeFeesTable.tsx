"use client";

import { payments } from "@/data";
import MenuComponent from "../ui/MenuReport";
import DialogReports from "../ui/Dialog";

const menuItems = [
  { name: "متدربين مستحق عليهم الدفع", svgIcon: <svg>...</svg> },
  { name: "كشف المسدد", svgIcon: <svg>...</svg> },
  { name: "كشف المتخلفين عن السداد", svgIcon: <svg>...</svg> },
  { name: "تقارير القسط الحالي و المتأخر", svgIcon: <svg>...</svg> },
  { name: "تقرير تفصيلي" },
];

const TraineeFeesCards = () => {
  return (
    <div className="p-4 space-y-4" dir="rtl">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-11 gap-4 font-bold bg-white backdrop-blur p-3 rounded-lg border border-gray-300">
        <div className="text-center">الرقم</div>
        <div className="col-span-3 text-center">الاسم</div>
        <div className="text-center">بواسطة</div>
        <div className="text-center">المبلغ</div>
        <div className="text-center">المجموع</div>
        <div className="text-center">المتبقي</div>
        <div className="text-center">الإجراء</div>
        <div className="text-center">التقارير</div>
        <div className="text-center">التحكم</div>
      </div>

      {/* Cards */}
      {payments.map((payment, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center bg-white hover:bg-white/20 backdrop-blur-md rounded-xl p-4 shadow transition"
        >
          <div className="font-bold text-center">#{payment.id}</div>
          <div className="col-span-3 text-center">{payment.name}</div>
          <div className="text-center">{payment.by}</div>
          <div className="text-center">{payment.amount}</div>
          <div className="text-center">{payment.total}</div>
          <div className="text-center">{payment.paid}</div>
           {/* الإجراء */}
           <div className="flex justify-center">
            <button className="bg-black/10 hover:bg-white/40 py-1 px-3 rounded-md">
                اضافه
               + 
            </button>
          </div>
          {/* التقارير */}
          <div className="flex justify-center">
            <MenuComponent name="تقارير" items={menuItems} svg={
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
           </svg>
           
            } />
          </div>

          {/* التحكم */}
          <div className="flex justify-center gap-2">
            <DialogReports name={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            
            } />
            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraineeFeesCards;
