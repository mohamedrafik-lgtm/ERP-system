"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateMarketingTargetMutation } from '@/lip/features/marketers/marketersApi';
import { CreateMarketingTargetRequest } from '@/types/marketer.types';
import { MarketingEmployeeResponse } from '@/types/marketer.types';
import toast from 'react-hot-toast';
import { X, Target, Save, RefreshCw, Calendar, User, Hash } from 'lucide-react';

// Validation Schema
const createTargetSchema = yup.object({
  employeeId: yup.number().required('الموظف مطلوب'),
  month: yup.number().min(1, 'الشهر يجب أن يكون بين 1 و 12').max(12, 'الشهر يجب أن يكون بين 1 و 12').required('الشهر مطلوب'),
  year: yup.number().min(2020, 'السنة يجب أن تكون 2020 أو أحدث').max(2030, 'السنة يجب أن تكون 2030 أو أقل').required('السنة مطلوبة'),
  targetAmount: yup.number().min(1, 'الهدف يجب أن يكون على الأقل 1').required('الهدف مطلوب'),
  notes: yup.string().optional(),
  setById: yup.string().optional(),
});

type FormData = yup.InferType<typeof createTargetSchema>;

interface CreateTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: MarketingEmployeeResponse[];
  selectedMonth: number;
  selectedYear: number;
  onSuccess?: () => void;
}

export const CreateTargetModal = ({ 
  isOpen, 
  onClose, 
  employees,
  selectedMonth,
  selectedYear,
  onSuccess 
}: CreateTargetModalProps) => {
  const [createMarketingTarget, { isLoading: isSubmitting }] = useCreateMarketingTargetMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(createTargetSchema),
    defaultValues: {
      employeeId: 0,
      month: selectedMonth,
      year: selectedYear,
      targetAmount: 1,
      notes: '',
      setById: '',
    },
  });

  // Watch form values for real-time validation
  const watchedValues = watch();

  // Update form when selected month/year changes
  useEffect(() => {
    setValue('month', selectedMonth);
    setValue('year', selectedYear);
  }, [selectedMonth, selectedYear, setValue]);

  const onSubmit = async (data: FormData) => {
    // Toast تحميل
    const loadingToast = toast.loading("جاري إنشاء الهدف... ⏳", {
      position: "top-center",
      style: {
        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      },
    });

    try {
      console.log("Creating marketing target:", data);

      const result = await createMarketingTarget(data as CreateMarketingTargetRequest).unwrap();

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      console.log("Marketing target created successfully:", result);

      // Toast نجاح مع تصميم جميل
      toast.success("تم إنشاء الهدف بنجاح! 🎯", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
        },
        icon: "✅",
      });

      // إعادة تعيين النموذج
      reset();
      
      // إغلاق المودال
      onClose();
      
      // استدعاء callback النجاح
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating marketing target:", error);

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      // Toast خطأ مع تصميم جميل
      toast.error("حدث خطأ في إنشاء الهدف! ❌", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
        },
        icon: "❌",
      });
    }
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm("هل تريد إغلاق النافذة دون حفظ التغييرات؟");
      if (confirmClose) {
        reset();
        onClose();
      }
    } else {
      onClose();
    }
  };

  const getMonthName = (month: number) => {
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return months[month - 1] || "غير محدد";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-8 text-right align-middle shadow-2xl transition-all border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      تحديد هدف جديد
                    </DialogTitle>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Employee Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        الموظف <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register('employeeId')}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.employeeId
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-4 focus:outline-none`}
                      >
                        <option value={0}>اختر الموظف</option>
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name} - {employee.phone}
                          </option>
                        ))}
                      </select>
                      {errors.employeeId && (
                        <p className="text-red-500 text-sm font-medium">{errors.employeeId.message}</p>
                      )}
                    </div>

                    {/* Target Amount */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        الهدف المطلوب (عدد التقديمات) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register('targetAmount')}
                          type="number"
                          min="1"
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 ${
                            errors.targetAmount
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-4 focus:outline-none`}
                          placeholder="أدخل الهدف المطلوب"
                        />
                        <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.targetAmount && (
                        <p className="text-red-500 text-sm font-medium">{errors.targetAmount.message}</p>
                      )}
                    </div>

                    {/* Month */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        الشهر <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          {...register('month')}
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 ${
                            errors.month
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-4 focus:outline-none`}
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {getMonthName(i + 1)}
                            </option>
                          ))}
                        </select>
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.month && (
                        <p className="text-red-500 text-sm font-medium">{errors.month.message}</p>
                      )}
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        السنة <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          {...register('year')}
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 ${
                            errors.year
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-4 focus:outline-none`}
                        >
                          {Array.from({ length: 11 }, (_, i) => {
                            const year = new Date().getFullYear() - 1 + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.year && (
                        <p className="text-red-500 text-sm font-medium">{errors.year.message}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        ملاحظات
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.notes
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-4 focus:outline-none`}
                        placeholder="أدخل أي ملاحظات إضافية (اختياري)"
                      />
                      {errors.notes && (
                        <p className="text-red-500 text-sm font-medium">{errors.notes.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Form Preview */}
                  {isDirty && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">معاينة الهدف:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>الموظف:</strong> {employees.find(e => e.id === watchedValues.employeeId)?.name || 'غير محدد'}</p>
                        <p><strong>الهدف:</strong> {watchedValues.targetAmount} تقديم</p>
                        <p><strong>الفترة:</strong> {getMonthName(watchedValues.month)} {watchedValues.year}</p>
                        {watchedValues.notes && <p><strong>الملاحظات:</strong> {watchedValues.notes}</p>}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 text-sm font-semibold text-white rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          جاري الإنشاء...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4" />
                          إنشاء الهدف
                        </>
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
  );
};

export default CreateTargetModal;
