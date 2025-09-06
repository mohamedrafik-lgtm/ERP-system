"use client";

import { memo } from 'react';
import { PaymentCalculator, QuickAmount } from '@/utils/paymentCalculator';

interface QuickAmountButtonsProps {
  remainingAmount: number;
  selectedAmount: number;
  onAmountSelect: (amount: number) => void;
  onClear: () => void;
}

const QuickAmountButtons = memo(({
  remainingAmount,
  selectedAmount,
  onAmountSelect,
  onClear
}: QuickAmountButtonsProps) => {
  const quickAmounts = PaymentCalculator.generateQuickAmounts(remainingAmount);

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        ⚡ مبالغ سريعة
      </label>
      <div className="grid grid-cols-4 gap-3">
        {quickAmounts.map((quick) => (
          <button
            key={quick.label}
            type="button"
            onClick={() => onAmountSelect(quick.value)}
            className={`px-3 py-3 text-sm font-medium border-2 rounded-xl transition-all duration-200 group ${
              selectedAmount === quick.value
                ? 'border-emerald-500 bg-emerald-100 text-emerald-700 shadow-md scale-105'
                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:scale-105'
            }`}
          >
            <div className="text-lg mb-1">{quick.icon}</div>
            <span className={`group-hover:text-emerald-700 ${
              selectedAmount === quick.value ? 'text-emerald-700' : 'text-emerald-600'
            }`}>
              {quick.label}
            </span>
            <span className={`block text-xs mt-1 ${
              selectedAmount === quick.value ? 'text-emerald-600' : 'text-gray-500'
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
          onClick={onClear}
          className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          مسح
        </button>
      </div>
    </div>
  );
});

QuickAmountButtons.displayName = 'QuickAmountButtons';

export default QuickAmountButtons;
