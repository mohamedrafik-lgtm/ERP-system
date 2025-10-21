'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { 
  TrashIcon, 
  ExclamationTriangleIcon, 
  XMarkIcon,
  UserIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface DeleteStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletedUser: {
    name: string;
    email: string;
    accountType: string;
  };
}

export default function DeleteStatsModal({ isOpen, onClose, deletedUser }: DeleteStatsModalProps) {
  return (
    <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrashIcon className="w-6 h-6" />
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
                  onClick={onClose}
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
                    <ChartBarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-1">عملية مكتملة</h4>
                    <p className="text-sm text-green-700">
                      تم حذف المستخدم بنجاح من قاعدة البيانات
                    </p>
                  </div>
                </div>
              </div>

              {/* Deleted User Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{deletedUser.name}</h4>
                    <p className="text-sm text-gray-600">{deletedUser.email}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {deletedUser.accountType === 'STAFF' ? 'موظف' : 'مدرب'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5" />
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
                onClick={onClose}
                className="px-6 py-2.5 text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                تم
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
