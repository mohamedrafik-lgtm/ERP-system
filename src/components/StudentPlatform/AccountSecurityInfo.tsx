'use client';
import React from 'react';
import {
  KeyIcon,
  ClockIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { formatDateTime } from '@/utils/dateUtils';

interface AccountSecurityInfoProps {
  account: any;
}

const AccountSecurityInfo: React.FC<AccountSecurityInfoProps> = ({ account }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <KeyIcon className="w-5 h-5 text-orange-600" />
        <span>معلومات الأمان والحساب</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">آخر تسجيل دخول: {formatDateTime(account.lastLoginAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">تاريخ إنشاء الحساب: {formatDateTime(account.createdAt)}</span>
        </div>
        {account.resetCode && (
          <div className="flex items-center space-x-2 md:col-span-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">
              كود إعادة التعيين: {account.resetCode} (ينتهي: {formatDateTime(account.resetCodeExpiresAt)})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSecurityInfo;
