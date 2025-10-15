import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface NoResultsStateProps {
  onClearSearch?: () => void;
  searchTerm?: string;
  title?: string;
  description?: string;
}

// مكون لعرض حالة عدم وجود نتائج للبحث
export const NoResultsState: React.FC<NoResultsStateProps> = ({
  onClearSearch,
  searchTerm,
  title,
  description
}) => {
  const defaultTitle = searchTerm 
    ? `لا توجد نتائج لـ "${searchTerm}"`
    : "لا توجد نتائج";

  const defaultDescription = searchTerm
    ? "لم يتم العثور على أي حسابات تطابق معايير البحث. جرب تغيير كلمات البحث أو المعايير."
    : "لم يتم العثور على أي حسابات تطابق المعايير المحددة.";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
      <div className="text-center">
        {/* أيقونة البحث */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
        </div>
        
        {/* العنوان */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title || defaultTitle}
        </h3>
        
        {/* الوصف */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {description || defaultDescription}
        </p>
        
        {/* أزرار الإجراء */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 ml-2" />
              مسح البحث
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  );
};
