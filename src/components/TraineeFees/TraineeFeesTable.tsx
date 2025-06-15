"use client";

import { payments } from "@/data";
import MenuComponent from "../ui/MenuReport";
import DialogReports from "../ui/Dialog";

const TraineeFeesTable = () => {
  const menuItems = [{
    name:"متدربين مستحق عليهم الدفع",
     svgIcon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
             </svg>

  }, {
     name:"كشف المسدد",
      svgIcon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

  }, {
    name:"كشف المتخلفين عن السداد",
    svgIcon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

  }, {
    name:"تقارير القسط الحالي و المتأخر",
    svgIcon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

  }, {
    name: "تقرير تفصيلي",
  }];

  return (
    <div className="overflow-x-auto p-4" >
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table dir="rtl" className="min-w-full text-sm">
          <thead className="text-left">
            <tr className="text-center text-white">
              <th className="px-4 py-5">رقم</th>
              <th className="px-4 py-2">البيان</th>
              <th className="px-4 py-2">بواسطه</th>
              <th className="px-4 py-2">المبلغ</th>
              <th className="px-4 py-2">المجموع</th>
              <th className="px-4 py-2">المتبقي</th>
              <th className="px-4 py-2">اجراء</th>
              <th className="px-4 py-2">تقارير</th>
              <th className="px-4 py-2">تحكم</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={idx}
                // onClick={() => router.push(`/AllStudent/${student.id}`)}
                className="hover:bg-orange-600 text-white transition duration-200 border-t border-gray-200 cursor-pointer text-center"
              >
                
                
                <td className="px-4 py-3 font-medium text-white">{payment.id}</td>
                <td className="px-4 py-3 text-white">{payment.name}</td>
                <td className="px-4 py-3 text-white">{payment.by}</td>
                <td className="px-4 py-3 text-white">{payment.amount}</td>
                <td className="px-4 py-3 text-white">{payment.total}</td>
                <td className="px-4 py-3 text-white">{payment.paid}</td>
                <td
                  className="px-4 py-3 flex space-x-5 text-sm text-white"
                  onClick={(e) => e.stopPropagation()} 
                >
                  {/* <button className="bg-slate-500 hover:bg-slate-600 text-white py-1 px-2 rounded-md cursor-pointer">حذف</button>  */}
                  <button className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer">
                     + اضافه
                  </button> 
                  
                </td>
                <td>
                    {/* <button className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer">
                    تقارير
                  </button> */}
                  <MenuComponent name="تقارير" items={menuItems}  svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
          </svg>}/>
                </td>
                <td className=" space-x-2 ">
                  
                  <DialogReports name= {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-center">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>}/>
                  <button className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                   </svg>
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TraineeFeesTable;
