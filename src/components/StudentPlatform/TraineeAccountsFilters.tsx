'use client';
import React, { useState, useEffect } from 'react';
import { TraineeAccountFilters } from '@/interface/trainee-platform';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

interface TraineeAccountsFiltersProps {
  filters: TraineeAccountFilters;
  onFilterChange: (newFilters: Partial<TraineeAccountFilters>) => void;
}

const TraineeAccountsFilters: React.FC<TraineeAccountsFiltersProps> = ({ filters, onFilterChange }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [isActive, setIsActive] = useState<boolean | ''>(filters.isActive ?? '');
  const [programId, setProgramId] = useState<number | ''>(filters.programId || '');
  const [sortBy, setSortBy] = useState(filters.sortBy || 'createdAt');
  const [sortOrder, setSortOrder] = useState(filters.sortOrder || 'desc');

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({ 
        search, 
        isActive: isActive === '' ? undefined : isActive, 
        programId: programId === '' ? undefined : programId, 
        sortBy, 
        sortOrder 
      });
    }, 500); // Debounce search input

    return () => {
      clearTimeout(handler);
    };
  }, [search, isActive, programId, sortBy, sortOrder, onFilterChange]);

  const handleResetFilters = () => {
    setSearch('');
    setIsActive('');
    setProgramId('');
    setSortBy('createdAt');
    setSortOrder('desc');
    onFilterChange({
      search: undefined,
      isActive: undefined,
      programId: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <FunnelIcon className="w-6 h-6 text-blue-600" />
          <span>خيارات البحث والتصفية</span>
        </h2>
        <button
          onClick={handleResetFilters}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <ArrowPathIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          إعادة تعيين
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="بحث بالاسم أو الرقم القومي..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Account Status Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <UserGroupIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={isActive === '' ? '' : isActive ? 'true' : 'false'}
            onChange={(e) => setIsActive(e.target.value === '' ? '' : e.target.value === 'true')}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all duration-200"
          >
            <option value="">كل الحالات</option>
            <option value="true">نشط</option>
            <option value="false">غير نشط</option>
          </select>
        </div>

        {/* Program Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AcademicCapIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all duration-200"
          >
            <option value="">كل البرامج</option>
            {/* Add program options here */}
          </select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all duration-200"
          >
            <option value="createdAt">تاريخ الإنشاء</option>
            <option value="lastLoginAt">آخر تسجيل دخول</option>
            <option value="trainee.nameAr">اسم المتدرب</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {sortOrder === 'asc' ? (
              <ArrowUpIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ArrowDownIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all duration-200"
          >
            <option value="desc">تنازلي</option>
            <option value="asc">تصاعدي</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TraineeAccountsFilters;