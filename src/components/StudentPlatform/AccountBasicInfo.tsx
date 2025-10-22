'use client';
import React from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { formatDateOnly } from '@/utils/dateUtils';

interface AccountBasicInfoProps {
  account: any;
}

const AccountBasicInfo: React.FC<AccountBasicInfoProps> = ({ account }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <UserIcon className="w-5 h-5 text-blue-600" />
        <span>المعلومات الأساسية للمتدرب</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">{account.trainee.email || 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">{account.trainee.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <AcademicCapIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">البرنامج: {account.trainee.program?.nameAr || 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">المستوى: {account.trainee.classLevel || 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 font-medium">تاريخ الميلاد: {formatDateOnly(account.birthDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">الحالة: {account.isActive ? 'نشط' : 'غير نشط'}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountBasicInfo;
