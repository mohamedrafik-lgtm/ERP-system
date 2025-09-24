"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateMarketingEmployeeMutation } from '@/lip/features/marketers/marketersApi';
import { UpdateMarketingEmployeeRequest } from '@/types/marketing-employee-detail.types';
import { MarketingEmployeeDetailResponse } from '@/types/marketing-employee-detail.types';
import toast from 'react-hot-toast';
import { X, Save, RefreshCw } from 'lucide-react';

// Validation Schema
const editMarketingEmployeeSchema = yup.object({
  name: yup.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين').required('الاسم مطلوب'),
  phone: yup.string().min(10, 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام').required('رقم الهاتف مطلوب'),
  email: yup.string().email('البريد الإلكتروني غير صحيح').optional(),
  isActive: yup.boolean().required('حالة النشاط مطلوبة'),
});

type FormData = yup.InferType<typeof editMarketingEmployeeSchema>;

interface EditMarketingEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: MarketingEmployeeDetailResponse | null;
  onSuccess?: () => void;
}

export const EditMarketingEmployeeModal = ({ 
  isOpen, 
  onClose, 
  employee, 
  onSuccess 
}: EditMarketingEmployeeModalProps) => {
  const [updateMarketingEmployee, { isLoading: isSubmitting }] = useUpdateMarketingEmployeeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(editMarketingEmployeeSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      isActive: true,
    },
  });

  // Watch form values for real-time validation
  const watchedValues = watch();

  // Reset form when employee data changes
  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name || '',
        phone: employee.phone || '',
        email: employee.email || '',
        isActive: employee.isActive ?? true,
      });
    }
  }, [employee, reset]);

  const onSubmit = async (data: FormData) => {
    if (!employee) {
      toast.error("لم يتم العثور على بيانات الموظف");
      return;
    }

    // Toast تحميل
    const loadingToast = toast.loading("جاري تحديث بيانات الموظف... ⏳", {
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
      console.log("Updating marketing employee data:", { id: employee.id, data });

      const result = await updateMarketingEmployee({ 
        id: employee.id, 
        data: data as UpdateMarketingEmployeeRequest 
      }).unwrap();

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      console.log("Marketing employee updated successfully:", result);

      // Toast نجاح مع تصميم جميل
      toast.success("تم تحديث بيانات الموظف بنجاح! 🎉", {
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
      console.error("Error updating marketing employee:", error);

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      // Toast خطأ مع تصميم جميل
      toast.error("حدث خطأ في تحديث بيانات الموظف! ❌", {
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
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    تعديل بيانات الموظف
                  </DialogTitle>
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
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        اسم الموظف <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.name
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-4 focus:outline-none`}
                        placeholder="أدخل اسم الموظف"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-4 focus:outline-none`}
                        placeholder="أدخل رقم الهاتف"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm font-medium">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        البريد الإلكتروني
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-4 focus:outline-none`}
                        placeholder="أدخل البريد الإلكتروني (اختياري)"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Is Active */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        حالة النشاط <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            {...register('isActive')}
                            type="radio"
                            value="true"
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700 font-medium">نشط</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            {...register('isActive')}
                            type="radio"
                            value="false"
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700 font-medium">غير نشط</span>
                        </label>
                      </div>
                      {errors.isActive && (
                        <p className="text-red-500 text-sm font-medium">{errors.isActive.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Form Preview */}
                  {isDirty && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">معاينة التغييرات:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>الاسم:</strong> {watchedValues.name}</p>
                        <p><strong>الهاتف:</strong> {watchedValues.phone}</p>
                        <p><strong>البريد:</strong> {watchedValues.email || 'غير محدد'}</p>
                        <p><strong>الحالة:</strong> {watchedValues.isActive ? 'نشط' : 'غير نشط'}</p>
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
                      disabled={isSubmitting || !isDirty}
                      className={`px-8 py-3 text-sm font-semibold text-white rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 ${
                        isSubmitting || !isDirty
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          حفظ التغييرات
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
