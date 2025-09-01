'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lip/store';
import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransactionType = 'إيداع' | 'سحب' | 'تحويل';

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  إضافة معاملة جديدة
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* نوع المعاملة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      نوع المعاملة
                    </label>
                    <select
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="إيداع">إيداع</option>
                      <option value="سحب">سحب</option>
                      <option value="تحويل">تحويل</option>
                    </select>
                  </div>

                  {/* المبلغ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المبلغ
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* الوصف */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الوصف
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  {/* اختيار الخزينة المستهدفة (يظهر فقط في حالة التحويل) */}
                  {transactionType === 'تحويل' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الخزينة المستهدفة
                      </label>
                      <select
                        value={targetLockerId}
                        onChange={(e) => setTargetLockerId(e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                      onClick={onClose}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
