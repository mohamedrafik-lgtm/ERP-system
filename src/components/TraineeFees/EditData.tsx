import * as React from "react";
import { useState } from "react";

interface EditTypeDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (data: any) => void;
}

const EditTypeDialog: React.FC<EditTypeDialogProps> = ({ 
  isOpen = true, 
  onClose, 
  onSave 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call onSave callback if provided
      if (onSave) {
        onSave({});
      }
      
      // Call onClose callback if provided
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">تحكم في نوع الرسوم</h2>
          <p className="text-gray-600 mt-1">تعديل إعدادات نوع الرسم المحدد</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 text-gray-800 p-6 mb-8 rounded-xl shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">تنبيه مهم</h3>
            <p className="text-sm leading-relaxed">
              تعديل مبلغ نوع رسوم أو حذفه لا يقلل المبالغ المستحقة على المتدربين السابقين.
              لتعديل مدفوعات متدرب يتم ذلك من خلال صفحة مدفوعات المتدرب.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم والمبلغ */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">الاسم</label>
            <input 
              type="text" 
              placeholder="مثال: رسوم تسجيل"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">المبلغ</label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ر.س
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الأولوية */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">الأولوية</label>
            <input 
              type="number"
              placeholder="1"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              تزيد أولوية البند كلما قل الرقم المدخل
            </p>
          </div>

          {/* حالة المتدرب */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">حالة المتدرب</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>مستجد</option>
              <option>مستمر</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* النوع */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">النوع</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>مصروفات</option>
              <option>خصومات</option>
            </select>
          </div>

          {/* العام التدريبي */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">العام التدريبي</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>2024/2025</option>
              <option>2023/2024</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* السماح بالتطبيق أكثر من مرة */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">السماح بالتطبيق أكثر من مرة</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>نعم</option>
              <option>لا</option>
            </select>
          </div>

          {/* السماح بطباعة إيصال */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">السماح بطباعة إيصال</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>نعم</option>
              <option>لا</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* البرنامج */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">البرنامج</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>الذكاء الاصطناعي (FULL)</option>
              <option>علوم البيانات</option>
            </select>
          </div>

          {/* الفرقة */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">الفرقة</label>
            <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
              <option>الأولى</option>
              <option>الثانية</option>
            </select>
          </div>
        </div>

        {/* حساب الخزينة */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">حساب الخزينة</label>
          <select className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200">
            <option>خزينة عمومية [1203]</option>
          </select>
        </div>

        {/* الأزرار */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الحفظ...
              </div>
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
    </div>
  );
};

export default EditTypeDialog;
