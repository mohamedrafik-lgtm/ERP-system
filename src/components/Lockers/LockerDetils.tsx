'use client';

import { TypedUseSelectorHook, useSelector as useSelectorApp } from 'react-redux';
import { RootState } from '@/lip/store';
import { useState } from 'react';
import { useGetTransactionsQuery, useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { Transaction } from '@/interface';

// استخدام النسخة المُعدّلة من useSelector مع TypeScript
const useSelector: TypedUseSelectorHook<RootState> = useSelectorApp;

import { AddTransactionDialog } from './AddTransactionDialog';

export const LockerDetils = () => {
  const selectedLockerId = useSelector((state) => state.lockers.selectedLockerId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // جلب بيانات المعاملات والخزائن
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useGetTransactionsQuery(selectedLockerId || '', {
    skip: !selectedLockerId
  });
  
  const { data: lockers } = useGetFinanceQuery();
  const selectedLocker = lockers?.find(locker => locker.id === selectedLockerId);

  // دالة لتنسيق نوع المعاملة
  const getTransactionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'DEPOSIT': 'إيداع',
      'WITHDRAW': 'سحب',
      'TRANSFER': 'تحويل',
      'FEE': 'رسوم',
      'PAYMENT': 'دفع'
    };
    return typeLabels[type] || type;
  };

  // دالة لتنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // دالة لتحديد لون نوع المعاملة
  const getTransactionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'DEPOSIT': 'text-green-600 bg-green-100',
      'WITHDRAW': 'text-red-600 bg-red-100',
      'TRANSFER': 'text-blue-600 bg-blue-100',
      'FEE': 'text-orange-600 bg-orange-100',
      'PAYMENT': 'text-purple-600 bg-purple-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedLocker ? selectedLocker.name : 'تفاصيل الخزينة'}
            </h2>
            {selectedLocker && (
              <p className="text-gray-600 mt-1">
                الرصيد الحالي: <span className="font-semibold text-green-600">{selectedLocker.balance.toLocaleString()} {selectedLocker.currency}</span>
              </p>
            )}
          </div>
        </div>
        
        <button 
          className={`
            bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white 
            px-6 py-3 rounded-xl text-sm font-semibold shadow-lg
            transition-all duration-200 hover:scale-105
            ${!selectedLockerId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={!selectedLockerId}
          onClick={() => setIsDialogOpen(true)}
        >
          <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          معاملة جديدة
        </button>
      </div>

      <AddTransactionDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />

      {!selectedLockerId ? (
        <div className="text-center text-gray-600 mt-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">اختر خزينة من القائمة</h3>
          <p className="text-gray-500">لعرض تفاصيل الخزينة والمعاملات</p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">المعاملات الأخيرة</h3>
            <div className="text-sm text-gray-500">
              {transactions?.length || 0} معاملة
            </div>
          </div>

          {transactionsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-20"></div>
                </div>
              ))}
            </div>
          ) : transactionsError ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في تحميل البيانات</h3>
              <p className="text-gray-500">حدث خطأ أثناء جلب المعاملات</p>
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد معاملات</h3>
              <p className="text-gray-500">لم يتم العثور على أي معاملات لهذه الخزينة</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction: Transaction) => (
                <div key={transaction.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTransactionTypeColor(transaction.type)}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {transaction.type === 'DEPOSIT' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          )}
                          {transaction.type === 'WITHDRAW' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6m12 0l-4-4m4 4l-4 4" />
                          )}
                          {transaction.type === 'TRANSFER' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          )}
                          {transaction.type === 'FEE' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          )}
                          {transaction.type === 'PAYMENT' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{getTransactionTypeLabel(transaction.type)}</h4>
                        <p className="text-sm text-gray-500">{transaction.description || 'لا يوجد وصف'}</p>
                        <p className="text-xs text-gray-400">{formatDate(transaction.createdAt.toString())}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.type === 'DEPOSIT' || transaction.type === 'PAYMENT' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'DEPOSIT' || transaction.type === 'PAYMENT' ? '+' : '-'}
                        {transaction.amount.toLocaleString()} {selectedLocker?.currency}
                      </div>
                      {transaction.reference && (
                        <div className="text-xs text-gray-400 mt-1">
                          المرجع: {transaction.reference}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};