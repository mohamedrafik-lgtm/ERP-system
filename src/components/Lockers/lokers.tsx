'use client';

import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { cn } from '@/utils';
import { TypedUseSelectorHook, useDispatch as useDispatchApp, useSelector as useSelectorApp } from 'react-redux';
import { AccountCard } from './AccountCard';
import { setSelectedLocker } from '@/lip/features/Lockers/lockersSlice';
import { RootState, AppDispatch } from '@/lip/store';

// استخدام النسخ المُعدّلة من الhooks
const useDispatch = () => useDispatchApp<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useSelectorApp;

export default function FinanceTabs() {
  const dispatch = useDispatch();
  const selectedLocker = useSelector((state: RootState) => state.lockers.selectedLockerId);
  const { data, isLoading } = useGetFinanceQuery();
  
  const handleLockerSelect = (lockerId: string) => {
    dispatch(setSelectedLocker(lockerId));
  };
  // const filteredData = data?.filter((item) => {
  //   if (activeTab === 'إيرادات') return item.type === 'REVENUE';
  //   if (activeTab === 'مصروفات') return item.type === 'EXPENSE';
  //   if (activeTab === 'ديون متدربين') return item.type === 'DEBT';
  // });

  return (
    <div className="space-y-4">
      {/* Tabs */}
      {/* <div className="flex gap-4 justify-end bg-gray-100 p-2 rounded-md w-fit ml-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-1 rounded text-sm font-medium',
              activeTab === tab ? 'bg-white shadow text-gray-900' : 'text-gray-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div> */}

      {/* Content */}
      <div className="p-4 rounded-md bg-white shadow-sm space-y-3 min-h-[100px]">
        {/* <h2 className="font-semibold text-lg text-right">{activeTab}</h2> */}

        {isLoading ? (
          <p className="text-center text-gray-400">جارٍ التحميل...</p>
        ) : data && data.length > 0 ? (
          <ul className="text-right space-y-2">
            {data.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleLockerSelect(item.id)}
                className="cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <AccountCard
                  name={item.name}
                  description={item.description || 'لا يوجد وصف'}
                  balance={item.balance}
                  currency={item.currency}
                  isSelected={selectedLocker === item.id}
                />
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">لا توجد بيانات</p>
        )}
      </div>
    </div>
  );
}
