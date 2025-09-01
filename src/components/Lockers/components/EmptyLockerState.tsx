'use client';

export const EmptyLockerState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-50 rounded-full p-4 mb-4">
        <svg 
          className="w-12 h-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.5 12.75h15m-15-3h15m-15 6h15M9 21V3" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        لم يتم تحديد خزينة
      </h3>
      <p className="text-sm text-gray-500">
        اختر خزينة من القائمة لعرض تفاصيلها والمعاملات الخاصة بها
      </p>
    </div>
  );
};
