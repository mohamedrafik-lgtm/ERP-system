"use client";

import { memo, useCallback } from 'react';
import { FaChevronRight, FaChevronDown, FaEdit, FaTrash, FaPrint, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IAccount } from '@/types/financial.types';

interface AccountTreeNodeProps {
  account: IAccount;
  level: number;
  isOpen: boolean;
  isHidden: boolean;
  onToggle: (accountId: number) => void;
  onHideSiblings: (accountId: number) => void;
  onEdit: (account: IAccount) => void;
  onDelete: (accountId: number) => void;
  onPrint: (account: IAccount) => void;
  onAddChild: (account: IAccount) => void;
}

const AccountTreeNode = memo(({
  account,
  level,
  isOpen,
  isHidden,
  onToggle,
  onHideSiblings,
  onEdit,
  onDelete,
  onPrint,
  onAddChild
}: AccountTreeNodeProps) => {
  const handleToggle = useCallback(() => {
    onToggle(account.id);
  }, [account.id, onToggle]);

  const handleHideSiblings = useCallback(() => {
    onHideSiblings(account.id);
  }, [account.id, onHideSiblings]);

  const handleEdit = useCallback(() => {
    onEdit(account);
  }, [account, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(account.id);
  }, [account.id, onDelete]);

  const handlePrint = useCallback(() => {
    onPrint(account);
  }, [account, onPrint]);

  const handleAddChild = useCallback(() => {
    onAddChild(account);
  }, [account, onAddChild]);

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getBalanceBgColor = (balance: number) => {
    if (balance > 0) return 'bg-green-50';
    if (balance < 0) return 'bg-red-50';
    return 'bg-gray-50';
  };

  if (isHidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <div 
        className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: `${level * 20 + 16}px` }}
      >
        {/* Account Info */}
        <div className="flex items-center space-x-3 flex-1">
          {/* Toggle Button */}
          {account.hasChildren && (
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isOpen ? (
                <FaChevronDown className="w-3 h-3 text-gray-600" />
              ) : (
                <FaChevronRight className="w-3 h-3 text-gray-600" />
              )}
            </button>
          )}

          {/* Account Details */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{account.name}</span>
              <span className="text-sm text-gray-500">({account.code})</span>
            </div>
            <div className="text-sm text-gray-600">
              مدين: {account.debit.toLocaleString()} | دائن: {account.credit.toLocaleString()}
            </div>
          </div>

          {/* Balance */}
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBalanceBgColor(account.balance)} ${getBalanceColor(account.balance)}`}>
            {account.balance.toLocaleString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
            title="تعديل"
          >
            <FaEdit className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
            title="طباعة"
          >
            <FaPrint className="w-4 h-4" />
          </button>

          {account.hasChildren && (
            <button
              onClick={handleAddChild}
              className="p-2 text-purple-600 hover:bg-purple-100 rounded transition-colors"
              title="إضافة فرعي"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
            title="حذف"
          >
            <FaTrash className="w-4 h-4" />
          </button>

          <button
            onClick={handleHideSiblings}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="إخفاء/إظهار الأقران"
          >
            <span className="text-xs">👁</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

AccountTreeNode.displayName = 'AccountTreeNode';

export default AccountTreeNode;
