'use client';
import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDeleteUserMutation } from '@/lip/features/users/user';
import toast from 'react-hot-toast';
import { 
  TrashIcon, 
  ExclamationTriangleIcon, 
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserGroupIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface DeleteConfirmationEnhancedProps {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  userAccountType?: string;
  onDeleteSuccess?: () => void;
}

export default function DeleteConfirmationEnhanced({
  userId,
  userName,
  userEmail,
  userPhone,
  userAccountType,
  onDeleteSuccess
}: DeleteConfirmationEnhancedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
      setIsOpen(false);
      setShowSuccess(true);
      toast.success('تم حذف المستخدم بنجاح');
      onDeleteSuccess?.();
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف المستخدم');
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group"
      >
        <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-red-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <DialogTitle as="h3" className="text-xl font-bold text-gray-900">
                        تأكيد حذف المستخدم
                      </DialogTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        هذا الإجراء لا يمكن التراجع عنه
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-900 mb-1">تحذير مهم</h4>
                      <p className="text-sm text-red-700">
                        سيتم حذف المستخدم نهائياً من النظام وجميع البيانات المرتبطة به
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{userName}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{userEmail}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional User Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {userPhone && (
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-200">
                        <PhoneIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{userPhone}</span>
                      </div>
                    )}
                    
                    {userAccountType && (
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-200">
                        <UserGroupIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {userAccountType === 'STAFF' ? 'موظف' : 'مدرب'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <ShieldExclamationIcon className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-900 mb-1">تأكيد نهائي</h4>
                      <p className="text-sm text-red-700 mb-2">
                        هل أنت متأكد تماماً من حذف المستخدم <span className="font-bold">{userName}</span>؟
                      </p>
                      <p className="text-xs text-red-600">
                        هذا الإجراء سيمنع المستخدم من الوصول للنظام نهائياً
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className={`px-6 py-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري الحذف...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <TrashIcon className="w-4 h-4" />
                      <span>حذف المستخدم</span>
                    </div>
                  )}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} className="relative z-50 focus:outline-none" onClose={closeSuccess}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <DialogTitle as="h3" className="text-xl font-bold">
                        تم الحذف بنجاح
                      </DialogTitle>
                      <p className="text-green-100 text-sm mt-1">
                        تم حذف المستخدم من النظام
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={closeSuccess}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-900 mb-1">عملية مكتملة</h4>
                      <p className="text-sm text-green-700">
                        تم حذف المستخدم <span className="font-bold">{userName}</span> بنجاح من قاعدة البيانات
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <ShieldExclamationIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">تأثير الحذف</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• تم حذف الحساب نهائياً</li>
                        <li>• تم إلغاء جميع الصلاحيات</li>
                        <li>• لن يتمكن من تسجيل الدخول</li>
                        <li>• تم حذف البيانات المرتبطة</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end">
                <Button
                  onClick={closeSuccess}
                  className="px-6 py-2.5 text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  تم
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
