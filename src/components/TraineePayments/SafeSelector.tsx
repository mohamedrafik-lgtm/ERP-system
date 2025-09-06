"use client";

import { memo } from 'react';
import { Banknote } from 'lucide-react';
import { FinancialAccount } from '@/interface';

interface SafeSelectorProps {
  safes: FinancialAccount[];
  selectedSafeId: string;
  onSafeSelect: (safeId: string) => void;
  isLoading: boolean;
}

const SafeSelector = memo(({
  safes,
  selectedSafeId,
  onSafeSelect,
  isLoading
}: SafeSelectorProps) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        🏦 اختر الخزنة <span className="text-red-500 text-xl">*</span>
      </label>
      <div className="relative">
        <select
          value={selectedSafeId}
          onChange={(e) => onSafeSelect(e.target.value)}
          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 text-lg font-medium transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
          required
          disabled={isLoading}
        >
          <option value="">
            {isLoading ? 'جاري تحميل الخزائن...' : 'اختر خزنة'}
          </option>
          {safes.map((safe) => (
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
  );
});

SafeSelector.displayName = 'SafeSelector';

export default SafeSelector;
