'use client';
import React from 'react';
import { TraineeAccount } from '@/interface/trainee-platform';
import { formatDateTime } from '@/utils/dateUtils';
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface TraineeAccountRowProps {
  account: TraineeAccount;
  index: number;
  page: number;
  limit: number;
  onViewDetails: (accountId: string) => void;
  onStatusToggle: (account: TraineeAccount) => void;
  onDelete: (account: TraineeAccount) => void;
}

const TraineeAccountRow: React.FC<TraineeAccountRowProps> = ({
  account,
  index,
  page,
  limit,
  onViewDetails,
  onStatusToggle,
  onDelete
}) => {
  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <CheckCircleIcon className="w-3 h-3" />
        نشط
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        <XCircleIcon className="w-3 h-3" />
        غير نشط
      </span>
    );
  };

  return (
    <div className="group bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* رقم التسلسل */}
        <div className="lg:col-span-1 text-center lg:text-right">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {(page - 1) * limit + index + 1}
          </div>
        </div>

        {/* بيانات المتدرب */}
        <div className="lg:col-span-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{account.trainee.nameAr}</h3>
              <p className="text-sm text-gray-500">ر.ق: {account.trainee.nationalId}</p>
            </div>
          </div>
        </div>

        {/* البرنامج */}
        <div className="lg:col-span-2 text-center">
          <span className="text-gray-700 font-medium">{account.trainee.program?.nameAr || 'N/A'}</span>
        </div>

        {/* الحالة */}
        <div className="lg:col-span-2 text-center">
          {getStatusBadge(account.isActive)}
        </div>

        {/* آخر تسجيل دخول */}
        <div className="lg:col-span-2 text-center">
          <span className="text-gray-700 font-medium">{formatDateTime(account.lastLoginAt)}</span>
        </div>

        {/* الإجراءات */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-center space-x-2">
            {/* عرض التفاصيل */}
            <button
              onClick={() => onViewDetails(account.id)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group"
              title="عرض التفاصيل"
            >
              <EyeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* تفعيل/إلغاء تفعيل */}
            <button
              onClick={() => onStatusToggle(account)}
              className={`p-2 ${account.isActive ? 'text-orange-600 hover:bg-orange-100' : 'text-green-600 hover:bg-green-100'} rounded-lg transition-colors group`}
              title={account.isActive ? 'إلغاء تفعيل الحساب' : 'تفعيل الحساب'}
            >
              {account.isActive ? (
                <XCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* حذف */}
            <button
              onClick={() => onDelete(account)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group"
              title="حذف الحساب"
            >
              <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeAccountRow;
