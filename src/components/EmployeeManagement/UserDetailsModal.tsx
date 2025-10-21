'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useGetUserByIdQuery } from '@/lip/features/users/user';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface UserDetailsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({ userId, isOpen, onClose }: UserDetailsModalProps) {
  const { data: userData, isLoading } = useGetUserByIdQuery(userId, {
    skip: !userId || !isOpen
  });

  if (isLoading) {
    return (
      <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل بيانات المستخدم...</p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  if (!userData) {
    return (
      <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">خطأ في تحميل البيانات</h3>
                <p className="text-gray-500 mb-6">لم يتم العثور على بيانات المستخدم</p>
                <Button
                  onClick={onClose}
                  className="px-6 py-2.5 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                >
                  إغلاق
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  const getAccountTypeLabel = (accountType: string) => {
    return accountType === 'STAFF' ? 'موظف' : 'مدرب';
  };

  const getAccountTypeColor = (accountType: string) => {
    return accountType === 'STAFF' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-2xl font-bold">
                      تفاصيل المستخدم
                    </DialogTitle>
                    <p className="text-blue-100 text-sm mt-1">
                      عرض معلومات المستخدم بالتفصيل
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
              {/* User Info Card */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getAccountTypeColor(userData.accountType)}`}>
                      <UserGroupIcon className="w-4 h-4" />
                      {getAccountTypeLabel(userData.accountType)}
                    </span>
                  </div>
                </div>

                {/* User Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                      <p className="font-medium text-gray-900">{userData.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <PhoneIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">رقم الهاتف</p>
                      <p className="font-medium text-gray-900">{userData.phone}</p>
                    </div>
                  </div>

                  {/* Role ID */}
                  {userData.roleId && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <UserIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">معرف الدور</p>
                        <p className="font-medium text-gray-900">{userData.roleId}</p>
                      </div>
                    </div>
                  )}

                  {/* Created At */}
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تاريخ الإنشاء</p>
                      <p className="font-medium text-gray-900">
                        {new Date(userData.createdAt).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>

                  {/* Updated At */}
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">آخر تحديث</p>
                      <p className="font-medium text-gray-900">
                        {new Date(userData.updatedAt).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end">
              <Button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
              >
                إغلاق
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
