'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  useGetTraineeAccountByIdQuery,
  useResetTraineeAccountPasswordMutation,
  useDeleteTraineeAccountMutation
} from '@/lip/features/trainee-platform/traineeAccountsApi';
import AccountBasicInfo from './AccountBasicInfo';
import AccountSecurityInfo from './AccountSecurityInfo';
import AccountActions from './AccountActions';
import toast from 'react-hot-toast';

interface TraineeAccountDetailsProps {
  accountId: string;
  isOpen: boolean;
  onClose: () => void;
}

const TraineeAccountDetails: React.FC<TraineeAccountDetailsProps> = ({ 
  accountId, 
  isOpen, 
  onClose 
}) => {
  const { data: accountData, isLoading, isError, refetch } = useGetTraineeAccountByIdQuery(accountId);
  const [resetPassword, { isLoading: isResettingPassword }] = useResetTraineeAccountPasswordMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteTraineeAccountMutation();

  const [isConfirmResetModalOpen, setIsConfirmResetModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const handleResetPassword = async () => {
    try {
      await resetPassword(accountId).unwrap();
      toast.success('تم إعادة تعيين كلمة المرور بنجاح. سيتم إرسال كلمة مرور جديدة للمتدرب.');
      setIsConfirmResetModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('حدث خطأ أثناء إعادة تعيين كلمة المرور.');
      console.error('Failed to reset password:', err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(accountId).unwrap();
      toast.success('تم حذف حساب المتدرب بنجاح.');
      setIsConfirmDeleteModalOpen(false);
      onClose();
    } catch (err) {
      toast.error('حدث خطأ أثناء حذف الحساب.');
      console.error('Failed to delete account:', err);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="ml-3 text-gray-700">جاري تحميل تفاصيل الحساب...</p>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  if (isError || !accountData) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-2xl shadow-2xl text-center">
            <p className="text-red-600">حدث خطأ أثناء تحميل تفاصيل الحساب.</p>
            <Button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md">
              إغلاق
            </Button>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  const account = accountData.data;

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <DialogTitle as="h3" className="text-2xl font-bold">
                        تفاصيل حساب المتدرب
                      </DialogTitle>
                      <p className="text-blue-100 text-sm mt-1">
                        عرض جميع المعلومات المتعلقة بحساب المتدرب: {account.trainee.nameAr}
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
              <div className="p-6 space-y-6">
                <AccountBasicInfo account={account} />
                <AccountSecurityInfo account={account} />
                <AccountActions
                  onResetPassword={() => setIsConfirmResetModalOpen(true)}
                  onDeleteAccount={() => setIsConfirmDeleteModalOpen(true)}
                  isResettingPassword={isResettingPassword}
                  isDeletingAccount={isDeletingAccount}
                />
              </div>

              {/* Footer Actions */}
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

      {/* Confirmation Modals */}
      <Dialog open={isConfirmResetModalOpen} onClose={() => setIsConfirmResetModalOpen(false)} className="relative z-[60]">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-bold text-orange-600 flex items-center space-x-2">
              <span>تأكيد إعادة تعيين كلمة المرور</span>
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-700">
              هل أنت متأكد أنك تريد إعادة تعيين كلمة المرور للمتدرب{' '}
              <span className="font-semibold">{account.trainee.nameAr}</span>؟
              سيتم إنشاء كلمة مرور جديدة وإرسالها للمتدرب.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsConfirmResetModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={handleResetPassword}
              >
                إعادة تعيين
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isConfirmDeleteModalOpen} onClose={() => setIsConfirmDeleteModalOpen(false)} className="relative z-[60]">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-bold text-red-600 flex items-center space-x-2">
              <span>تأكيد حذف الحساب</span>
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-700">
              هل أنت متأكد أنك تريد حذف حساب المتدرب{' '}
              <span className="font-semibold">{account.trainee.nameAr}</span>؟
              هذا الإجراء لا يمكن التراجع عنه.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsConfirmDeleteModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleDeleteAccount}
              >
                حذف
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default TraineeAccountDetails;