'use client';
import React from 'react';
import { UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  onRefresh: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد حسابات متدربين</h3>
      <p className="text-gray-500 mb-6">لم يتم العثور على أي حسابات متدربين مطابقة للمعايير.</p>
      <button
        onClick={onRefresh}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowPathIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        إعادة تحميل
      </button>
    </div>
  );
};

export default EmptyState;
