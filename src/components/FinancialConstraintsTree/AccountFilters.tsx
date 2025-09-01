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
    <div className="w-full bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Filter className="w-6 h-6 text-white" />
              </div>
              فلترة الحسابات المالية
            </h3>
            <p className="text-gray-600 text-sm">استخدم الفلاتر أدناه للبحث والتصفية في الحسابات</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RefreshCcw className="w-4 h-4" />
              إعادة تعيين
            </button>
            {onPrintReport && (
              <button
                onClick={onPrintReport}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Printer className="w-4 h-4" />
                طباعة التقرير
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* البحث */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-500" />
              البحث
            </label>
            <div className="relative group">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو الكود..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* النوع */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-green-500" />
              نوع الحساب
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FilterType)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
              >
                <option value="all">جميع الأنواع</option>
                <option value="debit">حسابات مدين</option>
                <option value="credit">حسابات دائن</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* مستوى الحساب */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              مستوى الحساب
            </label>
            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as LevelType)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
              >
                <option value="all">جميع المستويات</option>
                <option value="main">الحسابات الرئيسية</option>
                <option value="child">الحسابات الفرعية</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* الحساب برصيد */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-orange-500" />
              حالة الرصيد
            </label>
            <div className="relative">
              <select
                value={hasBalance}
                onChange={(e) => setHasBalance(e.target.value as HasBalance)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
              >
                <option value="all">جميع الحسابات</option>
                <option value="yes">حسابات برصيد</option>
                <option value="no">حسابات بدون رصيد</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountFilters;
