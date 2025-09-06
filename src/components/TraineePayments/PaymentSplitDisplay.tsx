"use client";

import { memo } from 'react';
import { Calculator } from 'lucide-react';
import { IPaymentSplit } from '@/types/payment.types';

interface PaymentSplitDisplayProps {
  paymentSplit: IPaymentSplit;
}

const PaymentSplitDisplay = memo(({ paymentSplit }: PaymentSplitDisplayProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        اقتراح تقسيم المبلغ
      </h4>
      <div className="space-y-2">
        <p className="text-blue-800 font-medium">
          المبلغ الإجمالي: <span className="font-bold">{paymentSplit.totalAmount.toLocaleString()}</span> جنيه
        </p>
        <p className="text-blue-800 font-medium">
          عدد الدفعات: <span className="font-bold">{paymentSplit.paymentCount}</span> دفعة
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
  );
});

PaymentSplitDisplay.displayName = 'PaymentSplitDisplay';

export default PaymentSplitDisplay;
