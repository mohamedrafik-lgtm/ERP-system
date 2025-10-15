import React from 'react';
import { TraineeAccountUI } from '@/types/traineePlatform';
import { TraineeAccountMapper } from '@/mappers/TraineeAccountMapper';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface AccountTableProps {
  accounts: TraineeAccountUI[];
  selectedAccounts: string[];
  onSelectAccount: (accountId: string) => void;
  onSelectAll: () => void;
  onViewAccount: (accountId: string) => void;
  onEditAccount: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
}

// Single Responsibility Principle - Component responsible only for displaying table
export const AccountTable: React.FC<AccountTableProps> = ({
  accounts,
  selectedAccounts,
  onSelectAccount,
  onSelectAll,
  onViewAccount,
  onEditAccount,
  onDeleteAccount
}) => {
  const isAllSelected = selectedAccounts.length === accounts.length && accounts.length > 0;
  const isIndeterminate = selectedAccounts.length > 0 && selectedAccounts.length < accounts.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={onSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المتدرب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                البرنامج
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                حالة المتدرب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                آخر دخول
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => onSelectAccount(account.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {account.photoUrl ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={account.photoUrl}
                          alt={account.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {account.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.email || 'لا يوجد بريد إلكتروني'}</div>
                      <div className="text-sm text-gray-500">{account.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.program}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${TraineeAccountMapper.getStatusColor(account.status)}`}>
                    {TraineeAccountMapper.getStatusText(account.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${TraineeAccountMapper.getStatusColor(account.traineeStatus)}`}>
                    {account.traineeStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.lastLogin || 'لم يسجل دخول'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onViewAccount(account.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="عرض"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEditAccount(account.id)}
                      className="text-green-600 hover:text-green-900"
                      title="تعديل"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteAccount(account.id)}
                      className="text-red-600 hover:text-red-900"
                      title="حذف"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
