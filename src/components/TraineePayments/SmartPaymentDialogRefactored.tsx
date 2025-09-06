"use client";

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, AlertCircle, Calculator, Banknote } from 'lucide-react';
import { useGetFinanceQuery } from '@/lip/features/Lockers/safe';
import { FinancialAccount } from '@/interface';
import { AutoPaymentRequest } from '@/types/payment.types';
import { INotificationService } from '@/types/notification.types';

// Components
import QuickAmountButtons from './QuickAmountButtons';
import PaymentSplitDisplay from './PaymentSplitDisplay';
import SafeSelector from './SafeSelector';

// Services
import { PaymentValidator } from '@/services/PaymentValidator';
import { PaymentCalculator } from '@/services/PaymentCalculator';
import { AmountFormatter } from '@/services/AmountFormatter';
import { NotificationRenderer } from '@/services/NotificationRenderer';
import { NotificationService } from '@/services/NotificationService';

interface SmartPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  traineeId: string;
  traineeName: string;
  remainingAmount: number;
  onPaymentSuccess?: () => void;
  paymentProcessor: any; // IPaymentProcessor
}

interface PaymentFormData {
  amount: number;
  safeId: string;
  notes: string;
  paymentCount: number;
}

export default function SmartPaymentDialogRefactored({
  isOpen,
  onClose,
  traineeId,
  traineeName,
  remainingAmount,
  onPaymentSuccess,
  paymentProcessor
}: SmartPaymentDialogProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    safeId: '',
    notes: '',
    paymentCount: 1
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dependency Injection - DIP
  const validator = useMemo(() => new PaymentValidator(), []);
  const amountFormatter = useMemo(() => new AmountFormatter(), []);
  const calculator = useMemo(() => new PaymentCalculator(amountFormatter), [amountFormatter]);
  const notificationRenderer = useMemo(() => new NotificationRenderer(), []);
  const notificationService = useMemo(() => 
    NotificationService.getInstance(notificationRenderer), [notificationRenderer]
  );

  // Get safes from Redux
  const { data: safes = [], isLoading: isSafesLoading } = useGetFinanceQuery();

  // Memoized calculations - Performance optimization
  const paymentSplit = useMemo(() => 
    calculator.calculatePaymentSplit(formData.amount, formData.paymentCount),
    [calculator, formData.amount, formData.paymentCount]
  );

  const quickAmounts = useMemo(() => 
    calculator.generateQuickAmounts(remainingAmount),
    [calculator, remainingAmount]
  );

  // Callbacks for performance - useCallback
  const handleInputChange = useCallback((field: keyof PaymentFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  }, []);

  const handleAmountSelect = useCallback((amount: number) => {
    handleInputChange('amount', amount);
  }, [handleInputChange]);

  const handleClear = useCallback(() => {
    handleInputChange('amount', 0);
  }, [handleInputChange]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation using injected validator
    const validation = validator.validateFormData(formData, remainingAmount);
    if (!validation.isValid) {
      setError(validation.error || 'بيانات غير صحيحة');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Close dialog immediately
    handleClose();

    try {
      const paymentData: AutoPaymentRequest = {
        traineeId: parseInt(traineeId),
        amount: formData.amount,
        safeId: formData.safeId,
        notes: formData.notes
      };

      const result = await paymentProcessor.processPayment(paymentData);

      if (result.success) {
        notificationService.show({
          type: 'success',
          title: 'تم الدفع بنجاح!',
          message: 'تم معالجة الدفع بنجاح'
        });
        onPaymentSuccess?.();
      } else {
        notificationService.show({
          type: 'error',
          title: 'فشل في الدفع',
          message: result.message
        });
      }
    } catch (err: any) {
      notificationService.show({
        type: 'error',
        title: 'فشل في الدفع',
        message: err?.message || 'حدث خطأ غير متوقع'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, remainingAmount, validator, paymentProcessor, notificationService, onPaymentSuccess, traineeId]);

  const handleClose = useCallback(() => {
    setFormData({ amount: 0, safeId: '', notes: '', paymentCount: 1 });
    setError('');
    onClose();
  }, [onClose]);

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
            {/* Header */}
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
                <QuickAmountButtons
                  remainingAmount={remainingAmount}
                  selectedAmount={formData.amount}
                  onAmountSelect={handleAmountSelect}
                  onClear={handleClear}
                />

                {/* Safe Selection */}
                <SafeSelector
                  safes={safes}
                  selectedSafeId={formData.safeId}
                  onSafeSelect={(safeId) => handleInputChange('safeId', safeId)}
                  isLoading={isSafesLoading}
                />

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

                {/* Payment Split Display */}
                {paymentSplit && formData.paymentCount > 1 && (
                  <PaymentSplitDisplay paymentSplit={paymentSplit} />
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
