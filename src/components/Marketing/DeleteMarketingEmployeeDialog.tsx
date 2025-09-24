"use client";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDeleteMarketingEmployeeMutation } from '@/lip/features/marketers/marketersApi';
import { MarketingEmployeeResponse } from '@/types/marketer.types';
import toast from 'react-hot-toast';
import { X, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';

interface DeleteMarketingEmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee: MarketingEmployeeResponse | null;
  onSuccess?: () => void;
}

export const DeleteMarketingEmployeeDialog = ({ 
  isOpen, 
  onClose, 
  employee, 
  onSuccess 
}: DeleteMarketingEmployeeDialogProps) => {
  const [deleteMarketingEmployee, { isLoading: isDeleting }] = useDeleteMarketingEmployeeMutation();
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (!employee) {
      toast.error("لم يتم العثور على بيانات الموظف");
      return;
    }

    if (confirmText !== 'حذف') {
      toast.error("يرجى كتابة 'حذف' للتأكيد");
      return;
    }

    // Toast تحميل
    const loadingToast = toast.loading("جاري حذف الموظف... ⏳", {
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
    });

    try {
      console.log("Deleting marketing employee:", employee.id);

      const result = await deleteMarketingEmployee(employee.id).unwrap();

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      console.log("Marketing employee deleted successfully:", result);

      // Toast نجاح مع تصميم جميل
      toast.success("تم حذف الموظف بنجاح! 🗑️", {
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
      setConfirmText('');
      
      // إغلاق المودال
      onClose();
      
      // استدعاء callback النجاح
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting marketing employee:", error);

      // إزالة toast التحميل
      toast.dismiss(loadingToast);

      // Toast خطأ مع تصميم جميل
      toast.error("حدث خطأ في حذف الموظف! ❌", {
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
    setConfirmText('');
    onClose();
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-right align-middle shadow-2xl transition-all border border-red-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-bold leading-6 text-red-600"
                    >
                      تأكيد الحذف
                    </DialogTitle>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-red-800 font-semibold mb-2">
                      ⚠️ تحذير: هذا الإجراء لا يمكن التراجع عنه!
                    </p>
                    <p className="text-red-700 text-sm">
                      سيتم حذف جميع بيانات الموظف نهائياً من النظام.
                    </p>
                  </div>

                  {employee && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">بيانات الموظف المراد حذفه:</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>الاسم:</strong> {employee.name}</p>
                        <p><strong>الهاتف:</strong> {employee.phone}</p>
                        {employee.email && <p><strong>البريد:</strong> {employee.email}</p>}
                        <p><strong>المتدربين المُعيَّنين:</strong> {employee.totalAssignedTrainees}</p>
                        <p><strong>الأهداف:</strong> {employee.marketingTargets.length}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800">
                      للتأكيد، اكتب <span className="text-red-600 font-bold">"حذف"</span> في المربع أدناه:
                    </label>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-200 focus:ring-4 focus:outline-none transition-all duration-200"
                      placeholder="اكتب 'حذف' هنا"
                      dir="rtl"
                    />
                    {confirmText && confirmText !== 'حذف' && (
                      <p className="text-red-500 text-sm font-medium">
                        يجب كتابة "حذف" بالضبط للتأكيد
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting || confirmText !== 'حذف'}
                    className={`px-8 py-3 text-sm font-semibold text-white rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 ${
                      isDeleting || confirmText !== 'حذف'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        جاري الحذف...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        حذف نهائياً
                      </>
                    )}
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
