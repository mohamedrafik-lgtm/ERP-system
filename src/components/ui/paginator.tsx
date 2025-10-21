"use client";
import { useState, useCallback, memo } from "react";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

const Paginator = ({ totalPages = 3, onPageChange }: { totalPages?: number; onPageChange?: (page: number) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  }, [totalPages, onPageChange]);

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      {/* First Page */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="الصفحة الأولى"
      >
        <ChevronDoubleRightIcon className="w-5 h-5" />
      </button>

      {/* Previous Page */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="الصفحة السابقة"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }
          
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="الصفحة التالية"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Last Page */}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="الصفحة الأخيرة"
      >
        <ChevronDoubleLeftIcon className="w-5 h-5" />
      </button>

      {/* Page Info */}
      <div className="mr-4 text-sm text-gray-500">
        صفحة {currentPage} من {totalPages}
      </div>
    </div>
  );
};

export default memo(Paginator);
