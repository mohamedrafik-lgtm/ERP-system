import { ReviewOfFinancialRestrictionsData } from "@/data";



const FinancialStatementsTable = () => {


    return (
        <div className=" space-y-2">
          {/* عنوان الأعمدة */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 bg-white/20 text-white font-bold text-sm p-4 rounded-md">
            <div className="text-center">م</div>
            <div className="text-center">صوره</div>
            <div className="text-center">التاريخ</div>
            <div className="text-center">يواسطه</div>
            <div className="text-center">الي حساب</div>
            <div className="text-center">من حساب</div>
            <div className="text-center">المبلغ</div>
            <div className="text-center">تفاصيل</div>
          </div>
          {/* البيانات */}
          {ReviewOfFinancialRestrictionsData.map((user, idx) => (
            <div
              key={idx}
              className="bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-xl text-white p-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 items-center">
                <div className="text-sm font-semibold text-center">{user.id}</div>
                <div className="text-center">{user.image}</div>
                <div className="text-sm text-center">{user.date}</div>
    
                {/* زر التقارير */}
                <div className="text-sm text-center">
                  {user.createdBy}
                </div>
                <div className="text-sm text-center">
                  {user.toAccount}
                </div>
                <div className="text-sm text-center">
                  {user.fromAccount}
                </div>
                <div className="text-sm text-center">
                  {user.amount}
                </div>
                
                {/* زر البرامج التدريبية */}
                {/* <div>
                  <NavigationButton className="bg-white/20 hover:bg-white/50 text-white text-xs px-3 py-1 rounded-md" url={`/EmployeeManagement/${user.id}`} name={"عرض البرامج"} />
                </div> */}
    
                {/* أزرار التحكم */}
                <div className="flex gap-2 justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button className="bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-md">
                     التفاصيل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}

export default FinancialStatementsTable;