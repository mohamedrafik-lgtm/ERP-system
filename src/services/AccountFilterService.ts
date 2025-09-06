// Single Responsibility Principle - مسؤولية واحدة: فلترة الحسابات
import { IAccount, IAccountFilter, IAccountFilterStrategy } from '@/types/financial.types';

export class AccountFilterService implements IAccountFilterStrategy {
  private searchStrategy: IAccountSearchStrategy;
  private balanceStrategy: IAccountBalanceStrategy;
  private typeStrategy: IAccountTypeStrategy;
  private levelStrategy: IAccountLevelStrategy;

  constructor(
    searchStrategy: IAccountSearchStrategy,
    balanceStrategy: IAccountBalanceStrategy,
    typeStrategy: IAccountTypeStrategy,
    levelStrategy: IAccountLevelStrategy
  ) {
    this.searchStrategy = searchStrategy;
    this.balanceStrategy = balanceStrategy;
    this.typeStrategy = typeStrategy;
    this.levelStrategy = levelStrategy;
  }

  filter(accounts: IAccount[], filters: IAccountFilter): IAccount[] {
    let filteredAccounts = [...accounts];

    // Apply search filter
    if (filters.searchTerm) {
      filteredAccounts = this.searchStrategy.search(filteredAccounts, filters.searchTerm);
    }

    // Apply type filter
    filteredAccounts = this.typeStrategy.filterByType(filteredAccounts, filters.type);

    // Apply level filter
    filteredAccounts = this.levelStrategy.filterByLevel(filteredAccounts, filters.level);

    // Apply balance filter
    filteredAccounts = this.balanceStrategy.filterByBalance(filteredAccounts, filters.hasBalance);

    return filteredAccounts;
  }
}

// Strategy Pattern implementations
export class AccountSearchStrategy implements IAccountSearchStrategy {
  search(accounts: IAccount[], searchTerm: string): IAccount[] {
    if (!searchTerm.trim()) return accounts;

    const term = searchTerm.toLowerCase();
    return accounts.filter(account => 
      account.name.toLowerCase().includes(term) ||
      account.code.toLowerCase().includes(term)
    );
  }
}

export class AccountBalanceStrategy implements IAccountBalanceStrategy {
  filterByBalance(accounts: IAccount[], hasBalance: 'all' | 'yes' | 'no'): IAccount[] {
    switch (hasBalance) {
      case 'yes':
        return accounts.filter(account => account.balance > 0);
      case 'no':
        return accounts.filter(account => account.balance <= 0);
      default:
        return accounts;
    }
  }
}

export class AccountTypeStrategy implements IAccountTypeStrategy {
  filterByType(accounts: IAccount[], type: 'all' | 'credit' | 'debit'): IAccount[] {
    switch (type) {
      case 'credit':
        return accounts.filter(account => account.credit > 0);
      case 'debit':
        return accounts.filter(account => account.debit > 0);
      default:
        return accounts;
    }
  }
}

export class AccountLevelStrategy implements IAccountLevelStrategy {
  filterByLevel(accounts: IAccount[], level: 'all' | 'main' | 'child'): IAccount[] {
    switch (level) {
      case 'main':
        return accounts.filter(account => account.parentId === null);
      case 'child':
        return accounts.filter(account => account.parentId !== null);
      default:
        return accounts;
    }
  }
}
