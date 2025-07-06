'use client';

import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { useState, Fragment, useEffect } from 'react';
import { ICurrency, ILocker, SafeType } from '@/interface';
import { Listbox, Transition as ListboxTransition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useAddSafeMutation } from '@/lip/features/Lockers/safe';
import toast, { Toaster } from 'react-hot-toast';

export default function LockerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [addSafe, { isLoading, isSuccess, isError }] = useAddSafeMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILocker>({
    defaultValues: {
      name: '',
      description: '',
      type: SafeType.REVENUE,
      balance: 0,
      currency: ICurrency.EGP,
      isActive: true,
    },
  });

  const [selectedType, setSelectedType] = useState(SafeType.REVENUE);
  const [selectedCurrency, setSelectedCurrency] = useState(ICurrency.EGP);

  const onSubmit = (data: ILocker) => {
    addSafe(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('تم إنشاء الخزنة بنجاح');
      setIsOpen(false);
      reset(); // Reset form بعد الإرسال
    }

    if (isError) {
      toast.error('حدث خطأ أثناء إنشاء الخزنة');
    }
  }, [isSuccess, isError, reset]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        إنشاء خزينة جديدة
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
                    إنشاء خزينة جديدة
                  </DialogTitle>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">اسم الخزنة</label>
                      <input
                        {...register('name', { required: 'هذا الحقل مطلوب' })}
                        className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">الوصف</label>
                      <textarea
                        {...register('description')}
                        className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">نوع الخزنة</label>
                      <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                          <Listbox value={value} onChange={(val) => { setSelectedType(val); onChange(val); }}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2 pl-4 pr-10 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <span>{value}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                  <ChevronsUpDown className="h-4 w-4" />
                                </span>
                              </Listbox.Button>
                              <ListboxTransition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Listbox.Options className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 z-10">
                                  {Object.values(SafeType).map((type) => (
                                    <Listbox.Option
                                      key={type}
                                      value={type}
                                      className={({ active }) =>
                                        `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-800'}`
                                      }
                                    >
                                      {({ selected }) => (
                                        <span className="flex items-center justify-between">
                                          {type === 'REVENUE' ? 'إيرادات' : type === 'EXPENSE' ? 'مصروفات' : 'ديون'}
                                          {selected && <Check className="w-4 h-4 text-blue-500" />}
                                        </span>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </ListboxTransition>
                            </div>
                          </Listbox>
                        )}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">الرصيد</label>
                      <input
                        type="number"
                        {...register('balance', { required: 'هذا الحقل مطلوب', valueAsNumber: true })}
                        className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">العملة</label>
                      <Controller
                        control={control}
                        name="currency"
                        render={({ field: { onChange, value } }) => (
                          <Listbox value={value} onChange={(val) => { setSelectedCurrency(val); onChange(val); }}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2 pl-4 pr-10 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <span>{value}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                  <ChevronsUpDown className="h-4 w-4" />
                                </span>
                              </Listbox.Button>
                              <ListboxTransition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Listbox.Options className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 z-10">
                                  {Object.values(ICurrency).map((currency) => (
                                    <Listbox.Option
                                      key={currency}
                                      value={currency}
                                      className={({ active }) =>
                                        `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-800'}`
                                      }
                                    >
                                      {({ selected }) => (
                                        <span className="flex items-center justify-between">
                                          {currency}
                                          {selected && <Check className="w-4 h-4 text-blue-500" />}
                                        </span>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </ListboxTransition>
                            </div>
                          </Listbox>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register('isActive')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-700">الخزنة مفعلة</label>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center"
                      >
                        {isLoading ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          'إنشاء'
                        )}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
