"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, AlertCircle, Calculator, Banknote } from 'lucide-react';
import { useAutoPaymentMutation, AutoPaymentRequest } from '@/lip/features/traineePayments/traineePaymentDetailsApi';
import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { FinancialAccount } from '@/interface';

interface SmartPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  traineeId: string;
  traineeName: string;
  remainingAmount: number;
  onPaymentSuccess?: () => void;
}

interface PaymentFormData {
  amount: number;
  safeId: string;
  notes: string;
  paymentCount: number;
}

export default function SmartPaymentDialog({
  isOpen,
  onClose,
  traineeId,
  traineeName,
  remainingAmount,
  onPaymentSuccess
}: SmartPaymentDialogProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    safeId: '',
    notes: '',
    paymentCount: 1
  });
  const [error, setError] = useState('');
  
  // Redux Toolkit Query mutation
  const [autoPayment, { isLoading: isSubmitting }] = useAutoPaymentMutation();
  
  // Get safes from Redux
  const { data: safes = [], isLoading: isSafesLoading } = useGetFinanceQuery();

  const handleInputChange = (field: keyof PaymentFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (formData.amount <= 0) {
      setError('المبلغ يجب أن يكون أكبر من صفر');
      return false;
    }
    if (formData.amount > remainingAmount) {
      setError(`المبلغ لا يمكن أن يتجاوز المبلغ المتبقي (${remainingAmount.toLocaleString()} جنيه)`);
      return false;
    }
    if (!formData.safeId.trim()) {
      setError('يجب اختيار خزنة');
      return false;
    }
    if (formData.paymentCount < 1 || formData.paymentCount > 12) {
      setError('عدد الدفعات يجب أن يكون بين 1 و 12');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setError('');

    // إغلاق الـ dialog فوراً
    handleClose();

    try {
      const paymentData: AutoPaymentRequest = {
        traineeId: parseInt(traineeId),
        amount: formData.amount,
        safeId: formData.safeId,
        notes: formData.notes
      };

      const result = await autoPayment(paymentData).unwrap();

      if (result.success) {
        // إظهار إشعار النجاح
        showSuccessNotification();
        onPaymentSuccess?.();
      } else {
        // إظهار إشعار الخطأ
        showErrorNotification(result.message || 'حدث خطأ في المعالجة');
      }

    } catch (err: any) {
      // إظهار إشعار الخطأ
      showErrorNotification(err?.data?.message || err?.message || 'حدث خطأ غير متوقع');
    }
  };

  // دالة لإظهار إشعار النجاح
  const showSuccessNotification = () => {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-[9999] bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-bold text-lg">تم الدفع بنجاح!</h4>
          <p class="text-green-100 text-sm">تم معالجة الدفع بنجاح</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار بعد 4 ثوان
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  };

  // دالة لإظهار إشعار الخطأ
  const showErrorNotification = (message: string) => {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-[9999] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-bold text-lg">فشل في الدفع</h4>
          <p class="text-red-100 text-sm">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار بعد 5 ثوان
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  };

  const handleClose = () => {
    setFormData({ amount: 0, safeId: '', notes: '', paymentCount: 1 });
    setError('');
    onClose();
  };

  // Calculate payment split suggestion
  const calculatePaymentSplit = () => {
    if (formData.amount <= 0 || formData.paymentCount <= 0) return null;
    
    const amountPerPayment = Math.floor(formData.amount / formData.paymentCount);
    const remainder = formData.amount % formData.paymentCount;
    
    return {
      amountPerPayment,
      remainder,
      payments: Array.from({ length: formData.paymentCount }, (_, index) => 
        amountPerPayment + (index < remainder ? 1 : 0)
      )
    };
  };

  const paymentSplit = calculatePaymentSplit();

  const quickAmounts = [
    { label: '25%', value: Math.round(remainingAmount * 0.25), icon: '¼' },
    { label: '50%', value: Math.round(remainingAmount * 0.5), icon: '½' },
    { label: '75%', value: Math.round(remainingAmount * 0.75), icon: '¾' },
    { label: '100%', value: remainingAmount, icon: '💯' },
    { label: '500', value: 500, icon: '💰' },
    { label: '1000', value: 1000, icon: '💵' },
    { label: '2000', value: 2000, icon: '💸' },
    { label: '5000', value: 5000, icon: '🏦' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden border border-gray-100"
            dir="rtl"
          >
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-8 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">الدفع الذكي</h2>
                    <p className="text-emerald-100 text-lg font-medium">{traineeName}</p>
                    <p className="text-emerald-200 text-sm">نظام الدفع التلقائي الذكي</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      💰 المبلغ المراد دفعه
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={formData.amount || ''}
                        onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                        className="w-full px-6 py-4 pr-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 text-xl font-medium transition-all duration-200 group-hover:border-gray-300"
                        placeholder="0"
                        min="0"
                        max={remainingAmount}
                        step="0.01"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">
                        EGP
                      </span>
                    </div>
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-blue-700 font-medium">
                        💳 المبلغ المتبقي: <span className="font-bold text-lg">{remainingAmount.toLocaleString()}</span> جنيه
                      </p>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      ⚡ مبالغ سريعة
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {quickAmounts.map((quick) => (
                        <button
                          key={quick.label}
                          type="button"
                          onClick={() => handleInputChange('amount', quick.value)}
                          className={`px-3 py-3 text-sm font-medium border-2 rounded-xl transition-all duration-200 group ${
                            formData.amount === quick.value
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-700 shadow-md scale-105'
                              : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:scale-105'
                          }`}
                        >
                          <div className="text-lg mb-1">{quick.icon}</div>
                          <span className={`group-hover:text-emerald-700 ${
                            formData.amount === quick.value ? 'text-emerald-700' : 'text-emerald-600'
                          }`}>
                            {quick.label}
                          </span>
                          <span className={`block text-xs mt-1 ${
                            formData.amount === quick.value ? 'text-emerald-600' : 'text-gray-500'
                          }`}>
                            {quick.value.toLocaleString()}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm text-gray-500">
                        اضغط على أي مبلغ لإدخاله تلقائياً
                      </p>
                      <button
                        type="button"
                        onClick={() => handleInputChange('amount', 0)}
                        className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        مسح
                      </button>
                    </div>
                  </div>

                  {/* Safe Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      🏦 اختر الخزنة <span className="text-red-500 text-xl">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.safeId}
                        onChange={(e) => handleInputChange('safeId', e.target.value)}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 text-lg font-medium transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
                        required
                        disabled={isSafesLoading}
                      >
                        <option value="">
                          {isSafesLoading ? 'جاري تحميل الخزائن...' : 'اختر خزنة'}
                        </option>
                        {safes.map((safe: FinancialAccount) => (
                          <option key={safe.id} value={safe.id}>
                            {safe.name} - {safe.balance.toLocaleString()} {safe.currency}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Banknote className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Count */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      🔢 عدد الدفعات <span className="text-gray-500 text-sm">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.paymentCount}
                        onChange={(e) => handleInputChange('paymentCount', parseInt(e.target.value) || 1)}
                        className="w-full px-6 py-4 pr-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 text-lg font-medium transition-all duration-200 hover:border-gray-300"
                        placeholder="1"
                        min="1"
                        max="12"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Calculator className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      سيتم تقسيم المبلغ على عدد الدفعات المحدد
                    </p>
                  </div>

                  {/* Payment Split Suggestion */}
                  {paymentSplit && formData.paymentCount > 1 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        اقتراح تقسيم المبلغ
                      </h4>
                      <div className="space-y-2">
                        <p className="text-blue-800 font-medium">
                          المبلغ الإجمالي: <span className="font-bold">{formData.amount.toLocaleString()}</span> جنيه
                        </p>
                        <p className="text-blue-800 font-medium">
                          عدد الدفعات: <span className="font-bold">{formData.paymentCount}</span> دفعة
                        </p>
                        <div className="mt-3">
                          <p className="text-blue-700 text-sm font-medium mb-2">توزيع الدفعات:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {paymentSplit.payments.map((amount, index) => (
                              <div key={index} className="bg-white rounded-lg p-2 text-center">
                                <span className="text-blue-900 font-semibold">دفعة {index + 1}</span>
                                <div className="text-blue-700 font-bold">{amount.toLocaleString()} جنيه</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      📝 ملاحظات (اختياري)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 text-lg transition-all duration-200 hover:border-gray-300 resize-none"
                      rows={3}
                      placeholder="أضف أي ملاحظات حول الدفع..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
                    >
                      <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 font-medium">{error}</span>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-8 py-4 text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || formData.amount <= 0 || !formData.safeId}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جاري المعالجة...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          تأكيد الدفع
                        </>
                      )}
                    </button>
                  </div>
                </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
