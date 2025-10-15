import React from 'react';
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  onAddNew?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

// مكون لعرض الحالة الفارغة
export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddNew,
  title = "لا توجد حسابات متدربين",
  description = "لم يتم العثور على أي حسابات متدربين. يمكنك إضافة حساب جديد أو تعديل معايير البحث.",
  actionText = "إضافة حساب جديد"
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
      <div className="text-center">
        {/* أيقونة */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <UserGroupIcon className="w-12 h-12 text-gray-400" />
        </div>
        
        {/* العنوان */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        {/* الوصف */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {description}
        </p>
        
        {/* زر الإجراء */}
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 ml-2" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
