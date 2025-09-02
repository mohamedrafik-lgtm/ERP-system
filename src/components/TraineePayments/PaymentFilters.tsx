"use client";

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface PaymentFiltersProps {
  searchTerm: string;
  statusFilter: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function PaymentFilters({
  searchTerm,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusFilterChange,
  onSortChange
}: PaymentFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن متدرب أو إجراء..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">جميع الحالات</option>
            <option value="paid">مدفوع بالكامل</option>
            <option value="partial">مدفوع جزئياً</option>
            <option value="unpaid">غير مدفوع</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="date">ترتيب حسب التاريخ</option>
            <option value="amount">ترتيب حسب المبلغ</option>
            <option value="trainee">ترتيب حسب المتدرب</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
