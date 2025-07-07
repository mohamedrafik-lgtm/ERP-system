'use client';

import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { cn } from '@/utils';
import { useState } from 'react';
import { AccountCard } from './AccountCard';

const tabs = ['ديون متدربين', 'مصروفات', 'إيرادات'];

export default function FinanceTabs() {
  const [activeTab, setActiveTab] = useState('إيرادات');
  const { data, isLoading } = useGetFinanceQuery();

  const filteredData = data?.filter((item) => {
    if (activeTab === 'إيرادات') return item.type === 'REVENUE';
    if (activeTab === 'مصروفات') return item.type === 'EXPENSE';
    if (activeTab === 'ديون متدربين') return item.type === 'DEBT';
  });

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 justify-end bg-gray-100 p-2 rounded-md w-fit ml-auto">
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
      </div>

      {/* Content */}
      <div className="p-4 rounded-md bg-white shadow-sm space-y-3 min-h-[100px]">
        <h2 className="font-semibold text-lg text-right">{activeTab}</h2>

        {isLoading ? (
          <p className="text-center text-gray-400">جارٍ التحميل...</p>
        ) : filteredData && filteredData.length > 0 ? (
          <ul className="text-right space-y-2">
            {filteredData.map((item, i) => (
              <AccountCard
                name="خزينة عمومية"
                description="خزنة التحصيل النقدى"
                balance={600}
                currency="EGP"
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">لا توجد بيانات</p>
        )}
      </div>
    </div>
  );
}
