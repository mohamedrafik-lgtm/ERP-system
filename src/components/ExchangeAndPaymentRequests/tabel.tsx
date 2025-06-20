import { ExchangeAndPaymentRequestsTransactions } from "@/data";

export const ExchangeAndPaymentRequestsTabel = ()=>{

     return (
        <div className=" space-y-2">
          {/* عنوان الأعمدة */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-11 bg-white font-bold text-sm p-2 rounded-md">
            <div className="text-center">رقم</div>
            <div className="text-center">اسم المستفيد</div>
            <div className="text-center">بواسطه</div>
            <div className="text-center ">من حساب</div>
            <div className="text-center col-span-2">الي حساب</div>
            <div className="text-center">التاريخ</div>
            <div className="text-center">المبلغ</div>
            <div className="text-center">المدفوع</div>
            <div className="text-center">الحاله</div>
            <div className="text-center">تحكم</div>
          </div>
    
          {/* البيانات */}
          {ExchangeAndPaymentRequestsTransactions.map((user, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-white/30 backdrop-blur-md rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-11 gap-2 items-center">
                <div className="text-sm font-semibold text-center">{user.id}</div>
                <div className="text-sm font-semibold text-center">{user.BeneficiaryName}</div>
                <div className="text-sm text-center">{user.by}</div>
                <div className="text-sm text-center ">{user.fromAccount}</div>
                <div className="text-sm text-center col-span-2">{user.toAccount}</div>
                <div className="text-sm text-center">{user.date}</div>
                <div className="text-sm text-center">{user.amount}</div>
                <div className="text-sm text-center">{user.paid}</div>
                <div className={`text-sm text-center px-4 py-1 text-white rounded-lg ${user.status == 'مفعل' ? "bg-green-400" : 'bg-red-500'}`} >{user.status}</div>
                <div className="text-sm text-center flex items-center justify-center">
                    <button className=" bg-white/20 px-4 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}