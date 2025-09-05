"use client";

import { motion } from 'framer-motion';
import { User, Plus, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

const activationStatusConfig = {
  APPLIED: {
    label: 'مفعلة',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: '✓'
  },
  NOT_APPLIED: {
    label: 'غير مفعلة',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: '✗'
  }
};

export default function TraineePaymentsTable({
  payments,
  onAddPayment
}: TraineePaymentsTableProps) {
  const router = useRouter();

  const handlePaymentClick = (traineeId: string) => {
    router.push(`/TraineePayments/${traineeId}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="p-0" dir="rtl">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-sm p-6 border-b border-slate-600">
          <div className="col-span-3 text-right text-white font-bold text-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            👤 بيانات المتدرب
          </div>
          <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            🎓 البرنامج التدريبي
          </div>
          <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            💰 البيانات المالية
          </div>
          <div className="text-center col-span-2 text-white font-bold text-lg flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            📊 حالة الدفع
          </div>
          <div className="text-center col-span-3 text-white font-bold text-lg flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            ⚡ الإجراءات
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4 p-6">
          {payments.map((payment) => {
            const remainingAmount = getRemainingAmount(payment);
            const statusInfo = statusConfig[payment.status] || statusConfig.PENDING;
            const totalAmount = payment.amount;
            const paidAmount = payment.paidAmount;
            
            return (
              <div
                key={payment.id}
                className="group relative bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:shadow-2xl rounded-2xl p-6 shadow-lg border border-gray-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* بيانات المتدرب */}
                  <div className="lg:col-span-3 text-center lg:text-right">
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">
                            {payment.trainee?.nameAr?.charAt(0) || 'ر'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg mb-1">{payment.trainee?.nameAr || 'غير محدد'}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📞</span>
                          <span>{payment.trainee?.phone || 'غير محدد'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>🪪</span>
                          <span>ID: {payment.trainee?.id || 'غير محدد'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* البرنامج التدريبي */}
                  <div className="lg:col-span-2 text-center">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200/50 shadow-sm">
                      <p className="font-bold text-green-800 text-sm">{payment.fee?.name || 'غير محدد'}</p>
                    </div>
                  </div>

                  {/* البيانات المالية */}
                  <div className="lg:col-span-2 text-center">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/50 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-purple-600 font-medium">الإجمالي:</span>
                        <span className="text-sm font-bold text-purple-800">{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-green-600 font-medium">المدفوع:</span>
                        <span className="text-sm font-bold text-green-600">{formatCurrency(paidAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-red-600 font-medium">المتبقي:</span>
                        <span className="text-sm font-bold text-red-600">{formatCurrency(remainingAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* حالة الدفع */}
                  <div className="lg:col-span-2 text-center">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <span className="text-xs">{statusInfo.icon}</span>
                        {statusInfo.label}
                      </span>
                      <p className="text-xs text-gray-500">12 رسوم</p>
                    </div>
                  </div>

                  {/* الإجراءات */}
                  <div className="lg:col-span-3 flex justify-center">
                    {remainingAmount > 0 ? (
                      <button 
                        onClick={() => handlePaymentClick(payment.trainee?.id || '')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl group-hover:scale-105"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="font-medium">دفع</span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">مدفوع بالكامل</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
      </div>
    </motion.div>
  );
}
