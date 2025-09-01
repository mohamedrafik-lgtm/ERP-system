"use client";
import { useState, useMemo } from "react";
import { FaChevronRight, FaChevronDown, FaEdit, FaTrash, FaPrint, FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { accounts } from "@/data";
import AccountFilters from "@/components/FinancialConstraintsTree/AccountFilters";

export default function AccountTree() {
  const [openAccounts, setOpenAccounts] = useState<number[]>([]);
  const [hiddenSiblings, setHiddenSiblings] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all" as "all" | "credit" | "debit",
    level: "all" as "all" | "main" | "child",
    hasBalance: "all" as "all" | "yes" | "no"
  });

  // فلترة الحسابات
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      // البحث بالاسم أو الكود
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!account.name.toLowerCase().includes(searchLower) && 
            !account.code.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // فلترة النوع
      if (filters.type !== "all") {
        const total = account.debit - account.credit;
        if (filters.type === "debit" && total <= 0) return false;
        if (filters.type === "credit" && total >= 0) return false;
      }

      // فلترة المستوى
      if (filters.level !== "all") {
        if (filters.level === "main" && account.parentId !== null) return false;
        if (filters.level === "child" && account.parentId === null) return false;
      }

      // فلترة الرصيد
      if (filters.hasBalance !== "all") {
        const total = account.debit - account.credit;
        if (filters.hasBalance === "yes" && total === 0) return false;
        if (filters.hasBalance === "no" && total !== 0) return false;
      }

      return true;
    });
  }, [filters]);

  const toggleAccount = (id: number, parentId: number | null) => {
    const isOpen = openAccounts.includes(id);
  
    const siblings = filteredAccounts
      .filter((acc) => acc.parentId === parentId && acc.id !== id)
      .map((acc) => acc.id);
  
    if (isOpen) {
      setOpenAccounts((prev) => prev.filter((x) => x !== id));
      setHiddenSiblings((prev) => prev.filter((x) => !siblings.includes(x)));
    } else {
      setOpenAccounts((prev) => [...prev.filter((x) => !siblings.includes(x)), id]);
      setHiddenSiblings((prev) => [...prev, ...siblings]);
    }
  };
  

  const renderAccounts = (parentId: number | null, level: number = 0) => {
    return filteredAccounts
      .filter((acc) => acc.parentId === parentId)
      .filter((acc) => !hiddenSiblings.includes(acc.id) || openAccounts.includes(acc.id))
      .map((acc) => {
        const isOpen = openAccounts.includes(acc.id);
        const hasChildren = filteredAccounts.some((child) => child.parentId === acc.id);
        const total = acc.debit - acc.credit;
        const isPositive = total > 0;
        const isNegative = total < 0;

        return (
          <div key={acc.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: level * 0.1 }}
              className={`grid grid-cols-12 items-center px-6 py-4 border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 bg-white transition-all duration-300 text-sm group ${
                level === 0 ? 'font-semibold bg-gradient-to-r from-gray-50 to-blue-50' : ''
              }`}
              style={{ paddingRight: `${level * 2}rem` }}
            >
              <div className="col-span-4 flex items-center gap-3">
                {hasChildren ? (
                  <button
                    onClick={() => toggleAccount(acc.id, acc.parentId)}
                    className="p-1 rounded-full hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-all duration-200"
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronRight className="w-3 h-3" />
                    </motion.div>
                  </button>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className={`font-medium ${level === 0 ? 'text-gray-800' : 'text-gray-700'}`}>
                    {acc.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block w-fit">
                    #{acc.code}
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {acc.debit.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {acc.credit.toLocaleString()}
                </span>
              </div>
              <div className="col-span-1 text-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isPositive ? 'bg-blue-100 text-blue-800' : 
                  isNegative ? 'bg-orange-100 text-orange-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {total.toLocaleString()}
                </span>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 group" 
                  title="طباعة"
                >
                  <FaPrint className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1">
                <button 
                  title="تعديل" 
                  className="p-2 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-700 transition-all duration-200 group"
                >
                  <FaEdit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  title="حذف" 
                  className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all duration-200 group"
                >
                  <FaTrash className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>

            <AnimatePresence>{isOpen && renderAccounts(acc.id, level + 1)}</AnimatePresence>
          </div>
        );
      });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            شجرة الحسابات المالية
          </h1>
          <p className="text-gray-600 text-lg">
            عرض شامل لجميع الحسابات المالية مع إمكانية الفلترة والبحث
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <AccountFilters 
            onFilterChange={handleFilterChange}
            onPrintReport={handlePrintReport}
          />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الحسابات</p>
                <p className="text-2xl font-bold text-gray-800">{filteredAccounts.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaSearch className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المدين</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredAccounts.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-green-600 font-bold">+</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الدائن</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredAccounts.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-red-600 font-bold">-</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الرصيد الصافي</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredAccounts.reduce((sum, acc) => sum + (acc.debit - acc.credit), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-purple-600 font-bold">=</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 font-bold text-gray-700">
              <div className="col-span-4 flex items-center gap-2">
                <FaFilter className="w-4 h-4 text-blue-500" />
                الحساب
              </div>
              <div className="col-span-2 text-center flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                مدين
              </div>
              <div className="col-span-2 text-center flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                دائن
              </div>
              <div className="col-span-1 text-center">المجموع</div>
              <div className="col-span-1 text-center">تقرير</div>
              <div className="col-span-2 text-center">إجراءات</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>
              {renderAccounts(null)}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredAccounts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد حسابات</h3>
              <p className="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
