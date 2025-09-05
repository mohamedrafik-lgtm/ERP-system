'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useUpdateSafeMutation } from '@/lip/features/Lockers/safe';
import { IUpdateLocker, ICurrency } from '@/interface';
import { toast } from 'react-hot-toast';

interface EditSafeModalProps {
  isOpen: boolean;
  onClose: () => void;
  safeId: string;
  currentData: {
    name: string;
    description: string;
    currency: ICurrency;
    isActive: boolean;
  };
}

export const EditSafeModal = ({ isOpen, onClose, safeId, currentData }: EditSafeModalProps) => {
  const [formData, setFormData] = useState<IUpdateLocker>({
    name: '',
    description: '',
    currency: 'EGP',
    isActive: true
  });

  const [updateSafe, { isLoading }] = useUpdateSafeMutation();

  // تحديث البيانات عند فتح المودال
  useEffect(() => {
    if (isOpen && currentData) {
      setFormData({
        name: currentData.name,
        description: currentData.description,
        currency: currentData.currency,
        isActive: currentData.isActive
      });
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateSafe({
        id: safeId,
        data: formData
      }).unwrap();
      
      toast.success('تم تحديث الخزينة بنجاح');
      onClose();
    } catch (error) {
      console.error('Error updating safe:', error);
      toast.error('حدث خطأ أثناء تحديث الخزينة');
    }
  };

  const handleInputChange = (field: keyof IUpdateLocker, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md p-8 text-left align-middle shadow-2xl border border-white/20 transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                        تعديل الخزينة
                      </DialogTitle>
                      <p className="text-lg text-gray-600 font-medium">قم بتعديل تفاصيل الخزينة</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>نموذج تفاعلي</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>حفظ آمن</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* اسم الخزينة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      اسم الخزينة
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pr-10 pl-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-right"
                        placeholder="أدخل اسم الخزينة"
                        required
                      />
                    </div>
                  </div>

                  {/* وصف الخزينة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      وصف الخزينة
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      </div>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full pr-10 pl-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-right resize-none"
                        placeholder="أدخل وصف الخزينة"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  {/* العملة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      العملة
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value as ICurrency)}
                        className="w-full pr-10 pl-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-right appearance-none"
                        required
                      >
                        <option value="EGP">جنيه مصري (EGP)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                        <option value="SAR">ريال سعودي (SAR)</option>
                      </select>
                    </div>
                  </div>

                  {/* حالة الخزينة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      حالة الخزينة
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('isActive', true)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                          formData.isActive
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.isActive ? 'bg-white border-white' : 'border-gray-400'
                        }`}>
                          {formData.isActive && (
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span>نشطة</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('isActive', false)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                          !formData.isActive
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          !formData.isActive ? 'bg-white border-white' : 'border-gray-400'
                        }`}>
                          {!formData.isActive && (
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span>غير نشطة</span>
                      </button>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex justify-center gap-4 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          حفظ التغييرات
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
