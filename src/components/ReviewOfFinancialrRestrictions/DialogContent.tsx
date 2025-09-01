"use client";
import { EntryFormData } from "@/interface";
import { useForm, SubmitHandler } from "react-hook-form"



const NewEntryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntryFormData>()
  const onSubmit: SubmitHandler<EntryFormData> = (data) => {
    console.log(data, errors) 
    reset()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">من حساب</label>
            <select
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
              {...register('fromAccount')}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
              <option>حساب الخزينة</option>
              <option>حساب المصروفات</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">إلى حساب</label>
            <select
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
              {...register('toAccount')}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
              <option>حساب الخزينة</option>
              <option>حساب الإيرادات</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">التاريخ</label>
            <input
              type="date"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
              {...register('date')}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">المبلغ</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                {...register('amount')}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ر.س
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">ملاحظات</label>
          <textarea
            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 resize-none"
            rows={4}
            placeholder="أدخل أي ملاحظات إضافية..."
            {...register('notes')}
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">مرفقات</label>
          <div className="relative">
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              {...register('file')}
            />
            <label
              htmlFor="upload"
              className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-gray-300 rounded-xl px-6 py-8 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-200"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">اختر صورة أو ملف</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF, DOC حتى 10MB</p>
              </div>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            حفظ القيد
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm;
