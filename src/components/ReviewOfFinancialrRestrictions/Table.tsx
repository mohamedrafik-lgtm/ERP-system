import { ReviewOfFinancialRestrictionsData } from "@/data";



const FinancialStatementsTable = () => {


    return (
        <div className="space-y-3">
          {/* عنوان الأعمدة */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-sm p-6 rounded-xl border border-gray-200">
            <div className="text-center text-gray-700">م</div>
            <div className="text-center text-gray-700">صورة</div>
            <div className="text-center text-gray-700">التاريخ</div>
            <div className="text-center text-gray-700">بواسطة</div>
            <div className="text-center text-gray-700">إلى حساب</div>
            <div className="text-center text-gray-700">من حساب</div>
            <div className="text-center text-gray-700">المبلغ</div>
            <div className="text-center text-gray-700">الإجراءات</div>
          </div>
          
          {/* البيانات */}
          {ReviewOfFinancialRestrictionsData.map((user, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 items-center">
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full">
                    {user.id}
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                    {user.image ? (
                      <img src={user.image} alt="صورة" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                    {user.date}
                  </span>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">{user.createdBy}</span>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">{user.toAccount}</span>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">{user.fromAccount}</span>
                </div>
                
                <div className="text-center">
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                    {user.amount}
                  </span>
                </div>
                
                {/* أزرار التحكم */}
                <div className="flex gap-2 justify-center">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-xs font-medium">
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