"use client";

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { X, CreditCard, DollarSign, Building2, FileText, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TraineePaymentResponse } from '@/types/payment';
import { useAddTraineePaymentMutation } from '@/lip/features/traineePayments/traineePaymentsApi';

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  payment: TraineePaymentResponse;
  onPaymentAdded?: () => void;
}

interface PaymentFormData {
  amount: number;
  treasury: string;
  notes?: string;
}

// Mock data for treasuries
const treasuries = [
  { id: '1', name: 'الخزينة الرئيسية', balance: 50000 },
  { id: '2', name: 'خزينة الرسوم', balance: 25000 },
  { id: '3', name: 'خزينة الطوارئ', balance: 15000 },
  { id: '4', name: 'خزينة الشهادات', balance: 8000 },
];

export default function AddPaymentDialog({
  isOpen,
  onClose,
  payment,
  onPaymentAdded
}: AddPaymentDialogProps) {
  const [addPayment, { isLoading }] = useAddTraineePaymentMutation();
  
  const remainingAmount = payment.amount - payment.paidAmount;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<PaymentFormData>({
    defaultValues: {
      amount: 0,
      treasury: '',
      notes: ''
    }
  });

  const selectedTreasury = watch('treasury');
  const selectedTreasuryData = treasuries.find(t => t.id === selectedTreasury);

  const onSubmit = async (data: PaymentFormData) => {
    if (data.amount > remainingAmount) {
      toast.error('المبلغ المدخل أكبر من المبلغ المتبقي');
      return;
    }

    if (data.amount <= 0) {
      toast.error('يرجى إدخال مبلغ صحيح');
      return;
    }

    if (!data.treasury) {
      toast.error('يرجى اختيار الخزينة');
      return;
    }

    try {
      await addPayment({
        traineeId: payment.trainee.id,
        amount: data.amount,
        safeId: data.treasury,
        notes: data.notes
      }).unwrap();
      
      toast.success('تم إضافة الدفعة بنجاح');
      reset();
      onClose();
      onPaymentAdded?.();
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة الدفعة');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      reset();
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                          إضافة دفعة جديدة
                        </DialogTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          إضافة دفعة للمتدرب: {payment.trainee.name}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isLoading}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Trainee Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">المتدرب</p>
                        <p className="text-lg font-bold text-gray-900">{payment.trainee.name}</p>
                        <p className="text-xs text-gray-500">ID: {payment.trainee.id}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">المبلغ المتبقي</p>
                        <p className="text-lg font-bold text-red-600">
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'EGP'
                          }).format(remainingAmount)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Amount Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        المبلغ المراد دفعه *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('amount', {
                            required: 'يرجى إدخال المبلغ',
                            min: { value: 1, message: 'المبلغ يجب أن يكون أكبر من صفر' },
                            max: { value: remainingAmount, message: 'المبلغ لا يمكن أن يكون أكبر من المبلغ المتبقي' }
                          })}
                          className={`w-full border bg-white rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="أدخل المبلغ المراد دفعه"
                          max={remainingAmount}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          ج.م
                        </div>
                      </div>
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    {/* Treasury Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        الخزينة المستلمة للدفع *
                      </label>
                      <select
                        {...register('treasury', {
                          required: 'يرجى اختيار الخزينة'
                        })}
                        className={`w-full border bg-white rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.treasury ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <option value="">اختر الخزينة</option>
                        {treasuries.map((treasury) => (
                          <option key={treasury.id} value={treasury.id}>
                            {treasury.name} - الرصيد: {new Intl.NumberFormat('ar-EG', {
                              style: 'currency',
                              currency: 'EGP'
                            }).format(treasury.balance)}
                          </option>
                        ))}
                      </select>
                      {errors.treasury && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.treasury.message}
                        </p>
                      )}
                      
                      {/* Treasury Balance Info */}
                      {selectedTreasuryData && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">رصيد الخزينة:</span> {new Intl.NumberFormat('ar-EG', {
                              style: 'currency',
                              currency: 'EGP'
                            }).format(selectedTreasuryData.balance)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Notes Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        ملاحظات (اختياري)
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 resize-none"
                        placeholder="أدخل أي ملاحظات إضافية..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isLoading}
                      className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 font-medium disabled:opacity-50"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          إضافة الدفعة
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
