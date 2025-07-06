


export const LockerDetils = () => {
    return <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">تفاصيل الخزينة</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">↲ معاملة جديدة</button>
            </div>
            <div className="text-center text-gray-600 mt-10">
              <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75h15m-15-3h15m-15 6h15M9 21V3" />
              </svg>
              <p>اختر خزينة من القائمة لعرض المعاملات</p>
            </div>
          </div>
}