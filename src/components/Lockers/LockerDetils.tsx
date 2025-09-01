
'use client';

import { TypedUseSelectorHook, useSelector as useSelectorApp } from 'react-redux';
import { RootState } from '@/lip/store';
import { useState } from 'react';

// استخدام النسخة المُعدّلة من useSelector مع TypeScript
const useSelector: TypedUseSelectorHook<RootState> = useSelectorApp;

import { AddTransactionDialog } from './AddTransactionDialog';

export const LockerDetils = () => {
  const selectedLockerId = useSelector((state) => state.lockers.selectedLockerId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
           تفاصيل الخزينة 
          </h2>
          <button 
            className={`
              bg-blue-600 hover:bg-blue-700 text-white 
              px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200
              ${!selectedLockerId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={!selectedLockerId}
            onClick={() => setIsDialogOpen(true)}
          >
            ↲ معاملة جديدة
          </button>
          
          <AddTransactionDialog 
            isOpen={isDialogOpen} 
            onClose={() => setIsDialogOpen(false)} 
          />
        </div>
        {!selectedLockerId ? (
          <div className="text-center text-gray-600 mt-10">
            <svg 
              className="mx-auto mb-4 w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.5 12.75h15m-15-3h15m-15 6h15M9 21V3" 
              />
            </svg>
            <p>اختر خزينة من القائمة لعرض المعاملات</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* هنا يمكنك إضافة تفاصيل الخزينة المحددة */}
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">المعاملات الأخيرة</h3>
              {/* هنا يمكنك إضافة قائمة المعاملات */}
            </div>
          </div>
        )}
      </div>
    );
}