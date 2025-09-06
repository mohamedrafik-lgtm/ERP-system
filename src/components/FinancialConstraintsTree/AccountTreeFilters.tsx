"use client";

import { memo, useCallback } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { IAccountFilter } from '@/types/financial.types';

interface AccountTreeFiltersProps {
  filters: IAccountFilter;
  onFiltersChange: (filters: IAccountFilter) => void;
  onClearFilters: () => void;
}

const AccountTreeFilters = memo(({
  filters,
  onFiltersChange,
  onClearFilters
}: AccountTreeFiltersProps) => {
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchTerm: e.target.value
    });
  }, [filters, onFiltersChange]);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      type: e.target.value as 'all' | 'credit' | 'debit'
    });
  }, [filters, onFiltersChange]);

  const handleLevelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      level: e.target.value as 'all' | 'main' | 'child'
    });
  }, [filters, onFiltersChange]);

  const handleBalanceChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      hasBalance: e.target.value as 'all' | 'yes' | 'no'
    });
  }, [filters, onFiltersChange]);

  const hasActiveFilters = filters.searchTerm || 
    filters.type !== 'all' || 
    filters.level !== 'all' || 
    filters.hasBalance !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">فلاتر البحث</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            مسح الفلاتر
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="البحث بالاسم أو الكود..."
            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={handleTypeChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">جميع الأنواع</option>
          <option value="credit">دائن</option>
          <option value="debit">مدين</option>
        </select>

        {/* Level Filter */}
        <select
          value={filters.level}
          onChange={handleLevelChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">جميع المستويات</option>
          <option value="main">رئيسي</option>
          <option value="child">فرعي</option>
        </select>

        {/* Balance Filter */}
        <select
          value={filters.hasBalance}
          onChange={handleBalanceChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">جميع الأرصدة</option>
          <option value="yes">له رصيد</option>
          <option value="no">بدون رصيد</option>
        </select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
          {filters.searchTerm && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              بحث: {filters.searchTerm}
            </span>
          )}
          {filters.type !== 'all' && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              نوع: {filters.type === 'credit' ? 'دائن' : 'مدين'}
            </span>
          )}
          {filters.level !== 'all' && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              مستوى: {filters.level === 'main' ? 'رئيسي' : 'فرعي'}
            </span>
          )}
          {filters.hasBalance !== 'all' && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
              رصيد: {filters.hasBalance === 'yes' ? 'له رصيد' : 'بدون رصيد'}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

AccountTreeFilters.displayName = 'AccountTreeFilters';

export default AccountTreeFilters;
