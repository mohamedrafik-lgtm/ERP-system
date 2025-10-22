"use client";

import React from 'react';
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-600 mb-2">فشل في تحميل التوزيعات</h3>
      <p className="text-red-500 mb-4">تأكد من تشغيل الباك إند على http://localhost:4000</p>
      <button 
        onClick={onRetry}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  );
};
