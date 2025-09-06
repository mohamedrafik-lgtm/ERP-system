// Single Responsibility Principle - مسؤولية واحدة: إدارة شجرة الحسابات
import { IAccount, IAccountFilter, IAccountTreeManager } from '@/types/financial.types';
import { AccountFilterService } from './AccountFilterService';
import { AccountSearchStrategy } from './AccountFilterService';
import { AccountBalanceStrategy } from './AccountFilterService';
import { AccountTypeStrategy } from './AccountFilterService';
import { AccountLevelStrategy } from './AccountFilterService';

export class AccountTreeManager implements IAccountTreeManager {
  private openAccounts: Set<number> = new Set();
  private hiddenSiblings: Set<number> = new Set();
  private filterService: AccountFilterService;

  constructor() {
    // Dependency Injection - DIP
    this.filterService = new AccountFilterService(
      new AccountSearchStrategy(),
      new AccountBalanceStrategy(),
      new AccountTypeStrategy(),
      new AccountLevelStrategy()
    );
  }

  getFilteredAccounts(accounts: IAccount[], filters: IAccountFilter): IAccount[] {
    return this.filterService.filter(accounts, filters);
  }

  toggleAccount(accountId: number): void {
    if (this.openAccounts.has(accountId)) {
      this.openAccounts.delete(accountId);
    } else {
      this.openAccounts.add(accountId);
    }
  }

  hideSiblings(accountId: number): void {
    if (this.hiddenSiblings.has(accountId)) {
      this.hiddenSiblings.delete(accountId);
    } else {
      this.hiddenSiblings.add(accountId);
    }
  }

  isAccountOpen(accountId: number): boolean {
    return this.openAccounts.has(accountId);
  }

  isSiblingHidden(accountId: number): boolean {
    return this.hiddenSiblings.has(accountId);
  }

  // Additional utility methods
  getOpenAccounts(): number[] {
    return Array.from(this.openAccounts);
  }

  getHiddenSiblings(): number[] {
    return Array.from(this.hiddenSiblings);
  }

  clearAll(): void {
    this.openAccounts.clear();
    this.hiddenSiblings.clear();
  }

  // Open/Closed Principle - يمكن إضافة استراتيجيات فلترة جديدة
  setFilterService(filterService: AccountFilterService): void {
    this.filterService = filterService;
  }

  // Strategy Pattern for different tree operations
  expandAll(accounts: IAccount[]): void {
    const accountsWithChildren = accounts.filter(account => account.hasChildren);
    accountsWithChildren.forEach(account => {
      this.openAccounts.add(account.id);
    });
  }

  collapseAll(): void {
    this.openAccounts.clear();
  }

  // Tree traversal utilities
  getAccountLevel(account: IAccount, accounts: IAccount[]): number {
    if (account.parentId === null) return 0;
    
    const parent = accounts.find(acc => acc.id === account.parentId);
    if (!parent) return 0;
    
    return 1 + this.getAccountLevel(parent, accounts);
  }

  getAccountChildren(accountId: number, accounts: IAccount[]): IAccount[] {
    return accounts.filter(account => account.parentId === accountId);
  }

  getAccountPath(accountId: number, accounts: IAccount[]): IAccount[] {
    const path: IAccount[] = [];
    let currentId = accountId;
    
    while (currentId !== null) {
      const account = accounts.find(acc => acc.id === currentId);
      if (!account) break;
      
      path.unshift(account);
      currentId = account.parentId;
    }
    
    return path;
  }
}
