"use client";
import { useState } from "react";
import { FaChevronRight, FaChevronDown, FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { accounts } from "@/data";

export default function AccountTree() {
  const [openAccounts, setOpenAccounts] = useState<number[]>([]);
  const [hiddenSiblings, setHiddenSiblings] = useState<number[]>([]);

  const toggleAccount = (id: number, parentId: number | null) => {
    const isOpen = openAccounts.includes(id);
  
    const siblings = accounts
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
    return accounts
      .filter((acc) => acc.parentId === parentId)
      .filter((acc) => !hiddenSiblings.includes(acc.id) || openAccounts.includes(acc.id))
      .map((acc) => {
        const isOpen = openAccounts.includes(acc.id);
        const hasChildren = accounts.some((child) => child.parentId === acc.id);
        const total = acc.debit - acc.credit;

        return (
          <div key={acc.id}>
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-12 items-center px-4 py-3 border-b dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-sm"
              style={{ paddingRight: `${level * 1.5}rem` }}
            >
              <div className="col-span-4 flex items-center gap-2">
                {hasChildren ? (
                  <button
                    onClick={() => toggleAccount(acc.id, acc.parentId)}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                ) : (
                  <span className="w-4" />
                )}
                <span className="font-medium">{acc.name}</span>
                <span className="text-xs text-gray-500">#{acc.code}</span>
              </div>

              <div className="col-span-2 text-green-600 text-center">{acc.debit.toLocaleString()}</div>
              <div className="col-span-2 text-red-600 text-center">{acc.credit.toLocaleString()}</div>
              <div className="col-span-1 text-center font-semibold">{total.toLocaleString()}</div>

              <div className="col-span-1 flex items-center justify-center">
                <button className="text-gray-500 hover:text-black dark:hover:text-white" title="طباعة">
                  <FaPrint />
                </button>
              </div>

              <div className="col-span-2 flex items-center justify-center gap-2">
                <button title="Edit" className="text-blue-500 hover:text-blue-700 transition">
                  <FaEdit />
                </button>
                <button title="Delete" className="text-red-500 hover:text-red-700 transition">
                  <FaTrash />
                </button>
              </div>
            </motion.div>

            <AnimatePresence>{isOpen && renderAccounts(acc.id, level + 1)}</AnimatePresence>
          </div>
        );
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl text-gray-900 dark:text-white shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">شجرة الحسابات</h2>

      <div className="grid grid-cols-12 px-4 py-3 font-bold bg-gray-100 dark:bg-white/10 rounded-t-md text-sm">
        <div className="col-span-4">الحساب</div>
        <div className="col-span-2 text-center">مدين</div>
        <div className="col-span-2 text-center">دائن</div>
        <div className="col-span-1 text-center">المجموع</div>
        <div className="col-span-1 text-center">تقرير</div>
        <div className="col-span-2 text-center">إجراء</div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-white/10">
        {renderAccounts(null)}
      </div>
    </div>
  );
}
