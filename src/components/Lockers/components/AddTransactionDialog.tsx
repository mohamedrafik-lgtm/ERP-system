'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lip/store';
import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { FormField, Input, TextArea } from './FormComponents';
import { EnhancedSelect } from './EnhancedSelect';

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransactionType = 'إيداع' | 'سحب' | 'تحويل';

const transactionTypeOptions = [
  { value: 'إيداع', label: 'إيداع' },
  { value: 'سحب', label: 'سحب' },
  { value: 'تحويل', label: 'تحويل' },
];

export const AddTransactionDialog = ({ isOpen, onClose }: TransactionDialogProps) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('إيداع');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [targetLockerId, setTargetLockerId] = useState('');
  
  const currentLockerId = useSelector((state: RootState) => state.lockers.selectedLockerId);
  const { data: lockers } = useGetFinanceQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سنضيف منطق إرسال المعاملة للباكيند
    console.log({
      type: transactionType,
      amount: parseFloat(amount),
      description,
      sourceLockerId: currentLockerId,
      targetLockerId: transactionType === 'تحويل' ? targetLockerId : undefined
    });
    
    // إعادة تعيين النموذج
    setAmount('');
    setDescription('');
    setTargetLockerId('');
    onClose();
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    إضافة معاملة جديدة
                  </Dialog.Title>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="px-6 py-4 space-y-4">
                    {/* نوع المعاملة */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        نوع المعاملة <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={transactionType}
                          onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                          className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-right text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm"
                          required
                        >
                          <option value="إيداع">إيداع</option>
                          <option value="سحب">سحب</option>
                          <option value="تحويل">تحويل</option>
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* المبلغ */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        المبلغ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1 rounded-lg shadow-sm">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="block w-full rounded-lg border border-gray-300 py-2.5 pl-16 pr-4 text-right focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <span className="text-gray-500 sm:text-sm">ج.م</span>
                        </div>
                      </div>
                    </div>

                    {/* الوصف */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        الوصف
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-right text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm"
                        placeholder="اكتب وصفاً للمعاملة..."
                      />
                    </div>

                    {/* اختيار الخزينة المستهدفة */}
                    {transactionType === 'تحويل' && (
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">
                          الخزينة المستهدفة <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={targetLockerId}
                            onChange={(e) => setTargetLockerId(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-right text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm"
                            required
                          >
                            <option value="">اختر الخزينة المستهدفة</option>
                            {lockers
                              ?.filter(locker => locker.id !== currentLockerId)
                              .map(locker => (
                                <option key={locker.id} value={locker.id}>
                                  {locker.name}
                                </option>
                              ))}
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      إضافة المعاملة
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
