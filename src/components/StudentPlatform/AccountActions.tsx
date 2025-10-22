'use client';
import React from 'react';
import { Button } from '@headlessui/react';
import { KeyIcon, TrashIcon } from '@heroicons/react/24/outline';

interface AccountActionsProps {
  onResetPassword: () => void;
  onDeleteAccount: () => void;
  isResettingPassword: boolean;
  isDeletingAccount: boolean;
}

const AccountActions: React.FC<AccountActionsProps> = ({
  onResetPassword,
  onDeleteAccount,
  isResettingPassword,
  isDeletingAccount
}) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-end space-x-4">
      <Button
        onClick={onResetPassword}
        disabled={isResettingPassword}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isResettingPassword ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>جاري إعادة التعيين...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <KeyIcon className="w-5 h-5" />
            <span>إعادة تعيين كلمة المرور</span>
          </div>
        )}
      </Button>
      <Button
        onClick={onDeleteAccount}
        disabled={isDeletingAccount}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeletingAccount ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>جاري الحذف...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <TrashIcon className="w-5 h-5" />
            <span>حذف الحساب</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default AccountActions;
