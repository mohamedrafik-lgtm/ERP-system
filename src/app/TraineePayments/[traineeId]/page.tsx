"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, User, Calendar, DollarSign, Printer, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useGetTraineePaymentsQuery } from '@/lip/features/traineePayments/traineePaymentDetailsApi';
import { useGetTraineeQuery } from '@/lip/features/trainees/traineesApi';
import { PaymentStatus, FeeType } from '@/types/traineePaymentDetails';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const traineeId = params.traineeId as string;
  
  // API calls
  const { data: payments, isLoading, error } = useGetTraineePaymentsQuery(traineeId);
  const { data: trainee, isLoading: isTraineeLoading } = useGetTraineeQuery(parseInt(traineeId));

  // معالجة البيانات للعرض
  const paymentDetails = payments && payments.length > 0 ? {
    trainee: {
      id: traineeId,
      name: trainee?.nameAr || 'غير محدد',
      phone: trainee?.phone || 'غير محدد',
    },
    academicInfo: {
      program: payments[0].fee?.name || 'غير محدد',
      registrationType: trainee?.enrollmentType === 'REGULAR' ? 'انتظام' : 'انتساب',
      academicYear: payments[0].fee?.academicYear || 'غير محدد',
    },
    financialSummary: {
      totalFees: payments.reduce((sum, payment) => sum + payment.amount, 0),
      paidAmount: payments.reduce((sum, payment) => sum + payment.paidAmount, 0),
      remainingAmount: payments.reduce((sum, payment) => sum + (payment.amount - payment.paidAmount), 0),
      paymentPercentage: payments.length > 0 ? Math.round((payments.reduce((sum, payment) => sum + payment.paidAmount, 0) / payments.reduce((sum, payment) => sum + payment.amount, 0)) * 100) : 0,
    },
    payments: payments,
  } : null;

  // Get status icon and color
  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return <CheckCircle className="w-4 h-4" />;
      case PaymentStatus.PARTIALLY_PAID:
        return <Clock className="w-4 h-4" />;
      case PaymentStatus.PENDING:
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'bg-green-100 text-green-800';
      case PaymentStatus.PARTIALLY_PAID:
        return 'bg-yellow-100 text-yellow-800';
      case PaymentStatus.PENDING:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'مدفوع';
      case PaymentStatus.PARTIALLY_PAID:
        return 'مدفوع جزئياً';
      case PaymentStatus.PENDING:
        return 'في الانتظار';
      default:
        return 'غير محدد';
    }
  };

  const getFeeTypeLabel = (type: FeeType) => {
    switch (type) {
      case FeeType.TUITION:
        return 'رسوم دراسية';
      case FeeType.SERVICES:
        return 'رسوم خدمات';
      case FeeType.TRAINING:
        return 'رسوم تدريب';
      case FeeType.ADDITIONAL:
        return 'رسوم إضافية';
      default:
        return 'رسوم أخرى';
    }
  };

  if (isLoading || isTraineeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل البيانات</h2>
            <p className="text-gray-600 mb-6">حدث خطأ أثناء جلب بيانات المدفوعات</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              العودة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-medium">العودة</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              مدفوعات المتدرب: {paymentDetails.trainee.name}
            </h1>
            <p className="text-lg text-gray-600">عرض وإدارة جميع مديونيات المتدرب</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Trainee Info Card - Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <div className="mb-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">J</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{paymentDetails.trainee.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-500">ID:</span>
                  <span className="font-medium">{paymentDetails.trainee.id}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-500">📞</span>
                  <span className="font-medium">{paymentDetails.trainee.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Academic Info Card - Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">المعلومات الأكاديمية</h3>
                <p className="text-gray-600">تفاصيل البرنامج</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">البرنامج التدريبي:</span>
                <span className="font-medium">{paymentDetails.academicInfo.program}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">نوع التسجيل:</span>
                <span className="font-medium">{paymentDetails.academicInfo.registrationType}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">السنة الأكاديمية:</span>
                <span className="font-medium">{paymentDetails.academicInfo.academicYear}</span>
              </div>
            </div>
          </motion.div>

          {/* Financial Summary Card - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">الملخص المالي</h3>
                <p className="text-gray-600">إجمالي المبالغ</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">إجمالي الرسوم:</span>
                <span className="font-bold text-lg">EGP {paymentDetails.financialSummary.totalFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ المدفوع:</span>
                <span className="font-bold text-green-600 text-lg">EGP {paymentDetails.financialSummary.paidAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ المتبقي:</span>
                <span className="font-bold text-red-600 text-lg">EGP {paymentDetails.financialSummary.remainingAmount.toLocaleString()}</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">نسبة الدفع</span>
                  <span className="text-sm font-medium">{paymentDetails.financialSummary.paymentPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${paymentDetails.financialSummary.paymentPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            <Printer className="w-5 h-5" />
            طباعة
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <CreditCard className="w-5 h-5" />
            دفع ذكي
          </button>
        </div>

        {/* Fees Details Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">تفاصيل الرسوم ({paymentDetails.payments.length} رسوم)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">الإجراءات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">تاريخ الإنشاء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">المبلغ المتبقي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">المبلغ المدفوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">المبلغ الإجمالي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">الرسوم</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentDetails.payments.map((payment, index) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {payment.status !== PaymentStatus.PAID ? (
                        <button className="text-green-600 hover:text-green-800 font-medium">دفع</button>
                      ) : (
                        <span className="text-gray-500">مدفوع بالكامل</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      EGP {(payment.amount - payment.paidAmount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      EGP {payment.paidAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      EGP {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getFeeTypeLabel(payment.fee.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                        <span className="mr-2 text-sm text-gray-900">{payment.fee.name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Smart Pay Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200"
        >
          <h3 className="text-lg font-bold text-blue-900 mb-3">كيف يعمل الدفع الذكي؟</h3>
          <p className="text-blue-800">أدخل أي مبلغ وسيتم توزيعه تلقائياً على الرسوم من الأقدم للأحدث. مثال: إذا أدخلت 1000 جنيه، سيتم دفع الرسوم بترتيب الأولوية حتى ينتهي المبلغ.</p>
        </motion.div>
      </div>
    </div>
  );
}