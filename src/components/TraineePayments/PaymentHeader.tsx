"use client";

import { motion } from 'framer-motion';
import { CreditCard, Download, Plus } from 'lucide-react';

interface PaymentHeaderProps {
  onAddPayment: () => void;
  onExportReport: () => void;
}

export default function PaymentHeader({ onAddPayment, onExportReport }: PaymentHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            مدفوعات المتدربين
          </h1>
          <p className="text-gray-600 text-lg">
            إدارة ومتابعة مدفوعات المتدربين والرسوم المالية
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <button 
            onClick={onAddPayment}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            إضافة دفعة جديدة
          </button>
          <button 
            onClick={onExportReport}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            تصدير التقرير
          </button>
        </div>
      </div>
    </motion.div>
  );
}
