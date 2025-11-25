"use client";

import React from 'react';
import { Search } from "lucide-react";
import { DistributionType } from '@/app/DistributionStatistics/types';

interface DistributionFiltersProps {
  searchTerm: string;
  typeFilter: DistributionType;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: DistributionType) => void;
}

export const DistributionFilters: React.FC<DistributionFiltersProps> = ({
  searchTerm,
  typeFilter,
  onSearchChange,
  onTypeFilterChange
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث باسم البرنامج أو العام الدراسي..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select
            className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as DistributionType)}
          >
            <option value="ALL">جميع الأنواع</option>
            <option value="THEORY">نظري</option>
            <option value="PRACTICAL">عملي</option>
          </select>
        </div>
      </div>
    </div>
  );
};


