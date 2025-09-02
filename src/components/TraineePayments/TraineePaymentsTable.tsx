"use client";

import { motion } from 'framer-motion';
import { User, Plus, CreditCard } from 'lucide-react';
import { TraineePaymentResponse } from '@/types/payment';
import { formatCurrency, getRemainingAmount, formatDate } from '@/utils/traineePaymentUtils';

interface TraineePaymentsTableProps {
  payments: TraineePaymentResponse[];
  onAddPayment: (payment: TraineePaymentResponse) => void;
}

const statusConfig = {
  PAID: {
    label: 'مدفوع بالكامل',
    color: 'bg-green-100 text-green-800',
    icon: '✓'
  },
  PARTIALLY_PAID: {
    label: 'مدفوع جزئياً',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏱'
  },
  PENDING: {
    label: 'غير مدفوع',
    color: 'bg-red-100 text-red-800',
    icon: '✗'
  }
};

export default function TraineePaymentsTable({
  payments,
  onAddPayment
}: TraineePaymentsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                الإجراءات
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                المتدرب
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                الرسوم
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                المبلغ المطلوب
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                المبلغ المدفوع
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                المبلغ المتبقي
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                الحالة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 border-b border-gray-200">
                تاريخ الدفع
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => {
              const remainingAmount = getRemainingAmount(payment);
              const statusInfo = statusConfig[payment.status];
              
              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {remainingAmount > 0 ? (
                        <button 
                          onClick={() => onAddPayment(payment)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg" 
                          title="إضافة دفعة"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm font-medium">دفع</span>
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500 font-medium">مدفوع بالكامل</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{payment.trainee.name}</p>
                        <p className="text-xs text-gray-500">ID: {payment.trainee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.fee.name}</p>
                      <p className="text-xs text-gray-500">{payment.fee.type}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">{formatCurrency(payment.paidAmount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-red-600">{formatCurrency(remainingAmount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      <span className="text-xs">{statusInfo.icon}</span>
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{formatDate(payment.paidAt)}</p>
                      {payment.notes && (
                        <p className="text-xs text-gray-500 mt-1">{payment.notes}</p>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {payments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مدفوعات</h3>
          <p className="text-gray-500 mb-6">لم يتم العثور على أي مدفوعات تطابق معايير البحث</p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            إضافة دفعة جديدة
          </button>
        </div>
      )}
    </motion.div>
  );
}
