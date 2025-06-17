"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RefreshCcw,
  Printer,
  Layers,
  BadgeDollarSign,
} from "lucide-react";

type FilterType = "all" | "credit" | "debit";
type LevelType = "all" | "main" | "child";
type HasBalance = "all" | "yes" | "no";

interface AccountFiltersProps {
  onFilterChange: (filters: {
    searchTerm: string;
    type: FilterType;
    level: LevelType;
    hasBalance: HasBalance;
  }) => void;
  onPrintReport?: () => void;
}

const AccountFilters: React.FC<AccountFiltersProps> = ({
  onFilterChange,
  onPrintReport,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<FilterType>("all");
  const [level, setLevel] = useState<LevelType>("all");
  const [hasBalance, setHasBalance] = useState<HasBalance>("all");

  useEffect(() => {
    onFilterChange({ searchTerm, type, level, hasBalance });
  }, [searchTerm, type, level, hasBalance]);

  const resetFilters = () => {
    setSearchTerm("");
    setType("all");
    setLevel("all");
    setHasBalance("all");
  };

  return (
    <div className="w-full bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-600 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-500" />
          فلترة الحسابات
        </h3>

        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            إعادة تعيين
          </button>
          {onPrintReport && (
            <button
              onClick={onPrintReport}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
            >
              <Printer className="w-4 h-4" />
              طباعة التقرير
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* البحث */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* النوع */}
        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-5 h-5 text-blue-500" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as FilterType)}
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">الكل</option>
            <option value="debit">مدين فقط</option>
            <option value="credit">دائن فقط</option>
          </select>
        </div>

        {/* مستوى الحساب */}
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as LevelType)}
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">كل المستويات</option>
            <option value="main">رئيسي</option>
            <option value="child">فرعي</option>
          </select>
        </div>

        {/* الحساب برصيد */}
        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-5 h-5 text-blue-500" />
          <select
            value={hasBalance}
            onChange={(e) => setHasBalance(e.target.value as HasBalance)}
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">بـ أو بدون رصيد</option>
            <option value="yes">برصيد فقط</option>
            <option value="no">بدون رصيد فقط</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccountFilters;
