"use client";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, Target, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useUpdateMarketingTargetMutation } from "@/lip/features/marketers/marketersApi";
import { MarketingTargetResponse, UpdateMarketingTargetRequest } from "@/types/marketer.types";
import toast from "react-hot-toast";

interface EditTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: MarketingTargetResponse | null;
  onSuccess: () => void;
}

const editTargetSchema = yup.object({
  targetAmount: yup.number()
    .min(1, 'الهدف يجب أن يكون على الأقل 1')
    .required('الهدف مطلوب'),
  notes: yup.string().optional(),
  setById: yup.string().optional(),
});

type EditTargetFormData = yup.InferType<typeof editTargetSchema>;

const EditTargetModal: React.FC<EditTargetModalProps> = ({
  isOpen,
  onClose,
  target,
  onSuccess,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<EditTargetFormData>({
    resolver: yupResolver(editTargetSchema),
    mode: 'onChange',
    defaultValues: {
      targetAmount: 0,
      notes: '',
      setById: '',
    },
  });

  const [updateTarget, { isLoading }] = useUpdateMarketingTargetMutation();

  // Reset form when target changes
  useEffect(() => {
    if (target) {
      reset({
        targetAmount: target.targetAmount,
        notes: target.notes || '',
        setById: target.setById || '',
      });
    }
  }, [target, reset]);

  const watchedValues = watch();

  const handleUpdateTarget = async (data: EditTargetFormData) => {
    if (!target) return;

    setIsUpdating(true);
    
    // Show loading toast
    const loadingToast = toast.loading(
      <div className="flex items-center gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
        <div>
          <p className="font-semibold text-gray-900">جاري تحديث الهدف...</p>
          <p className="text-sm text-gray-600">يرجى الانتظار</p>
        </div>
      </div>,
      {
        duration: 0, // Don't auto-dismiss
        style: {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        },
      }
    );

    try {
      const updateData: UpdateMarketingTargetRequest = {
        targetAmount: data.targetAmount,
        notes: data.notes || undefined,
        setById: data.setById || undefined,
      };

      console.log("🚀 Updating target with data:", updateData);

      const result = await updateTarget({
        id: target.id,
        data: updateData,
      }).unwrap();

      console.log("✅ Target updated successfully:", result);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success(
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">تم تحديث الهدف بنجاح!</p>
            <p className="text-sm text-gray-600">تم حفظ التغييرات</p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }
      );

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("❌ Error updating target:", error);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error(
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">حدث خطأ في تحديث الهدف</p>
            <p className="text-sm text-gray-600">
              {error?.data?.message || error?.message || 'يرجى المحاولة مرة أخرى'}
            </p>
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    if (!isUpdating) {
      reset();
      onClose();
    }
  };

  if (!target) return null;

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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/50 text-left align-middle transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                        تعديل الهدف
                      </Dialog.Title>
                      <p className="text-gray-600 mt-1">
                        تحديث بيانات الهدف للموظف: {target.employee.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isUpdating}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleUpdateTarget)} className="p-8">
                  <div className="space-y-6">
                    {/* Target Amount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        الهدف المطلوب (عدد التقديمات) *
                      </label>
                      <Controller
                        name="targetAmount"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <input
                              {...field}
                              type="number"
                              min="1"
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:ring-4 focus:outline-none transition-all duration-200 text-lg font-semibold"
                              placeholder="أدخل عدد التقديمات المطلوبة"
                              dir="ltr"
                            />
                            {errors.targetAmount && (
                              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.targetAmount.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ملاحظات (اختياري)
                      </label>
                      <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:ring-4 focus:outline-none transition-all duration-200 resize-none"
                            placeholder="أضف أي ملاحظات حول الهدف..."
                            dir="rtl"
                          />
                        )}
                      />
                    </div>

                    {/* Set By ID */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        من قام بتحديد الهدف (اختياري)
                      </label>
                      <Controller
                        name="setById"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:ring-4 focus:outline-none transition-all duration-200"
                            placeholder="أدخل معرف الشخص الذي حدد الهدف"
                            dir="ltr"
                          />
                        )}
                      />
                    </div>

                    {/* Form Preview */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-600" />
                        معاينة البيانات
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">الهدف المطلوب:</p>
                          <p className="text-lg font-bold text-gray-900">{watchedValues.targetAmount || 0} تقديم</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">الموظف:</p>
                          <p className="text-lg font-bold text-gray-900">{target.employee.name}</p>
                        </div>
                        {watchedValues.notes && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">الملاحظات:</p>
                            <p className="text-sm text-gray-800 bg-white/50 rounded-lg p-3">{watchedValues.notes}</p>
                          </div>
                        )}
                        {watchedValues.setById && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">من قام بالتحديد:</p>
                            <p className="text-sm text-gray-800 bg-white/50 rounded-lg p-3">{watchedValues.setById}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isUpdating}
                      className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid || isUpdating}
                      className="px-8 py-3 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          جاري التحديث...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4" />
                          تحديث الهدف
                        </>
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

export default EditTargetModal;
