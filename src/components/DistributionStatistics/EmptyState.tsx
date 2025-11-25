"use client";

import React from 'react';
import { BarChart3 } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BarChart3 className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد توزيعات</h3>
      <p className="text-gray-600 mb-6">لم يتم العثور على أي توزيعات تطابق معايير البحث</p>
      <button 
        onClick={onCreateClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        إنشاء توزيع جديد
      </button>
    </div>
  );
};


