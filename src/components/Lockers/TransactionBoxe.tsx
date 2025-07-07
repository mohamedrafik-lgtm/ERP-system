import LockerModal from "./AddSafe"
import FinanceTabs from "./lokers"

export const TransactionBoxe = () => {
    return <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">صناديق المعاملات</h2>
                  {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ صندوق جديد</button> */}
                  <LockerModal/>
                </div>
                <FinanceTabs/>
                {/* <p className="text-gray-600">لا توجد خزائن. قم بإنشاء خزينة جديدة.</p> */}
              </div>
}