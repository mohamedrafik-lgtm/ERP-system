'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lip/store';
import { useGetFinanceQuery, useAddTransactionMutation } from '@/lip/features/Lockers/safe';
import { CreateTransaction, TransactionType } from '@/interface';
import toast from 'react-hot-toast';

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// استخدام TransactionType enum من interface

export const AddTransactionDialog = ({ isOpen, onClose }: TransactionDialogProps) => {
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');

  const [targetLockerId, setTargetLockerId] = useState('');
  
  const currentLockerId = useSelector((state: RootState) => state.lockers.selectedLockerId);
  const { data: lockers } = useGetFinanceQuery();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentLockerId) {
      toast.error('يرجى اختيار خزينة أولاً');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('يرجى إدخال مبلغ صحيح');
      return;
    }

    if (transactionType === TransactionType.TRANSFER && !targetLockerId) {
      toast.error('يرجى اختيار الخزينة المستهدفة');
      return;
    }

    try {
      const transactionData: CreateTransaction = {
        amount: parseFloat(amount),
        type: transactionType,
        description: description || undefined,
        reference: reference || undefined,
        sourceId: (transactionType === TransactionType.WITHDRAW || transactionType === TransactionType.TRANSFER) ? currentLockerId : undefined,
        targetId: (transactionType === TransactionType.DEPOSIT || transactionType === TransactionType.TRANSFER) ? 
          (transactionType === TransactionType.TRANSFER ? targetLockerId : currentLockerId) : undefined
      };

      await addTransaction(transactionData).unwrap();
      
      toast.success('تم إنشاء المعاملة بنجاح');
      
      // إعادة تعيين النموذج
      setAmount('');
      setDescription('');
      setReference('');
      setTargetLockerId('');
      setTransactionType(TransactionType.DEPOSIT);
      onClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('حدث خطأ أثناء إنشاء المعاملة');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 text-right align-middle shadow-2xl transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    إضافة معاملة جديدة
                  </Dialog.Title>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* نوع المعاملة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      نوع المعاملة
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { value: TransactionType.DEPOSIT, label: 'إيداع' },
                        { value: TransactionType.WITHDRAW, label: 'سحب' },
                        { value: TransactionType.TRANSFER, label: 'تحويل' },
                        { value: TransactionType.FEE, label: 'رسوم' },
                        { value: TransactionType.PAYMENT, label: 'دفع' }
                      ] as { value: TransactionType; label: string }[]).map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setTransactionType(value)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            transactionType === value
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* المبلغ */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      المبلغ
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                        placeholder="0.00"
                        required
                        min="0"
                        step="0.01"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        ر.س
                      </div>
                    </div>
                  </div>



                  {/* الوصف */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      الوصف (اختياري)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                      rows={3}
                      placeholder="أدخل وصفاً للمعاملة..."
                    />
                  </div>

                  {/* المرجع */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      المرجع (اختياري)
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="أدخل مرجعاً للمعاملة..."
                    />
                  </div>

                  {/* اختيار الخزينة المستهدفة (يظهر فقط في حالة التحويل) */}
                  {transactionType === TransactionType.TRANSFER && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        الخزينة المستهدفة
                      </label>
                      <select
                        value={targetLockerId}
                        onChange={(e) => setTargetLockerId(e.target.value)}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                        required
                      >
                        <option value="">اختر الخزينة</option>
                        {lockers?.filter(locker => locker.id !== currentLockerId).map((locker) => (
                          <option key={locker.id} value={locker.id}>
                            {locker.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
                      onClick={onClose}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 transition-all duration-200 hover:scale-105 shadow-lg ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري الإرسال...
                        </div>
                      ) : (
                        'إضافة المعاملة'
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
