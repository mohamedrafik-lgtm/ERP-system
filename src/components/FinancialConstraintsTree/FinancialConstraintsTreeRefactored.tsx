"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { accounts } from '@/data';
import { IAccount, IAccountFilter } from '@/types/financial.types';

// Services - Dependency Injection (DIP)
import { AccountTreeManager } from '@/services/AccountTreeManager';
import { AccountFilterService } from '@/services/AccountFilterService';
import { AccountSearchStrategy } from '@/services/AccountFilterService';
import { AccountBalanceStrategy } from '@/services/AccountFilterService';
import { AccountTypeStrategy } from '@/services/AccountFilterService';
import { AccountLevelStrategy } from '@/services/AccountFilterService';

// Components - Single Responsibility
import AccountTreeFilters from './AccountTreeFilters';
import AccountTreeNode from './AccountTreeNode';

export default function FinancialConstraintsTreeRefactored() {
  // Dependency Injection - DIP
  const treeManager = useMemo(() => new AccountTreeManager(), []);
  const filterService = useMemo(() => new AccountFilterService(
    new AccountSearchStrategy(),
    new AccountBalanceStrategy(),
    new AccountTypeStrategy(),
    new AccountLevelStrategy()
  ), []);

  // State management
  const [filters, setFilters] = useState<IAccountFilter>({
    searchTerm: "",
    type: "all",
    level: "all",
    hasBalance: "all"
  });

  // Memoized filtered accounts - Performance optimization
  const filteredAccounts = useMemo(() => {
    return treeManager.getFilteredAccounts(accounts, filters);
  }, [treeManager, filters]);

  // Callbacks for performance
  const handleFiltersChange = useCallback((newFilters: IAccountFilter) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      type: "all",
      level: "all",
      hasBalance: "all"
    });
  }, []);

  const handleToggleAccount = useCallback((accountId: number) => {
    treeManager.toggleAccount(accountId);
    // Force re-render by updating state
    setFilters(prev => ({ ...prev }));
  }, [treeManager]);

  const handleHideSiblings = useCallback((accountId: number) => {
    treeManager.hideSiblings(accountId);
    // Force re-render by updating state
    setFilters(prev => ({ ...prev }));
  }, [treeManager]);

  const handleEditAccount = useCallback((account: IAccount) => {
    console.log('Edit account:', account);
    // Implement edit functionality
  }, []);

  const handleDeleteAccount = useCallback((accountId: number) => {
    console.log('Delete account:', accountId);
    // Implement delete functionality
  }, []);

  const handlePrintAccount = useCallback((account: IAccount) => {
    console.log('Print account:', account);
    // Implement print functionality
  }, []);

  const handleAddChildAccount = useCallback((parentAccount: IAccount) => {
    console.log('Add child to account:', parentAccount);
    // Implement add child functionality
  }, []);

  const handleExpandAll = useCallback(() => {
    treeManager.expandAll(filteredAccounts);
    setFilters(prev => ({ ...prev }));
  }, [treeManager, filteredAccounts]);

  const handleCollapseAll = useCallback(() => {
    treeManager.collapseAll();
    setFilters(prev => ({ ...prev }));
  }, [treeManager]);

  // Render account with proper level calculation
  const renderAccount = useCallback((account: IAccount) => {
    const level = treeManager.getAccountLevel(account, accounts);
    const isOpen = treeManager.isAccountOpen(account.id);
    const isHidden = treeManager.isSiblingHidden(account.id);

    return (
      <AccountTreeNode
        key={account.id}
        account={account}
        level={level}
        isOpen={isOpen}
        isHidden={isHidden}
        onToggle={handleToggleAccount}
        onHideSiblings={handleHideSiblings}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
        onPrint={handlePrintAccount}
        onAddChild={handleAddChildAccount}
      />
    );
  }, [treeManager, accounts, handleToggleAccount, handleHideSiblings, handleEditAccount, handleDeleteAccount, handlePrintAccount, handleAddChildAccount]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">شجرة القيود المالية</h1>
          <p className="text-gray-600">إدارة وعرض الحسابات المالية بشكل هرمي</p>
        </div>

        {/* Filters */}
        <AccountTreeFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExpandAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                توسيع الكل
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                طي الكل
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              عرض {filteredAccounts.length} من {accounts.length} حساب
            </div>
          </div>
        </div>

        {/* Accounts Tree */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-4">اسم الحساب</div>
              <div className="col-span-2">الكود</div>
              <div className="col-span-2">مدين</div>
              <div className="col-span-2">دائن</div>
              <div className="col-span-2">الرصيد</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredAccounts.map(renderAccount)}
            </AnimatePresence>
          </div>
        </div>

        {/* Empty State */}
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد حسابات</h3>
            <p className="text-gray-500">لم يتم العثور على حسابات تطابق الفلاتر المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
}
