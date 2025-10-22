"use client";

import React from 'react';
import { Plus, RefreshCw } from "lucide-react";

interface DistributionHeaderProps {
  onCreateClick: () => void;
  onRefreshClick: () => void;
}

export const DistributionHeader: React.FC<DistributionHeaderProps> = ({
  onCreateClick,
  onRefreshClick
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">التوزيعات</h1>
        <p className="text-gray-600">إدارة وتتبع توزيعات الطلاب على القاعات</p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={onCreateClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          توزيع جديد
        </button>
        <button 
          onClick={onRefreshClick}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث
        </button>
      </div>
    </div>
  );
};
