"use client";

import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, TrendingUp, User } from 'lucide-react';

interface PaymentStatsProps {
  stats: {
    total: number;
    paid: number;
    remaining: number;
    totalCount: number;
  };
}

export default function PaymentStats({ stats }: PaymentStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">إجمالي المبالغ</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total)}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">المبلغ المدفوع</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.paid)}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">المبلغ المتبقي</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.remaining)}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
            <TrendingUp className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">إجمالي المدفوعات</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCount}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
            <User className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
