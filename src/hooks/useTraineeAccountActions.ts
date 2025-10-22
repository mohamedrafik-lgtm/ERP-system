import { useState } from 'react';
import { useUpdateTraineeAccountStatusMutation, useResetTraineeAccountPasswordMutation, useDeleteTraineeAccountMutation } from '@/lip/features/trainee-platform/traineeAccountsApi';
import toast from 'react-hot-toast';

export const useTraineeAccountActions = () => {
  const [updateStatus] = useUpdateTraineeAccountStatusMutation();
  const [resetPassword] = useResetTraineeAccountPasswordMutation();
  const [deleteAccount] = useDeleteTraineeAccountMutation();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<any>(null);

  const handleStatusToggle = async (account: any) => {
    try {
      const result = await updateStatus({
        id: account.id,
        isActive: !account.isActive // سيتم تجاهلها من الباك إند، لكن نبقيها للتوافق
      }).unwrap();
      
      // استخدم الحالة الجديدة من الـ response
      const newStatus = result.isActive;
      toast.success(`تم ${newStatus ? 'تفعيل' : 'إلغاء تفعيل'} حساب المتدرب ${account.trainee.nameAr} بنجاح.`);
    } catch (err) {
      toast.error('حدث خطأ أثناء تحديث حالة الحساب.');
      console.error('Failed to update account status:', err);
    }
  };

  const openDeleteConfirmModal = (account: any) => {
    setAccountToDelete(account);
    setIsConfirmModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setAccountToDelete(null);
  };

  const handleDeleteAccount = async () => {
    if (accountToDelete) {
      try {
        await deleteAccount(accountToDelete.id).unwrap();
        toast.success(`تم حذف حساب المتدرب ${accountToDelete.trainee.nameAr} بنجاح.`);
        closeDeleteConfirmModal();
      } catch (err) {
        toast.error('حدث خطأ أثناء حذف الحساب.');
        console.error('Failed to delete account:', err);
      }
    }
  };

  const handleResetPassword = async (accountId: string) => {
    try {
      await resetPassword(accountId).unwrap();
      toast.success('تم إعادة تعيين كلمة المرور بنجاح. سيتم إرسال كلمة مرور جديدة للمتدرب.');
    } catch (err) {
      toast.error('حدث خطأ أثناء إعادة تعيين كلمة المرور.');
      console.error('Failed to reset password:', err);
    }
  };

  return {
    handleStatusToggle,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    handleDeleteAccount,
    handleResetPassword,
    isConfirmModalOpen,
    accountToDelete
  };
};
